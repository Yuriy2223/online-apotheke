import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/database/MongoDB";
import { sendVerificationEmail } from "@/email/email";
import { generateEmailVerificationToken } from "@/jwt/jwt";
import { registerSchema } from "@/validation/users";
import { ValidationError } from "yup";

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
            error: "Validation error",
            details: validationError.errors,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: "Unknown validation error",
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
            error: "Account with this email already exists via Google",
            details: [
              "This email is already registered through Google. Use the 'Sign in with Google' button to log in.",
            ],
          },
          { status: 409 }
        );
      }

      if (existingUserByEmail.provider === "local") {
        return NextResponse.json(
          {
            success: false,
            error: "Account with this email already exists",
            details: [
              "User with this email is already registered. Try logging in or recovering your password.",
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
            error: "User with this phone number already exists",
            details: ["This phone number is already registered in the system."],
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
      } catch {
        // (emailError)
        // console.error("Error sending email:", emailError);
        throw new Error("Failed to send email verification");
      }
    });

    await session.endSession();

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "Registration successful. Check your email for verification",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // console.error("Registration error:", error);

    const errorMessage =
      error instanceof Error && error.message.includes("email")
        ? "Error sending email verification"
        : "Server error";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
