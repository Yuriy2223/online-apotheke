import mongoose, { Schema, Document, Model } from "mongoose";

export type SupplierStatus = "Active" | "Deactive";

export interface SuppliersDocument extends Document {
  name: string;
  address: string;
  company: string;
  date: string;
  amount: number;
  status: SupplierStatus;
  createdAt: Date;
  updatedAt: Date;
}

const SuppliersSchema = new Schema<SuppliersDocument>(
  {
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
    company: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ["Active", "Deactive"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SuppliersSchema.index({ name: "text", address: "text", company: "text" });
SuppliersSchema.index({ amount: 1 });
SuppliersSchema.index({ createdAt: -1 });
SuppliersSchema.index({ status: 1, createdAt: -1 });

const SuppliersModel: Model<SuppliersDocument> =
  mongoose.models.Suppliers ||
  mongoose.model<SuppliersDocument>("Suppliers", SuppliersSchema);

export default SuppliersModel;
