import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderProductDocument extends Document {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface ShippingInfoDocument extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderDocument extends Document {
  userId: mongoose.Types.ObjectId;
  products: OrderProductDocument[];
  shippingInfo: ShippingInfoDocument;
  paymentMethod: "Cash On Delivery" | "Bank";
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be positive"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  total: {
    type: Number,
    required: [true, "Total is required"],
    min: [0, "Total must be positive"],
  },
});

const shippingInfoSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name must be less than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    trim: true,
    match: [/^\+?[\d\s\-\(\)]{10,}$/, "Invalid phone format"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    minlength: [10, "Address must be at least 10 characters"],
    maxlength: [200, "Address must be less than 200 characters"],
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    products: {
      type: [orderProductSchema],
      required: [true, "Products are required"],
      validate: {
        validator: function (products: OrderProductDocument[]) {
          return products.length > 0;
        },
        message: "Order must contain at least one product",
      },
    },
    shippingInfo: {
      type: shippingInfoSchema,
      required: [true, "Shipping info is required"],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["Cash On Delivery", "Bank"],
        message: "Payment method must be either 'Cash On Delivery' or 'Bank'",
      },
      required: [true, "Payment method is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount must be positive"],
    },
    status: {
      type: String,
      enum: {
        values: [
          "pending",
          "confirmed",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ],
        message: "Invalid order status",
      },
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderDate: -1 });

const Order: Model<OrderDocument> =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
