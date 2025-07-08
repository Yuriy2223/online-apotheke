import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/models/Cart";
import Product from "@/models/MedicineProduct";
import Order from "@/models/Order";
import { getUserId } from "@/auth/auth";
import { connectDB } from "@/database/MongoDB";
import {
  ShippingInfo,
  CheckoutRequest,
  ProductInDb,
  CartProductInDb,
  CartDocumentInDb,
} from "@/types/cart";

class CheckoutError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

export async function POST(request: NextRequest) {
  const session = await mongoose.startSession();

  try {
    await connectDB();

    const userId = await getUserId(request);
    if (!userId) {
      throw new CheckoutError(
        "Користувач не авторизований",
        "UNAUTHORIZED",
        401
      );
    }

    const body: CheckoutRequest = await request.json();
    const { shippingInfo, paymentMethod } = body;

    validateShippingInfo(shippingInfo);

    if (
      !paymentMethod ||
      !["Cash On Delivery", "Bank"].includes(paymentMethod)
    ) {
      throw new CheckoutError(
        "Невірний спосіб оплати",
        "INVALID_PAYMENT_METHOD"
      );
    }

    let orderId: mongoose.Types.ObjectId;
    let totalAmount = 0;

    await session.withTransaction(async () => {
      const cart = (await Cart.findOne({ userId }).session(
        session
      )) as CartDocumentInDb | null;
      if (!cart || cart.products.length === 0) {
        throw new CheckoutError("Кошик порожній", "EMPTY_CART");
      }

      const productIds = cart.products.map((item: CartProductInDb) => item._id);
      const productDocuments = await Product.find({
        _id: { $in: productIds },
      }).session(session);

      if (productDocuments.length !== cart.products.length) {
        throw new CheckoutError(
          "Деякі товари більше недоступні",
          "PRODUCTS_UNAVAILABLE"
        );
      }

      const products = productDocuments as unknown as ProductInDb[];

      const productMap = new Map<string, ProductInDb>();
      products.forEach((product) => {
        productMap.set(product._id.toString(), product);
      });

      const orderProducts = [];

      for (const cartProduct of cart.products) {
        const product = productMap.get(cartProduct._id.toString());
        if (!product) {
          throw new CheckoutError(
            `Товар не знайдено: ${cartProduct._id}`,
            "PRODUCT_NOT_FOUND"
          );
        }

        const availableStock = Number(product.stock);
        if (cartProduct.quantity > availableStock) {
          throw new CheckoutError(
            `Недостатньо товару "${product.name}" на складі. Доступно: ${availableStock}`,
            "INSUFFICIENT_STOCK"
          );
        }

        const pricePerUnit = Number(product.price);
        const productTotal = pricePerUnit * cartProduct.quantity;
        totalAmount += productTotal;

        orderProducts.push({
          productId: product._id,
          name: product.name,
          price: pricePerUnit,
          quantity: cartProduct.quantity,
          total: productTotal,
        });
      }

      const order = new Order({
        userId,
        products: orderProducts,
        shippingInfo: {
          name: shippingInfo.name.trim(),
          email: shippingInfo.email.trim().toLowerCase(),
          phone: shippingInfo.phone.trim(),
          address: shippingInfo.address.trim(),
        },
        paymentMethod,
        totalAmount: Number(totalAmount.toFixed(2)),
        status: "pending",
      });

      await order.save({ session });
      orderId = order._id as mongoose.Types.ObjectId;

      for (const cartProduct of cart.products) {
        const updateResult = await Product.findOneAndUpdate(
          {
            _id: cartProduct._id,
            stock: { $gte: cartProduct.quantity },
          },
          {
            $inc: { stock: -cartProduct.quantity },
          },
          {
            session,
            new: true,
          }
        );

        if (!updateResult) {
          throw new CheckoutError(
            `Не вдалося оновити stock для товару ${cartProduct._id}`,
            "STOCK_UPDATE_FAILED"
          );
        }
      }

      await Cart.findOneAndDelete({ userId }, { session });
    });

    const estimatedDelivery = calculateEstimatedDelivery(paymentMethod);

    return NextResponse.json(
      {
        success: true,
        message: "Замовлення успішно створено",
        data: {
          orderId: orderId!.toString(),
          totalAmount: totalAmount,
          orderStatus: "pending",
          estimatedDelivery,
          paymentMethod,
          trackingInfo: generateTrackingInfo(orderId!),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof CheckoutError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
        },
        { status: error.statusCode }
      );
    }

    console.error("Помилка при оформленні замовлення:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при оформленні замовлення",
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}

function validateShippingInfo(shippingInfo: ShippingInfo) {
  if (!shippingInfo) {
    throw new CheckoutError(
      "Інформація про доставку обов'язкова",
      "MISSING_SHIPPING_INFO"
    );
  }

  const { name, email, phone, address } = shippingInfo;

  if (!name || name.trim().length < 2) {
    throw new CheckoutError(
      "Ім'я має містити принаймні 2 символи",
      "INVALID_NAME"
    );
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    throw new CheckoutError("Невірний формат email", "INVALID_EMAIL");
  }

  if (!phone || !/^\+?[\d\s\-\(\)]{10,}$/.test(phone.trim())) {
    throw new CheckoutError("Невірний формат телефону", "INVALID_PHONE");
  }

  if (!address || address.trim().length < 10) {
    throw new CheckoutError(
      "Адреса має містити принаймні 10 символів",
      "INVALID_ADDRESS"
    );
  }
}

function calculateEstimatedDelivery(paymentMethod: string): string {
  const deliveryDays = paymentMethod === "Cash On Delivery" ? 2 : 3;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

  return `${deliveryDays}-${
    deliveryDays + 1
  } робочих днів (до ${deliveryDate.toLocaleDateString("uk-UA")})`;
}

function generateTrackingInfo(orderId: mongoose.Types.ObjectId) {
  const trackingNumber = `EP${orderId.toString().slice(-8).toUpperCase()}`;
  return {
    trackingNumber,
    trackingUrl: `/orders/${orderId}`,
    estimatedSteps: [
      { status: "pending", name: "Обробка замовлення", completed: true },
      { status: "confirmed", name: "Підтвердження", completed: false },
      {
        status: "processing",
        name: "Підготовка до відправки",
        completed: false,
      },
      { status: "shipped", name: "Відправлено", completed: false },
      { status: "delivered", name: "Доставлено", completed: false },
    ],
  };
}
