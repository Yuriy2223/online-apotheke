import mongoose, { Schema, Document, Model } from "mongoose";

export interface TelegramOrderDocument extends Document {
  telegramUserId: number;
  orderNumber: string;
  userName: string;
  phone: string;
  address: string;
  items: {
    medicineId: string;
    medicineName: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const telegramOrderSchema = new Schema<TelegramOrderDocument>(
  {
    telegramUserId: {
      type: Number,
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^\+380\d{9}$/,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        medicineId: {
          type: String,
          required: true,
        },
        medicineName: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

telegramOrderSchema.index({ telegramUserId: 1, createdAt: -1 });
telegramOrderSchema.index({ orderNumber: 1 });
telegramOrderSchema.index({ status: 1 });
telegramOrderSchema.index({ createdAt: -1 });

const TelegramOrderModel: Model<TelegramOrderDocument> =
  mongoose.models.Telegram_order ||
  mongoose.model<TelegramOrderDocument>("Telegram_order", telegramOrderSchema);

export default TelegramOrderModel;
