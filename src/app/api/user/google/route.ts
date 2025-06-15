import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import User, { UserDocument } from "@/models/User";
import { getGoogleAuthUrl, getGoogleUserInfo } from "@/auth/google";
import { generateAccessToken, generateRefreshToken } from "@/jwt/jwt";
import { GoogleAuthResponse, JWTPayload, UserResponse } from "@/types";

const MAX_REFRESH_TOKENS = 5;

export async function GET() {
  try {
    const authUrl = getGoogleAuthUrl();

    return NextResponse.json(
      {
        success: true,
        data: { authUrl },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google auth URL error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка створення посилання Google",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Код авторизації відсутній",
        },
        { status: 400 }
      );
    }

    const googleUser = await getGoogleUserInfo(code);

    let user = (await User.findOne({
      email: googleUser.email,
    })) as UserDocument | null;
    let isNewUser = false;

    if (user) {
      if (user.provider === "local" && !user.googleId) {
        await User.findByIdAndUpdate(user._id, {
          $set: {
            googleId: googleUser.googleId,
            provider: "google",
            isEmailVerified: true,
          },
        });
        user = (await User.findById(user._id)) as UserDocument;
      }
    } else {
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        provider: "google",
        isEmailVerified: true,
        phone: null,
        password: null,
      });

      await user.save();
      isNewUser = true;
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
          message: "Успішний вхід через Google!",
          user: userResponse,
          accessToken,
          refreshToken,
          isNewUser,
        } as GoogleAuthResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка входу через Google",
      },
      { status: 500 }
    );
  }
}
