import { NextRequest, NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { getUserId } from "@/auth/auth";
import mongoose from "mongoose";
import { connectDB } from "@/database/MongoDB";

interface CartProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo: string;
  price: string;
  category: string;
  suppliers: string[];
  stock: string;
  quantity: number;
  totalPrice: number;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Користувач не авторизований",
        },
        { status: 401 }
      );
    }

    const cartWithProducts = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "products._id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "cartProduct",
              in: {
                $let: {
                  vars: {
                    productInfo: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$productDetails",
                            cond: { $eq: ["$$this._id", "$$cartProduct._id"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {
                    _id: "$$productInfo._id",
                    name: "$$productInfo.name",
                    photo: "$$productInfo.photo",
                    price: "$$productInfo.price",
                    category: "$$productInfo.category",
                    suppliers: "$$productInfo.suppliers",
                    stock: "$$productInfo.stock",
                    quantity: "$$cartProduct.quantity",
                    totalPrice: {
                      $multiply: [
                        { $toDouble: "$$productInfo.price" },
                        "$$cartProduct.quantity",
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          products: {
            $filter: {
              input: "$products",
              cond: { $ne: ["$$this._id", null] },
            },
          },
        },
      },
    ]);

    const cart = cartWithProducts[0];

    if (!cart || !cart.products || cart.products.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: {
            cartItems: [],
            totalAmount: 0,
            totalItems: 0,
          },
        },
        { status: 200 }
      );
    }

    const originalProductsCount = await Cart.findOne({ userId }).then(
      (c) => c?.products.length || 0
    );
    if (cart.products.length < originalProductsCount) {
      await Cart.updateOne(
        { userId },
        {
          products: cart.products.map((p: CartProduct) => ({
            _id: p._id,
            quantity: p.quantity,
          })),
        }
      );
    }

    const cartItems = cart.products.map((item: CartProduct) => ({
      ...item,
      totalPrice: Number(item.totalPrice.toFixed(2)),
    }));

    const totalAmount = Number(
      cartItems
        .reduce((sum: number, item: CartProduct) => sum + item.totalPrice, 0)
        .toFixed(2)
    );

    const totalItems = cartItems.reduce(
      (sum: number, item: CartProduct) => sum + item.quantity,
      0
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          cartItems,
          totalAmount,
          totalItems,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при отриманні кошика:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при отриманні кошика",
      },
      { status: 500 }
    );
  }
}
