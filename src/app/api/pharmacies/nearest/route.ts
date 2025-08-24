import { NextRequest, NextResponse } from "next/server";
import PharmacieModel from "@/models/Pharmacie";
import { connectDB } from "@/database/MongoDB";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      20,
      Math.max(1, parseInt(searchParams.get("limit") || "6", 10))
    );

    const pharmacies = await PharmacieModel.aggregate([
      { $sample: { size: limit } },
    ]);

    return NextResponse.json(
      {
        pharmacies,
        limit,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Server error while retrieving nearest pharmacies",
      },
      { status: 500 }
    );
  }
}
