import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/ConnectMongoDB";
import User, { UserDocument } from "@/models/User";
import { verifyRefreshToken, generateAccessToken } from "@/jwt/jwt";
import { JWTPayload } from "@/types/users";
import { Types } from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Refresh token не знайдено",
        },
        { status: 401 }
      );
    }

    let decoded: JWTPayload;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Недійсний refresh token",
        },
        { status: 401 }
      );
    }

    const user = (await User.findById(decoded.userId)) as UserDocument | null;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Користувач не знайдений",
        },
        { status: 401 }
      );
    }

    if (!user.refreshToken.includes(refreshToken)) {
      await User.findByIdAndUpdate(user._id, { $set: { refreshToken: [] } });

      return NextResponse.json(
        {
          success: false,
          error: "Недійсний refresh token. Увійдіть знову",
        },
        { status: 401 }
      );
    }

    await User.findByIdAndUpdate(user._id, { $pull: { refreshToken } });

    const payload: JWTPayload = {
      userId: (user._id as Types.ObjectId).toString(),
      email: user.email,
      provider: user.provider,
    };

    const accessToken = generateAccessToken(payload);

    const response = NextResponse.json(
      {
        success: true,
        data: { message: "Token оновлено" },
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
