import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import CartModel from "@/models/Cart";
import Product from "@/models/MedicineProduct";
import { getUserId } from "@/auth/auth";
import { connectDB } from "@/database/MongoDB";
import { CartItem, CartData, CartProductInDb } from "@/types/cart";
import { AggregationCartProduct, AggregationCartResult } from "../route";

class CartError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = "CartError";
  }
}

export async function PUT(request: NextRequest) {
  const session = await mongoose.startSession();

  try {
    await connectDB();

    const userId = await getUserId(request);
    if (!userId) {
      throw new CartError("User is not authorized.", "UNAUTHORIZED", 401);
    }

    const body = await request.json();
    const { productId, quantity, action, customPrice } = body;

    if (!productId) {
      throw new CartError("Product ID is required", "MISSING_PRODUCT_ID");
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CartError("Invalid product ID", "INVALID_PRODUCT_ID");
    }

    if (!action || !["add", "update", "remove"].includes(action)) {
      throw new CartError(
        "Invalid action. Available actions: add, update, remove",
        "INVALID_ACTION"
      );
    }

    await session.withTransaction(async () => {
      const product = await Product.findById(productId).session(session);
      if (!product) {
        throw new CartError("Product not found", "PRODUCT_NOT_FOUND", 404);
      }

      let cart = await CartModel.findOne({ userId }).session(session);
      if (!cart) {
        cart = new CartModel({ userId, products: [] });
      }

      const productIndex = cart.products.findIndex(
        (item) => item._id.toString() === productId
      );

      if (action === "remove") {
        if (productIndex > -1) {
          cart.products.splice(productIndex, 1);
        }
      } else if (action === "add" || action === "update") {
        if (!quantity || quantity < 1) {
          throw new CartError(
            "Quantity must be greater than 0",
            "INVALID_QUANTITY"
          );
        }

        const availableStock = Number(product.stock);
        if (quantity > availableStock) {
          throw new CartError(
            `Not enough stock. Available: ${availableStock}`,
            "INSUFFICIENT_STOCK"
          );
        }

        if (productIndex > -1) {
          cart.products[productIndex].quantity = quantity;

          if (
            customPrice !== undefined &&
            customPrice !== null &&
            customPrice > 0
          ) {
            cart.products[productIndex].customPrice = customPrice;
          } else if (customPrice === null || customPrice === 0) {
            cart.products[productIndex].customPrice = undefined;
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
      }

      await cart.save({ session });
    });

    const updatedCartData = await getCartWithProducts(userId);

    return NextResponse.json(
      {
        success: true,
        message: getSuccessMessage(action),
        data: updatedCartData,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof CartError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Server error while updating cart",
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
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

function getSuccessMessage(action: string): string {
  switch (action) {
    case "add":
      return "Item added to cart";
    case "update":
      return "Item quantity updated";
    case "remove":
      return "Item removed from cart";
    default:
      return "Cart updated";
  }
}
