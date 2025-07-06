import mongoose, { Schema, Document, Model } from "mongoose";

export interface PharmacieNearestDocument extends Document {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const pharmacieNearestSchema = new Schema<PharmacieNearestDocument>(
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

pharmacieNearestSchema.index({ name: "text", address: "text", city: "text" });
pharmacieNearestSchema.index({ city: 1 });
pharmacieNearestSchema.index({ rating: -1 });
pharmacieNearestSchema.index({ createdAt: -1 });

const PharmacieNearestModel: Model<PharmacieNearestDocument> =
  mongoose.models.Pharmacies_nearest ||
  mongoose.model<PharmacieNearestDocument>(
    "Pharmacies_nearest",
    pharmacieNearestSchema
  );

export default PharmacieNearestModel;
