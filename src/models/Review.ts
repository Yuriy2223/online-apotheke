import mongoose, { Schema, Document, Model } from "mongoose";

export interface ReviewDocument extends Document {
  name: string;
  testimonial: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    testimonial: {
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

reviewSchema.index({ name: "text", testimonial: "text" });
reviewSchema.index({ createdAt: -1 });

const Review: Model<ReviewDocument> =
  mongoose.models.Review ||
  mongoose.model<ReviewDocument>("Review", reviewSchema);

export default Review;
