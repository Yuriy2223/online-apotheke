import { NextRequest, NextResponse } from "next/server";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/jwt/jwt";
import { connectDB } from "@/database/MongoDB";
import User, { UserDocument } from "@/models/User";
import { JWTPayload, UserResponse } from "@/types/users";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Токени не знайдено",
        },
        { status: 401 }
      );
    }

    let decoded: JWTPayload | undefined;
    let newAccessToken: string | null = null;

    if (accessToken) {
      try {
        decoded = verifyAccessToken(accessToken);
      } catch {
        console.log("Access token expired or invalid");
        accessToken = undefined;
      }
    }

    if (!decoded && refreshToken) {
      try {
        decoded = verifyRefreshToken(refreshToken);

        const user = await User.findById(decoded.userId);
        if (
          !user ||
          !Array.isArray(user.refreshToken) ||
          !user.refreshToken.includes(refreshToken)
        ) {
          return NextResponse.json(
            {
              success: false,
              error: "Недійсний refresh token",
            },
            { status: 401 }
          );
        }

        const payload: JWTPayload = {
          userId: decoded.userId,
          email: decoded.email,
          provider: decoded.provider,
        };

        newAccessToken = generateAccessToken(payload);
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: "Недійсний refresh token",
          },
          { status: 401 }
        );
      }
    }

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          error: "Недійсні токени",
        },
        { status: 401 }
      );
    }

    const user = (await User.findById(decoded.userId)) as UserDocument | null;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Користувач не знайдений",
        },
        { status: 401 }
      );
    }

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
          user: userResponse,
        },
      },
      { status: 200 }
    );

    if (newAccessToken) {
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Me endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
