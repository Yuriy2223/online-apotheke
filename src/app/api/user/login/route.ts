import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/database/MongoDB";
import { loginSchema } from "@/validation/validations";
import { generateAccessToken, generateRefreshToken } from "@/jwt/jwt";
import { ValidationError } from "yup";

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
            error: "Validation error",
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

    const { email, password } = body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Невірний email або пароль",
        },
        { status: 401 }
      );
    }

    if (user.provider !== "local") {
      return NextResponse.json(
        {
          success: false,
          error: "Цей акаунт використовує Google вхід",
        },
        { status: 400 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Невірний email або пароль",
        },
        { status: 401 }
      );
    }

    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "Підтвердіть email перед входом",
        },
        { status: 403 }
      );
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      provider: user.provider,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken.push(refreshToken);
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;
    delete userResponse.emailVerificationToken;

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
