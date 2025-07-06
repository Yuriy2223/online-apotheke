import { NextRequest, NextResponse } from "next/server";

import PharmacieNearestModel from "@/models/PharmacieNearest";

export async function GET(request: NextRequest) {
  try {
    // await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      20,
      Math.max(1, parseInt(searchParams.get("limit") || "6", 10))
    );

    const pharmacies = await PharmacieNearestModel.find({})
      .sort({ rating: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        pharmacies,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при отриманні найближчих аптек:", error);

    return NextResponse.json(
      {
        error: "Помилка сервера при отриманні найближчих аптек",
      },
      { status: 500 }
    );
  }
}
