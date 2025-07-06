import { Schema, model, models, Types, Document } from "mongoose";

export interface MedicineProductReview extends Document {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const MedicineProductReviewSchema = new Schema<MedicineProductReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "MedicineProduct",
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
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

MedicineProductReviewSchema.index({ productId: 1, createdAt: -1 });
MedicineProductReviewSchema.index({ userId: 1 });

const MedicineProductReviewModel =
  models.MedicineProductReview ||
  model<MedicineProductReview>(
    "MedicineProductReview",
    MedicineProductReviewSchema
  );

export default MedicineProductReviewModel;
