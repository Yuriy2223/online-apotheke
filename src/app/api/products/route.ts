import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import Product from "@/models/Product";

interface GetProductsQuery {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  supplier?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const query: GetProductsQuery = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      minPrice: searchParams.get("minPrice") || undefined,
      maxPrice: searchParams.get("maxPrice") || undefined,
      supplier: searchParams.get("supplier") || undefined,
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: searchParams.get("sortOrder") || "desc",
    };

    const page = Math.max(1, parseInt(query.page, 10));
    const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10)));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { category: { $regex: query.search, $options: "i" } },
        { suppliers: { $regex: query.search, $options: "i" } },
      ];
    }

    if (query.category) {
      filter.category = { $regex: query.category, $options: "i" };
    }

    if (query.supplier) {
      filter.suppliers = { $regex: query.supplier, $options: "i" };
    }

    if (query.minPrice || query.maxPrice) {
      const priceFilter: Record<string, unknown> = {};

      if (query.minPrice) {
        const minPrice = parseFloat(query.minPrice);
        if (!isNaN(minPrice)) {
          priceFilter.$gte = minPrice.toString();
        }
      }

      if (query.maxPrice) {
        const maxPrice = parseFloat(query.maxPrice);
        if (!isNaN(maxPrice)) {
          priceFilter.$lte = maxPrice.toString();
        }
      }

      if (Object.keys(priceFilter).length > 0) {
        filter.price = priceFilter;
      }
    }

    const sortOptions: Record<string, 1 | -1> = {};
    const validSortFields = [
      "name",
      "price",
      "category",
      "suppliers",
      "createdAt",
      "updatedAt",
    ];

    if (validSortFields.includes(query.sortBy)) {
      sortOptions[query.sortBy] = query.sortOrder === "asc" ? 1 : -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const [products, totalCount] = await Promise.all([
      Product.find(filter).sort(sortOptions).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        data: {
          products,
          pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            limit,
            hasNextPage,
            hasPrevPage,
          },
          filters: {
            search: query.search,
            category: query.category,
            supplier: query.supplier,
            minPrice: query.minPrice,
            maxPrice: query.maxPrice,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при отриманні продуктів",
      },
      { status: 500 }
    );
  }
}
