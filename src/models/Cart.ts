import mongoose, { Schema, Document, Model } from "mongoose";

export interface CartProductDocument extends Document {
  _id: mongoose.Types.ObjectId;
  quantity: number;
}

export interface CartDocument extends Document {
  products: mongoose.Types.DocumentArray<CartProductDocument>;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
});

const cartSchema = new Schema(
  {
    products: [productSchema],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// cartSchema.index({ userId: 1 });

cartSchema.pre("save", function (this: CartDocument) {
  const seen = new Set<string>();
  const filteredProducts: CartProductDocument[] = [];

  this.products.forEach((product: CartProductDocument) => {
    const key = product._id.toString();
    if (!seen.has(key)) {
      seen.add(key);
      filteredProducts.push(product);
    }
  });

  this.products.splice(0, this.products.length);
  filteredProducts.forEach((product) => {
    this.products.push(product);
  });
});

const Cart: Model<CartDocument> =
  mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
