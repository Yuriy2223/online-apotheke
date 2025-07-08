import mongoose, { Schema, Document, Model } from "mongoose";

export interface PharmacieDocument extends Document {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: string;
  url: string;
  openTime: string;
  closeTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const pharmacieSchema = new Schema<PharmacieDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    openTime: {
      type: String,
      required: true,
      trim: true,
    },
    closeTime: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

pharmacieSchema.index({ name: "text", address: "text", city: "text" });
pharmacieSchema.index({ city: 1 });
pharmacieSchema.index({ rating: -1 });
pharmacieSchema.index({ createdAt: -1 });

const PharmacieModel: Model<PharmacieDocument> =
  mongoose.models.Pharmacies ||
  mongoose.model<PharmacieDocument>("Pharmacies", pharmacieSchema);

export default PharmacieModel;
