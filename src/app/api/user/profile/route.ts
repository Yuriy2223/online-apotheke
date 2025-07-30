import { NextRequest, NextResponse } from "next/server";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/jwt/jwt";
import { connectDB } from "@/database/MongoDB";
import User, { UserDocument } from "@/models/User";
import { JWTPayload, UserResponse } from "@/types/users";

interface UpdateProfileData {
  name?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export async function PUT(request: NextRequest) {
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

    const updateData: UpdateProfileData = await request.json();

    if (
      updateData.name &&
      (updateData.name.length < 3 || updateData.name.length > 50)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Ім'я повинно бути від 3 до 50 символів",
        },
        { status: 400 }
      );
    }

    if (updateData.phone && !/^\+?[1-9]\d{1,14}$/.test(updateData.phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Некоректний формат телефону",
        },
        { status: 400 }
      );
    }

    if (updateData.avatar && updateData.avatar.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: "URL аватара занадто довгий",
        },
        { status: 400 }
      );
    }

    if (updateData.address && updateData.address.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: "Адреса занадто довга",
        },
        { status: 400 }
      );
    }

    const updatedUser = (await User.findByIdAndUpdate(
      decoded.userId,
      {
        ...(updateData.name && { name: updateData.name.trim() }),
        ...(updateData.phone && { phone: updateData.phone.trim() }),
        ...(updateData.address !== undefined && {
          address: updateData.address.trim(),
        }),
        ...(updateData.avatar !== undefined && {
          avatar: updateData.avatar.trim(),
        }),
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )) as UserDocument | null;

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Користувач не знайдений",
        },
        { status: 404 }
      );
    }

    const userObject = updatedUser.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.emailVerificationToken;
    delete userObject.resetPasswordToken;
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
    console.error("Profile update error:", error);

    if (error instanceof Error && error.message.includes("validation failed")) {
      return NextResponse.json(
        {
          success: false,
          error: "Помилка валідації даних",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
