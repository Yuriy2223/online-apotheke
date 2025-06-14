import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sendVerificationEmail } from "@/email/email";
import { connectDB } from "@/database/MongoDB";
import { generateEmailVerificationToken } from "@/jwt/jwt";
import { registerSchema } from "@/validation/validations";
import { ValidationError } from "yup";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    try {
      await registerSchema.validate(body, { abortEarly: false });
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

    const { name, email, phone, password } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Користувач з таким email вже існує",
        },
        { status: 409 }
      );
    }

    const emailVerificationToken = generateEmailVerificationToken();

    const newUser = new User({
      name,
      email,
      phone,
      password,
      provider: "local",
      isEmailVerified: false,
      emailVerificationToken,
    });

    await newUser.save();

    try {
      await sendVerificationEmail(email, emailVerificationToken);
    } catch (emailError) {
      console.error("Помилка при відправці email:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "Перевірте email для підтвердження",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
