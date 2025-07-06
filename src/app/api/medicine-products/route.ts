import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import MedicineProduct from "@/models/MedicineProduct";

interface FilterOptions {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
  category?: string;
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

    let sortOption: { [key: string]: 1 | -1 };

    if (sortBy === "category") {
      sortOption = { category: 1 };
    } else {
      sortOption = { name: 1 };
    }

    const totalItems = await MedicineProduct.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const products = await MedicineProduct.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching medicine products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
