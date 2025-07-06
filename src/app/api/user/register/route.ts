import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sendVerificationEmail } from "@/email/email";
import { connectDB } from "@/database/ConnectMongoDB";
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

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      await session.endSession();

      if (existingUserByEmail.provider === "google") {
        return NextResponse.json(
          {
            success: false,
            error: "Акаунт з цим email вже існує через Google",
            details: [
              "Цей email вже зареєстрований через Google. Використайте кнопку 'Увійти через Google' для входу.",
            ],
          },
          { status: 409 }
        );
      }

      if (existingUserByEmail.provider === "local") {
        return NextResponse.json(
          {
            success: false,
            error: "Акаунт з цим email вже існує",
            details: [
              "Користувач з цим email вже зареєстрований. Спробуйте увійти або відновити пароль.",
            ],
          },
          { status: 409 }
        );
      }
    }

    if (phone) {
      const existingUserByPhone = await User.findOne({ phone });
      if (existingUserByPhone) {
        await session.endSession();
        return NextResponse.json(
          {
            success: false,
            error: "Користувач з цим номером телефону вже існує",
            details: ["Цей номер телефону вже зареєстрований в системі."],
          },
          { status: 409 }
        );
      }
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
