import { NextResponse } from "next/server";
import ReviewHomeModel from "@/models/ReviewHome";
import { connectDB } from "@/database/MongoDB";

export async function GET() {
  try {
    await connectDB();
    const reviews = await ReviewHomeModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(reviews, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Server error while retrieving feedback",
      },
      { status: 500 }
    );
  }
}
