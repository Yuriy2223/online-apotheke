import { NextRequest, NextResponse } from "next/server";
import MedicineProductModel from "@/models/MedicineProduct";
import PromotionModel from "@/models/Promotion";
import { connectDB } from "@/database/MongoDB";

interface FilterOptions {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
  category?: string;
  _id?: { $in: string[] };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sortBy = searchParams.get("sortBy") || "name";
    const discount = searchParams.get("discount") || "";

    const filter: FilterOptions = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { suppliers: { $regex: search, $options: "i" } },
      ];
    }

    if (
      category &&
      category !== "Show all" &&
      category !== "Product category"
    ) {
      filter.category = category;
    }

    if (discount) {
      const activePromotions = await PromotionModel.find({
        discountPercent: { $gte: parseInt(discount) },
        isActive: true,
      }).lean();

      if (activePromotions.length > 0) {
        const productIds = activePromotions.map((p) => p.productId.toString());
        filter._id = { $in: productIds };
      } else {
        return NextResponse.json({
          products: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalCount: 0,
            hasNextPage: false,
            hasPrevPage: false,
            limit,
          },
        });
      }
    }

    let sortOption: { [key: string]: 1 | -1 };

    if (sortBy === "category") {
      sortOption = { category: 1 };
    } else {
      sortOption = { name: 1 };
    }

    const totalCount = await MedicineProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const products = await MedicineProductModel.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const productIds = products.map((p) => p._id.toString());

    const promotions = await PromotionModel.find({
      productId: { $in: productIds },
      isActive: true,
    }).lean();

    const promotionMap = new Map();
    promotions.forEach((promo) => {
      promotionMap.set(promo.productId.toString(), promo);
    });

    const productsWithPromotions = products.map((product) => {
      const promotion = promotionMap.get(product._id.toString());

      if (promotion) {
        const finalPrice =
          product.price * (1 - promotion.discountPercent / 100);
        return {
          ...product,
          promotion: {
            discountPercent: promotion.discountPercent,
            promoType: promotion.promoType,
          },
          finalPrice: Math.round(finalPrice * 100) / 100,
        };
      }

      return {
        ...product,
        finalPrice: product.price,
      };
    });

    return NextResponse.json({
      products: productsWithPromotions,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
