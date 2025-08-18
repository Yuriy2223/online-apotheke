import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction {
  type: "income" | "expense";
  name: string;
  amount: number;
}

export interface TransactionDocument extends ITransaction, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<TransactionDocument>(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "Amount must be greater than 0"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.index({ name: "text" });
TransactionSchema.index({ type: 1 });
TransactionSchema.index({ createdAt: -1 });

const TransactionModel: Model<TransactionDocument> =
  mongoose.models.Transactions ||
  mongoose.model<TransactionDocument>("Transactions", TransactionSchema);

export default TransactionModel;
