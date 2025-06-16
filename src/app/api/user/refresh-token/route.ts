import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "yup";
import { connectDB } from "@/database/MongoDB";
import User, { UserDocument } from "@/models/User";
import { refreshTokenSchema } from "@/validation/users";
import { verifyRefreshToken, generateAccessToken } from "@/jwt/jwt";
import { RefreshTokenResponse, JWTPayload } from "@/types/users";
import { Types } from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    try {
      await refreshTokenSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        return NextResponse.json(
          {
            success: false,
            error: "Помилка валідації",
            details: validationError.errors,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: "Невідома помилка валідації",
        },
        { status: 400 }
      );
    }

    const { refreshToken } = body;

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

    return NextResponse.json(
      {
        success: true,
        data: { accessToken } as RefreshTokenResponse,
      },
      { status: 200 }
    );
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
