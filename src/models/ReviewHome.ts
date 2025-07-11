import mongoose, { Schema, Document, Model } from "mongoose";

export interface ReviewHomeDocument extends Document {
  name: string;
  avatar: string;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewsHomeSchema = new Schema<ReviewHomeDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

reviewsHomeSchema.index({ name: "text" });
reviewsHomeSchema.index({ createdAt: -1 });

const ReviewHomeModel: Model<ReviewHomeDocument> =
  mongoose.models.Reviews_home ||
  mongoose.model<ReviewHomeDocument>("Reviews_home", reviewsHomeSchema);

export default ReviewHomeModel;
