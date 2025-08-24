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

    const { token } = body;

    try {
      verifyEmailVerificationToken(token);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or outdated token",
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
          error: "Token is invalid or email has already been confirmed",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email successfully verified. You can now log in.",
      },
      { status: 200 }
    );
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
