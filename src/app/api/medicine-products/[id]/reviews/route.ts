import { NextRequest, NextResponse } from "next/server";
import MedicineProductReviewModel from "@/models/MedicineProductReview";
import { connectDB } from "@/database/MongoDB";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const offset = (page - 1) * limit;

    const reviews = await MedicineProductReviewModel.find({ productId: id })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    const totalReviews = await MedicineProductReviewModel.countDocuments({
      productId: id,
    });

    const totalPages = Math.ceil(totalReviews / limit);

    return NextResponse.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages,
        totalReviews,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const newReview = new MedicineProductReviewModel({
      ...body,
      productId: id,
      createdAt: new Date(),
    });

    const savedReview = await newReview.save();

    return NextResponse.json({
      review: savedReview,
      success: true,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
