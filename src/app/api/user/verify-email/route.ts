import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import User from "@/models/User";
import { verifyEmailSchema } from "@/validation/users";
import { verifyEmailVerificationToken } from "@/jwt/jwt";
import { ValidationError } from "yup";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    try {
      await verifyEmailSchema.validate(body, { abortEarly: false });
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

    const { token } = body;

    try {
      verifyEmailVerificationToken(token);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Недійсний або застарілий токен",
        },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        emailVerificationToken: token,
        provider: "local",
        isEmailVerified: false,
      },
      {
        $set: { isEmailVerified: true },
        $unset: { emailVerificationToken: 1 },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Токен недійсний або email вже підтверджено",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email успішно підтверджено. Тепер ви можете увійти.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
