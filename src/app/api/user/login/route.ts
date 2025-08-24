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

    const { email, password }: { email: string; password: string } = body;

    const user = (await User.findOne({ email }).select(
      "+password"
    )) as UserDocument | null;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid login details",
        },
        { status: 401 }
      );
    }

    if (user.provider === "google") {
      return NextResponse.json(
        {
          success: false,
          error: "This account is registered through Google",
          details: [
            "Please use the 'Sign in with Google' button to sign in to your account.",
          ],
        },
        { status: 401 }
      );
    }

    if (user.provider !== "local") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid login details",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid login details",
        },
        { status: 401 }
      );
    }

    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "Confirm email before logging in",
          details: [
            "Check your email and follow the link to verify your account.",
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

    const response = NextResponse.json(
      {
        success: true,
        data: {
          message: "Welcome!",
          user: userResponse,
        },
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

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
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
