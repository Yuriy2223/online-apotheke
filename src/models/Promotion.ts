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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
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
  startDate: 1,
  endDate: 1,
  discountPercent: -1,
});

const PromotionModel =
  mongoose.models.Promotion || mongoose.model("Promotion", promotionSchema);

export default PromotionModel;
