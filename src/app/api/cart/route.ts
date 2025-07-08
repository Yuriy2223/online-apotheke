import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/auth/auth";
import { connectDB } from "@/database/MongoDB";
import MedicineProduct from "@/models/MedicineProduct";
import Cart from "@/models/Cart";
import { CartItem, CartProductInDb, CartData } from "@/types/cart";

async function getCartWithProducts(userId: string): Promise<CartData> {
  const cartWithProducts = await Cart.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "medicine_products",
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
    return {
      cartItems: [],
      totalAmount: 0,
      totalItems: 0,
    };
  }

  const cartItems = cart.products.map((item: CartItem) => ({
    ...item,
    _id: item._id.toString(),
    totalPrice: Number(item.totalPrice.toFixed(2)),
  }));

  const totalAmount = Number(
    cartItems
      .reduce((sum: number, item: CartItem) => sum + item.totalPrice, 0)
      .toFixed(2)
  );

  const totalItems = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  return {
    cartItems,
    totalAmount,
    totalItems,
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Користувач не авторизований" },
        { status: 401 }
      );
    }

    const cartData = await getCartWithProducts(userId);
    const cartDoc = await Cart.findOne({ userId });
    const storedProductCount = cartDoc?.products.length || 0;

    if (cartData.cartItems.length < storedProductCount) {
      await Cart.updateOne(
        { userId },
        {
          products: cartData.cartItems.map(
            (p): CartProductInDb => ({
              _id: new mongoose.Types.ObjectId(p._id),
              quantity: p.quantity,
            })
          ),
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: cartData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при отриманні кошика:", error);
    return NextResponse.json(
      { success: false, error: "Помилка сервера при отриманні кошика" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Користувач не авторизований" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "ID продукту обов'язковий" },
        { status: 400 }
      );
    }

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Кількість має бути більше 0" },
        { status: 400 }
      );
    }

    const product = await MedicineProduct.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Продукт не знайдено" },
        { status: 404 }
      );
    }

    const availableStock = Number(product.stock);
    if (quantity > availableStock) {
      return NextResponse.json(
        {
          success: false,
          error: `Недостатньо товару на складі. Доступно: ${availableStock}`,
        },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item._id.toString() === productId
    );

    if (existingProductIndex > -1) {
      const newQuantity =
        cart.products[existingProductIndex].quantity + quantity;

      if (newQuantity > availableStock) {
        return NextResponse.json(
          {
            success: false,
            error: `Недостатньо товару на складі. Доступно: ${availableStock}, в кошику: ${cart.products[existingProductIndex].quantity}`,
          },
          { status: 400 }
        );
      }

      cart.products[existingProductIndex].quantity = newQuantity;
    } else {
      cart.products.push({
        _id: new mongoose.Types.ObjectId(productId),
        quantity,
      });
    }

    await cart.save();

    const updatedCartData = await getCartWithProducts(userId);

    return NextResponse.json(
      {
        success: true,
        message: "Товар додано до кошика",
        data: updatedCartData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка в cart API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при додаванні товару до кошика",
      },
      { status: 500 }
    );
  }
}
