import { NextRequest, NextResponse } from "next/server";
import MedicineProduct from "@/models/MedicineProduct";
import { connectDB } from "@/database/MongoDB";

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
    switch (sortBy) {
      case "category":
        sortOption = { category: 1 };
        break;
      case "price":
        sortOption = { price: 1 };
        break;
      case "stock":
        sortOption = { stock: -1 };
        break;
      default:
        sortOption = { name: 1 };
    }

    const totalItems = await MedicineProduct.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const products = await MedicineProduct.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const categories = await MedicineProduct.distinct("category");

    return NextResponse.json({
      products,
      categories,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching medicine products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const requiredFields = ["name", "category", "stock", "suppliers", "price"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    const newProduct = new MedicineProduct({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(
      {
        product: savedProduct,
        message: "Product created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "Product with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
