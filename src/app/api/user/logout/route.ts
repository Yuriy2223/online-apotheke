import { NextRequest, NextResponse } from "next/server";
import User, { UserDocument } from "@/models/User";
import { verifyAuth } from "@/auth/auth";
import { JWTPayload } from "@/types";
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

    const user = (await User.findById(decoded.userId)) as UserDocument | null;
    if (user && refreshToken) {
      user.refreshToken = user.refreshToken.filter(
        (token) => token !== refreshToken
      );
      await user.save();
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
