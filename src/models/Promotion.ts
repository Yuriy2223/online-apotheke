import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicineProduct",
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    promoType: {
      type: String,
      enum: ["sale", "flash", "seasonal", "clearance"],
      default: "sale",
    },
  },
  {
    timestamps: true,
  }
);

promotionSchema.index({
  isActive: 1,
  discountPercent: -1,
});

promotionSchema.index({
  productId: 1,
  isActive: 1,
});

promotionSchema.index({
  discountPercent: 1,
  isActive: 1,
});

const PromotionModel =
  mongoose.models.Promotion || mongoose.model("Promotion", promotionSchema);

export default PromotionModel;
