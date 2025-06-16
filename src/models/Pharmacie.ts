import mongoose, { Schema, Document, Model } from "mongoose";

export interface PharmacieDocument extends Document {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: string;
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
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
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

const Pharmacie: Model<PharmacieDocument> =
  mongoose.models.Pharmacie ||
  mongoose.model<PharmacieDocument>("Pharmacie", pharmacieSchema);

export default Pharmacie;
