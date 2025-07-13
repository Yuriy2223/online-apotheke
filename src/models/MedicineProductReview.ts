import { Schema, model, models, Document } from "mongoose";

export interface MedicineProductReviewDocument extends Document {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  commentDate: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicineProductReviewSchema = new Schema<MedicineProductReviewDocument>(
  {
    productId: {
      type: String,
      ref: "Medicine_products",
      required: true,
    },
    userId: {
      type: String,
      ref: "Users",
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
    commentDate: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
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
