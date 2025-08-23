import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import MedicineProduct from "@/models/MedicineProduct";
import CartModel from "@/models/Cart";
import { getUserId } from "@/auth/auth";
import { connectDB } from "@/database/MongoDB";
import { CartItem, CartProductInDb, CartData } from "@/types/cart";

export interface AggregationCartProduct {
  _id: mongoose.Types.ObjectId | null;
  name?: string;
  photo?: string;
  price?: number;
  originalPrice?: number;
  category?: string;
  suppliers?: string[];
  stock?: number;
  quantity?: number;
  customPrice?: number;
  totalPrice?: number;
}

export interface AggregationCartResult {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  products: AggregationCartProduct[];
}

async function getCartWithProducts(userId: string): Promise<CartData> {
  const cartWithProducts = (await CartModel.aggregate([
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
                  price: {
                    $cond: {
                      if: {
                        $and: [
                          { $ne: ["$$cartProduct.customPrice", null] },
                          { $ne: ["$$cartProduct.customPrice", undefined] },
                          { $gt: ["$$cartProduct.customPrice", 0] },
                        ],
                      },
                      then: "$$cartProduct.customPrice",
                      else: { $ifNull: ["$$productInfo.price", 0] },
                    },
                  },
                  originalPrice: { $ifNull: ["$$productInfo.price", 0] },
                  category: "$$productInfo.category",
                  suppliers: "$$productInfo.suppliers",
                  stock: { $ifNull: ["$$productInfo.stock", 0] },
                  quantity: { $ifNull: ["$$cartProduct.quantity", 1] },
                  customPrice: "$$cartProduct.customPrice",
                  totalPrice: {
                    $multiply: [
                      {
                        $toDouble: {
                          $cond: {
                            if: {
                              $and: [
                                { $ne: ["$$cartProduct.customPrice", null] },
                                {
                                  $ne: ["$$cartProduct.customPrice", undefined],
                                },
                                { $gt: ["$$cartProduct.customPrice", 0] },
                              ],
                            },
                            then: { $ifNull: ["$$cartProduct.customPrice", 0] },
                            else: { $ifNull: ["$$productInfo.price", 0] },
                          },
                        },
                      },
                      { $ifNull: ["$$cartProduct.quantity", 1] },
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
            cond: {
              $and: [
                { $ne: ["$$this._id", null] },
                { $ne: ["$$this._id", undefined] },
              ],
            },
          },
        },
      },
    },
  ])) as AggregationCartResult[];

  const cart = cartWithProducts[0];

  if (!cart || !cart.products || cart.products.length === 0) {
    return {
      cartItems: [],
      totalAmount: 0,
      totalItems: 0,
    };
  }

  const cartItems = cart.products
    .filter(
      (
        item: AggregationCartProduct
      ): item is AggregationCartProduct & { _id: mongoose.Types.ObjectId } =>
        item && item._id !== null && item._id !== undefined
    )
    .map(
      (
        item: AggregationCartProduct & { _id: mongoose.Types.ObjectId }
      ): CartItem => ({
        _id: item._id.toString(),
        name: item.name || "",
        photo: item.photo || "",
        price: Number(item.price || 0),
        originalPrice: Number(item.originalPrice || 0),
        category: item.category || "",
        suppliers: item.suppliers || [],
        stock: Number(item.stock || 0),
        quantity: Number(item.quantity || 1),
        customPrice: item.customPrice,
        totalPrice: Number((item.totalPrice || 0).toFixed(2)),
      })
    );

  const totalAmount = Number(
    cartItems
      .reduce((sum: number, item: CartItem) => sum + (item.totalPrice || 0), 0)
      .toFixed(2)
  );

  const totalItems = cartItems.reduce(
    (sum: number, item: CartItem) => sum + (item.quantity || 0),
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
        { success: false, error: "User not authorized" },
        { status: 401 }
      );
    }

    const cartData = await getCartWithProducts(userId);
    const cartDoc = await CartModel.findOne({ userId });
    const storedProductCount = cartDoc?.products.length || 0;

    if (cartData.cartItems.length < storedProductCount) {
      await CartModel.updateOne(
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
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error retrieving cart" },
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
        { success: false, error: "User not authorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity, customPrice } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    const product = await MedicineProduct.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const availableStock = Number(product.stock);
    if (quantity > availableStock) {
      return NextResponse.json(
        {
          success: false,
          error: `Not enough stock. Available: ${availableStock}`,
        },
        { status: 400 }
      );
    }

    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({ userId, products: [] });
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
            error: `Not enough product in stock. Available: ${availableStock}, in cart: ${cart.products[existingProductIndex].quantity}`,
          },
          { status: 400 }
        );
      }

      cart.products[existingProductIndex].quantity = newQuantity;

      if (
        customPrice !== undefined &&
        customPrice !== null &&
        customPrice > 0
      ) {
        cart.products[existingProductIndex].customPrice = customPrice;
      } else if (customPrice === null || customPrice === 0) {
        cart.products[existingProductIndex].customPrice = undefined;
      }
    } else {
      const newProduct: CartProductInDb = {
        _id: new mongoose.Types.ObjectId(productId),
        quantity,
      };

      if (
        customPrice !== undefined &&
        customPrice !== null &&
        customPrice > 0
      ) {
        newProduct.customPrice = customPrice;
      }

      cart.products.push(newProduct);
    }
    await cart.save();

    const updatedCartData = await getCartWithProducts(userId);

    return NextResponse.json(
      {
        success: true,
        message: "Product added to cart",
        data: updatedCartData,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Server error while adding product to cart",
      },
      { status: 500 }
    );
  }
}
