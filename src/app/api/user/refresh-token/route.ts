import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
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
          error: "Refresh token not found",
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
          error: "Invalid refresh token",
        },
        { status: 401 }
      );
    }

    const user = (await User.findById(decoded.userId)) as UserDocument | null;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 401 }
      );
    }

    if (!user.refreshToken.includes(refreshToken)) {
      await User.findByIdAndUpdate(user._id, { $set: { refreshToken: [] } });

      return NextResponse.json(
        {
          success: false,
          error: "Invalid refresh token. Please log in again",
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
        data: { message: "Token updated" },
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
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Server error",
      },
      { status: 500 }
    );
  }
}
