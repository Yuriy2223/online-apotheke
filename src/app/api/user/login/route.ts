import { NextRequest, NextResponse } from "next/server";
import User, { UserDocument } from "@/models/User";
import { connectDB } from "@/database/MongoDB";
import { loginSchema } from "@/validation/users";
import { generateAccessToken, generateRefreshToken } from "@/jwt/jwt";
import { ValidationError } from "yup";
import { Types } from "mongoose";
import { JWTPayload, UserResponse } from "@/types/users";

const MAX_REFRESH_TOKENS = 5;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    try {
      await loginSchema.validate(body, { abortEarly: false });
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

    const { email, password }: { email: string; password: string } = body;

    const user = (await User.findOne({ email }).select(
      "+password"
    )) as UserDocument | null;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Невірні дані для входу",
        },
        { status: 401 }
      );
    }

    if (user.provider === "google") {
      return NextResponse.json(
        {
          success: false,
          error: "Цей акаунт зареєстрований через Google",
          details: [
            "Будь ласка, використайте кнопку 'Увійти через Google' для входу в акаунт.",
          ],
        },
        { status: 401 }
      );
    }

    if (user.provider !== "local") {
      return NextResponse.json(
        {
          success: false,
          error: "Невірні дані для входу",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Невірні дані для входу",
        },
        { status: 401 }
      );
    }

    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "Підтвердіть email перед входом",
          details: [
            "Перевірте вашу електронну пошту та перейдіть за посиланням для підтвердження акаунту.",
          ],
        },
        { status: 403 }
      );
    }

    const payload: JWTPayload = {
      userId: (user._id as Types.ObjectId).toString(),
      email: user.email,
      provider: user.provider,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await User.findByIdAndUpdate(user._id, {
      $push: {
        refreshToken: {
          $each: [refreshToken],
          $slice: -MAX_REFRESH_TOKENS,
        },
      },
    });

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.emailVerificationToken;
    userObject._id = userObject._id.toString();

    const userResponse = userObject as UserResponse;

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "Ласкаво просимо!",
          user: userResponse,
          accessToken,
          refreshToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
