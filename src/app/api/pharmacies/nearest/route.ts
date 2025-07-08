import { NextRequest, NextResponse } from "next/server";
// import PharmacieNearestModel from "@/models/PharmacieNearest";
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

    // const pharmacies = await PharmacieNearestModel.find({})
    //   .sort({ rating: -1 })
    //   .limit(limit)
    //   .lean();
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
