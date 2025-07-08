import mongoose, { Schema, Document, Model } from "mongoose";

export interface MedicineProductDocument extends Document {
  photo: string;
  name: string;
  suppliers: string;
  stock: number;
  price: number;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicineProductSchema = new Schema<MedicineProductDocument>(
  {
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    suppliers: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

medicineProductSchema.index({
  name: "text",
  category: "text",
  suppliers: "text",
});
medicineProductSchema.index({ category: 1 });
medicineProductSchema.index({ price: 1 });
medicineProductSchema.index({ createdAt: -1 });

const MedicineProduct: Model<MedicineProductDocument> =
  mongoose.models.Medicine_product ||
  mongoose.model<MedicineProductDocument>(
    "Medicine_product",
    medicineProductSchema
  );

export default MedicineProduct;
