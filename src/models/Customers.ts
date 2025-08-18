import mongoose, { Schema, Document, Model } from "mongoose";

export interface CustomersDocument extends Document {
  _id: mongoose.Types.ObjectId;
  photo?: string;
  name: string;
  email: string;
  spent: number;
  phone: string;
  address: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomersSchema = new Schema<CustomersDocument>(
  {
    photo: {
      type: String,
      required: false,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Invalid email format",
      ],
    },
    spent: {
      type: Number,
      required: [true, "Spent amount is required"],
      min: [0, "Spent must be positive"],
      default: 0,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      match: [/^\+?[\d\s\-\(\)]{10,}$/, "Invalid phone format"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [5, "Address must be at least 5 characters"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CustomersSchema.index({
  name: "text",
  email: "text",
});
CustomersSchema.index({ name: 1 });
CustomersSchema.index({ email: 1 }, { unique: true });
CustomersSchema.index({ date: -1 });
CustomersSchema.index({ spent: -1 });

const CustomersModel: Model<CustomersDocument> =
  mongoose.models.Customers ||
  mongoose.model<CustomersDocument>("Customers", CustomersSchema);

export default CustomersModel;
