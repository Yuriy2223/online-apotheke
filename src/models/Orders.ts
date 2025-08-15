import mongoose, { Schema, Document, Model } from "mongoose";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrdersDocument extends Document {
  photo?: string;
  name: string;
  address: string;
  products: string;
  price: number;
  status: OrderStatus;
  order_date: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrdersSchema = new Schema<OrdersDocument>(
  {
    photo: {
      type: String,
      required: false,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    products: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },
    order_date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

OrdersSchema.index({
  name: "text",
  address: "text",
  products: "text",
});
OrdersSchema.index({ price: 1 });
OrdersSchema.index({ createdAt: -1 });

const OrdersModel: Model<OrdersDocument> =
  mongoose.models.Orders ||
  mongoose.model<OrdersDocument>("Orders", OrdersSchema);

export default OrdersModel;
