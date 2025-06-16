import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import Pharmacie from "@/models/Pharmacie";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "10";
    const limit = Math.min(
      20,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10))
    );

    if (!lat || !lng) {
      const pharmacies = await Pharmacie.find()
        .sort({ rating: -1 })
        .limit(limit)
        .lean();

      return NextResponse.json(
        {
          success: true,
          data: {
            pharmacies,
          },
        },
        { status: 200 }
      );
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radiusKm = parseFloat(radius);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(radiusKm)) {
      return NextResponse.json(
        {
          success: false,
          error: "Невірні координати або радіус",
        },
        { status: 400 }
      );
    }

    const pharmacies = await Pharmacie.find()
      .sort({ rating: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: {
          pharmacies,
          searchCenter: {
            lat: latitude,
            lng: longitude,
          },
          radius: radiusKm,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при отриманні найближчих аптек:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при отриманні найближчих аптек",
      },
      { status: 500 }
    );
  }
}
