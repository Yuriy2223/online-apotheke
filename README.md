This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

npx create-next-app@latest
npm install mongoose
npm i bcrypt
npm install -D @types/bcryptjs
npm i yup
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
npm install nodemailer
npm install --save-dev @types/nodemailer
npm install google-auth-library

npm install lucide-react

перевір чи правильно зробив бекендну частину корзини
import mongoose, { Schema, Document, Model } from "mongoose"; export interface CartProductDocument extends Document { \_id: mongoose.Types.ObjectId; quantity: number; } export interface CartDocument extends Document { products: CartProductDocument[]; userId: mongoose.Types.ObjectId; createdAt: Date; updatedAt: Date; } const productSchema = new Schema({ \_id: { type: Schema.Types.ObjectId, ref: "Product", required: [true, "Product ID is required"], }, quantity: { type: Number, required: [true, "Quantity is required"], min: [1, "Quantity must be at least 1"], }, }); const cartSchema = new Schema( { products: [productSchema], userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required"], }, }, { timestamps: true, versionKey: false, } ); cartSchema.index({ userId: 1 }); const Cart: Model = mongoose.models.Cart || mongoose.model("Cart", cartSchema); export default Cart;  
import mongoose, { Schema, Document, Model } from "mongoose"; export interface OrderProductDocument extends Document { productId: mongoose.Types.ObjectId; name: string; price: string; quantity: number; total: string; } export interface ShippingInfoDocument extends Document { name: string; email: string; phone: string; address: string; } export interface OrderDocument extends Document { userId: mongoose.Types.ObjectId; products: OrderProductDocument[]; shippingInfo: ShippingInfoDocument; paymentMethod: "Cash On Delivery" | "Bank"; totalAmount: string; status: | "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"; orderDate: Date; createdAt: Date; updatedAt: Date; } const orderProductSchema = new Schema({ productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, }, name: { type: String, required: true, trim: true, }, price: { type: String, required: true, }, quantity: { type: Number, required: true, min: 1, }, total: { type: String, required: true, }, }); const shippingInfoSchema = new Schema({ name: { type: String, required: true, trim: true, }, email: { type: String, required: true, trim: true, lowercase: true, }, phone: { type: String, required: true, trim: true, }, address: { type: String, required: true, trim: true, }, }); const orderSchema = new Schema( { userId: { type: Schema.Types.ObjectId, ref: "User", required: true, }, products: [orderProductSchema], shippingInfo: { type: shippingInfoSchema, required: true, }, paymentMethod: { type: String, enum: ["Cash On Delivery", "Bank"], required: true, }, totalAmount: { type: String, required: true, }, status: { type: String, enum: [ "pending", "confirmed", "processing", "shipped", "delivered", "cancelled", ], default: "pending", }, orderDate: { type: Date, default: Date.now, }, }, { timestamps: true, versionKey: false, } ); orderSchema.index({ userId: 1 }); orderSchema.index({ status: 1 }); orderSchema.index({ orderDate: -1 }); const Order: Model = mongoose.models.Order || mongoose.model("Order", orderSchema); export default Order;  
 import { NextRequest, NextResponse } from "next/server"; import { connectDB } from "@/database/MongoDB"; import Cart from "@/models/Cart"; import Product from "@/models/Product"; import { getUserId } from "@/auth/auth"; export async function GET(request: NextRequest) { try { await connectDB(); const userId = await getUserId(request); if (!userId) { return NextResponse.json( { success: false, error: "Користувач не авторизований", }, { status: 401 } ); } const cart = await Cart.findOne({ userId }).lean(); if (!cart || cart.products.length === 0) { return NextResponse.json( { success: true, data: { cartItems: [], totalAmount: "0", totalItems: 0, }, }, { status: 200 } ); } const productIds = cart.products.map((item) => item.\_id); const products = await Product.find({ \_id: { $in: productIds } }).lean(); const productMap = new Map( products.map((product) => [product._id.toString(), product]) ); const cartItems = cart.products .map((cartProduct) => { const product = productMap.get(cartProduct.\_id.toString()); if (!product) return null; const quantity = cartProduct.quantity; const pricePerUnit = parseFloat(product.price); const totalPrice = (pricePerUnit \* quantity).toFixed(2); return { \_id: product.\_id, name: product.name, photo: product.photo, price: product.price, category: product.category, suppliers: product.suppliers, stock: product.stock, quantity, totalPrice, }; }) .filter(Boolean); const totalAmount = cartItems .reduce((sum, item) => sum + parseFloat(item.totalPrice), 0) .toFixed(2); const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); return NextResponse.json( { success: true, data: { cartItems, totalAmount, totalItems, }, }, { status: 200 } ); } catch (error) { console.error("Помилка при отриманні кошика:", error); return NextResponse.json( { success: false, error: "Помилка сервера при отриманні кошика", }, { status: 500 } ); } }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { getUserId } from "@/auth/auth";

export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    const { productId, quantity, action } = body;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID продукту обов'язковий",
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Невірний ID продукту",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Продукт не знайдено",
        },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
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
        return NextResponse.json(
          {
            success: false,
            error: "Кількість має бути більше 0",
          },
          { status: 400 }
        );
      }

      const availableStock = parseInt(product.stock);
      if (quantity > availableStock) {
        return NextResponse.json(
          {
            success: false,
            error: `Недостатньо товару на складі. Доступно: ${availableStock}`,
          },
          { status: 400 }
        );
      }

      if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.push({
          _id: new mongoose.Types.ObjectId(productId),
          quantity,
        });
      }
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).lean();
    const productIds = updatedCart?.products.map((item) => item._id) || [];
    const products = await Product.find({ _id: { $in: productIds } }).lean();

    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    const cartItems =
      updatedCart?.products
        .map((cartProduct) => {
          const productInfo = productMap.get(cartProduct._id.toString());
          if (!productInfo) return null;

          const quantity = cartProduct.quantity;
          const pricePerUnit = parseFloat(productInfo.price);
          const totalPrice = (pricePerUnit * quantity).toFixed(2);

          return {
            _id: productInfo._id,
            name: productInfo.name,
            photo: productInfo.photo,
            price: productInfo.price,
            category: productInfo.category,
            suppliers: productInfo.suppliers,
            stock: productInfo.stock,
            quantity,
            totalPrice,
          };
        })
        .filter(Boolean) || [];

    const totalAmount = cartItems
      .reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
      .toFixed(2);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json(
      {
        success: true,
        message: "Кошик успішно оновлено",
        data: {
          cartItems,
          totalAmount,
          totalItems,
        },
      },
      { status: 200 }
    );

} catch (error) {
console.error("Помилка при оновленні кошика:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при оновленні кошика",
      },
      { status: 500 }
    );

}
}

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { getUserId } from "@/auth/auth";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { shippingInfo, paymentMethod } = body;

    if (
      !shippingInfo ||
      !shippingInfo.name ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Всі поля доставки обов'язкові",
        },
        { status: 400 }
      );
    }

    if (
      !paymentMethod ||
      !["Cash On Delivery", "Bank"].includes(paymentMethod)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Невірний спосіб оплати",
        },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Кошик порожній",
        },
        { status: 400 }
      );
    }

    const productIds = cart.products.map((item) => item._id);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== cart.products.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Деякі товари більше недоступні",
        },
        { status: 400 }
      );
    }

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    const orderProducts = [];
    let totalAmount = 0;

    for (const cartProduct of cart.products) {
      const product = productMap.get(cartProduct._id.toString());
      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Товар не знайдено: ${cartProduct._id}`,
          },
          { status: 400 }
        );
      }

      const availableStock = parseInt(product.stock);
      if (cartProduct.quantity > availableStock) {
        return NextResponse.json(
          {
            success: false,
            error: `Недостатньо товару "${product.name}" на складі. Доступно: ${availableStock}`,
          },
          { status: 400 }
        );
      }

      const pricePerUnit = parseFloat(product.price);
      const productTotal = pricePerUnit * cartProduct.quantity;
      totalAmount += productTotal;

      orderProducts.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: cartProduct.quantity,
        total: productTotal.toFixed(2),
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
      totalAmount: totalAmount.toFixed(2),
      status: "pending",
    });

    const session = await connectDB().startSession();

    try {
      await session.withTransaction(async () => {
        await order.save({ session });

        for (const cartProduct of cart.products) {
          const product = productMap.get(cartProduct._id.toString());
          const newStock = parseInt(product.stock) - cartProduct.quantity;

          await Product.findByIdAndUpdate(
            cartProduct._id,
            { stock: newStock.toString() },
            { session }
          );
        }

        await Cart.findOneAndDelete({ userId }, { session });
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Замовлення успішно створено",
        data: {
          orderId: order._id,
          totalAmount: totalAmount.toFixed(2),
          orderStatus: "pending",
          estimatedDelivery: "2-3 робочих дні",
        },
      },
      { status: 201 }
    );

} catch (error) {
console.error("Помилка при оформленні замовлення:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при оформленні замовлення",
      },
      { status: 500 }
    );

}
}
