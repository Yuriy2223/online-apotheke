import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import CartModel from "@/models/Cart";
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
      throw new CheckoutError("User not authorized", "UNAUTHORIZED", 401);
    }

    const body: CheckoutRequest = await request.json();
    const { shippingInfo, paymentMethod } = body;

    validateShippingInfo(shippingInfo);

    if (
      !paymentMethod ||
      !["Cash On Delivery", "Bank"].includes(paymentMethod)
    ) {
      throw new CheckoutError(
        "Invalid payment method",
        "INVALID_PAYMENT_METHOD"
      );
    }

    let orderId: mongoose.Types.ObjectId;
    let totalAmount = 0;

    await session.withTransaction(async () => {
      const cart = (await CartModel.findOne({ userId }).session(
        session
      )) as CartDocumentInDb | null;
      if (!cart || cart.products.length === 0) {
        throw new CheckoutError("Cart is empty", "EMPTY_CART");
      }

      const productIds = cart.products.map((item: CartProductInDb) => item._id);
      const productDocuments = await Product.find({
        _id: { $in: productIds },
      }).session(session);

      if (productDocuments.length !== cart.products.length) {
        throw new CheckoutError(
          "Some products are no longer available",
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
            `Product not found: ${cartProduct._id}`,
            "PRODUCT_NOT_FOUND"
          );
        }

        const availableStock = Number(product.stock);
        if (cartProduct.quantity > availableStock) {
          throw new CheckoutError(
            `Insufficient stock for "${product.name}". Available: ${availableStock}`,
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
            `Failed to update stock for product ${cartProduct._id}`,
            "STOCK_UPDATE_FAILED"
          );
        }
      }

      await CartModel.findOneAndDelete({ userId }, { session });
    });

    const estimatedDelivery = calculateEstimatedDelivery(paymentMethod);

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
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

    console.error("Error during order checkout:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error during order checkout",
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
      "Shipping information is required",
      "MISSING_SHIPPING_INFO"
    );
  }

  const { name, email, phone, address } = shippingInfo;

  if (!name || name.trim().length < 2) {
    throw new CheckoutError(
      "Name must contain at least 2 characters",
      "INVALID_NAME"
    );
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    throw new CheckoutError("Invalid email format", "INVALID_EMAIL");
  }

  if (!phone || !/^\+?[\d\s\-\(\)]{10,}$/.test(phone.trim())) {
    throw new CheckoutError("Invalid phone format", "INVALID_PHONE");
  }

  if (!address || address.trim().length < 10) {
    throw new CheckoutError(
      "Address must contain at least 10 characters",
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
  } business days (by ${deliveryDate.toLocaleDateString("en-US")})`;
}

function generateTrackingInfo(orderId: mongoose.Types.ObjectId) {
  const trackingNumber = `EP${orderId.toString().slice(-8).toUpperCase()}`;
  return {
    trackingNumber,
    trackingUrl: `/orders/${orderId}`,
    estimatedSteps: [
      { status: "pending", name: "Processing order", completed: true },
      { status: "confirmed", name: "Confirmation", completed: false },
      {
        status: "processing",
        name: "Preparing for shipment",
        completed: false,
      },
      { status: "shipped", name: "Shipped", completed: false },
      { status: "delivered", name: "Delivered", completed: false },
    ],
  };
}
