import { Schema, model, models, Types, Document } from "mongoose";

export interface MedicineProductReviewDocument extends Document {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicineProductReviewSchema = new Schema<MedicineProductReviewDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Medicine_products",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

medicineProductReviewSchema.index({ productId: 1, createdAt: -1 });
medicineProductReviewSchema.index({ userId: 1 });

const MedicineProductReviewModel =
  models.Medicine_product_reviews ||
  model<MedicineProductReviewDocument>(
    "Medicine_product_reviews",
    medicineProductReviewSchema
  );

export default MedicineProductReviewModel;
