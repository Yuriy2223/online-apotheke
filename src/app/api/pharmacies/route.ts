import { NextRequest, NextResponse } from "next/server";
import PharmacieModel from "@/models/Pharmacie";
import { connectDB } from "@/database/MongoDB";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10))
    );
    const skip = (page - 1) * limit;

    const search = searchParams.get("search");
    const city = searchParams.get("city");
    const minRating = searchParams.get("minRating");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    if (minRating !== null) {
      const rating = parseFloat(minRating);
      if (!isNaN(rating)) {
        filter.rating = { $gte: rating };
      }
    }

    const sortOptions: Record<string, 1 | -1> = {};
    const validSortFields = [
      "name",
      "city",
      "rating",
      "createdAt",
      "updatedAt",
    ];

    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const [pharmacies, totalCount] = await Promise.all([
      PharmacieModel.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      PharmacieModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        pharmacies,
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
        search,
        city,
        minRating,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Server error while retrieving the list of pharmacies",
      },
      { status: 500 }
    );
  }
}
