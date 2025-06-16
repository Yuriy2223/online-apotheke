import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { verifyAuth } from "@/auth/auth";
import { JWTPayload } from "@/types/users";
import { connectDB } from "@/database/MongoDB";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    let decoded: JWTPayload;
    try {
      decoded = verifyAuth(request);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Необхідна авторизація",
        },
        { status: 401 }
      );
    }

    const { refreshToken }: { refreshToken?: string } = await request.json();

    if (refreshToken) {
      await User.findByIdAndUpdate(
        decoded.userId,
        { $pull: { refreshToken } },
        { new: true }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { message: "Успішний вихід" },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
