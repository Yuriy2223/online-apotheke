import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import Cart from "@/models/Cart";
import Product from "@/models/MedicineProduct";
import mongoose from "mongoose";
import { getUserId } from "@/auth/auth";

interface CartItem {
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

interface CartData {
  cartItems: CartItem[];
  totalAmount: number;
  totalItems: number;
}

interface CartProductData {
  _id: mongoose.Types.ObjectId;
  quantity: number;
}

interface ProductDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo: string;
  price: string;
  category: string;
  suppliers: string[];
  stock: string;
}

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
      throw new CartError("Користувач не авторизований", "UNAUTHORIZED", 401);
    }

    const body = await request.json();
    const { productId, quantity, action } = body;

    if (!productId) {
      throw new CartError("ID продукту обов'язковий", "MISSING_PRODUCT_ID");
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CartError("Невірний ID продукту", "INVALID_PRODUCT_ID");
    }

    if (!action || !["add", "update", "remove"].includes(action)) {
      throw new CartError(
        "Невірна дія. Доступні: add, update, remove",
        "INVALID_ACTION"
      );
    }

    await session.withTransaction(async () => {
      const product = await Product.findById(productId).session(session);
      if (!product) {
        throw new CartError("Продукт не знайдено", "PRODUCT_NOT_FOUND", 404);
      }

      let cart = await Cart.findOne({ userId }).session(session);
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }

      const productIndex = cart.products.findIndex(
        (item: CartProductData) => item._id.toString() === productId
      );

      if (action === "remove") {
        if (productIndex > -1) {
          cart.products.splice(productIndex, 1);
        }
      } else if (action === "add" || action === "update") {
        if (!quantity || quantity < 1) {
          throw new CartError(
            "Кількість має бути більше 0",
            "INVALID_QUANTITY"
          );
        }

        const availableStock = parseInt(product.stock);
        if (quantity > availableStock) {
          throw new CartError(
            `Недостатньо товару на складі. Доступно: ${availableStock}`,
            "INSUFFICIENT_STOCK"
          );
        }

        if (productIndex > -1) {
          cart.products[productIndex].quantity = quantity;
        } else {
          cart.products.push({
            _id: new mongoose.Types.ObjectId(productId),
            quantity,
          } as CartProductData);
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

    console.error("Помилка при оновленні кошика:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при оновленні кошика",
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}

async function getCartWithProducts(userId: string): Promise<CartData> {
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
  ]);

  const cart = cartWithProducts[0];

  if (!cart || !cart.products) {
    return {
      cartItems: [],
      totalAmount: 0,
      totalItems: 0,
    };
  }

  const cartItems = cart.products
    .filter(
      (item: ProductDocument & { quantity: number; totalPrice: number }) =>
        item._id
    )
    .map(
      (
        item: ProductDocument & { quantity: number; totalPrice: number }
      ): CartItem => ({
        ...item,
        totalPrice: Number(item.totalPrice.toFixed(2)),
      })
    );

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

function getSuccessMessage(action: string): string {
  switch (action) {
    case "add":
      return "Товар додано до кошика";
    case "update":
      return "Кількість товару оновлено";
    case "remove":
      return "Товар видалено з кошика";
    default:
      return "Кошик оновлено";
  }
}
