import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/database/MongoDB";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Неправильний формат ID продукту",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Продукт не знайдено",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          product,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при отриманні продукту:", error);

    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json(
        {
          success: false,
          error: "Неправильний формат ID продукту",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера при отриманні продукту",
      },
      { status: 500 }
    );
  }
}
