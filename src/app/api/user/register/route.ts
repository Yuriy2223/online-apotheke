import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sendVerificationEmail } from "@/email/email";
import { connectDB } from "@/database/MongoDB";
import { generateEmailVerificationToken } from "@/jwt/jwt";
import { registerSchema } from "@/validation/users";
import { ValidationError } from "yup";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const session = await mongoose.startSession();
    const body = await request.json();

    try {
      await registerSchema.validate(body, { abortEarly: false });
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

    const { name, email, phone, password } = body;

    const existingUser = await User.findOne({
      $or: [{ email }, ...(phone ? [{ phone }] : [])],
    });

    if (existingUser) {
      await session.endSession();
      return NextResponse.json(
        {
          success: false,
          error: "Користувач з такими даними вже існує",
        },
        { status: 409 }
      );
    }

    const emailVerificationToken = generateEmailVerificationToken();

    await session.withTransaction(async () => {
      const newUser = new User({
        name,
        email,
        phone: phone || null,
        password,
        provider: "local",
        isEmailVerified: false,
        emailVerificationToken,
      });

      await newUser.save({ session });

      try {
        await sendVerificationEmail(email, emailVerificationToken);
      } catch (emailError) {
        console.error("Помилка при відправці email:", emailError);
        throw new Error("Не вдалося відправити email підтвердження");
      }
    });

    await session.endSession();

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "Реєстрація успішна. Перевірте email для підтвердження",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Помилка реєстрації:", error);

    const errorMessage =
      error instanceof Error && error.message.includes("email")
        ? "Помилка відправки email підтвердження"
        : "Помилка сервера";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
