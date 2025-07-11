import { NextRequest, NextResponse } from "next/server";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/jwt/jwt";
import { connectDB } from "@/database/MongoDB";
import User from "@/models/User";
import { JWTPayload } from "@/types/users";
import {
  deleteFromCloudinary,
  extractPublicId,
} from "@/utils/cloudinary-server";

interface UpdateAvatarRequest {
  avatarUrl: string;
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

    const { avatarUrl }: UpdateAvatarRequest = await request.json();

    if (avatarUrl === "") {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return NextResponse.json(
          {
            success: false,
            error: "Користувач не знайдений",
          },
          { status: 404 }
        );
      }

      if (user.avatar) {
        const publicId = extractPublicId(user.avatar);
        if (publicId) {
          try {
            await deleteFromCloudinary(publicId);
          } catch (error) {
            console.error("Error deleting old avatar:", error);
          }
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        {
          avatar: "",
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Не вдалося оновити аватар",
          },
          { status: 500 }
        );
      }

      const response = NextResponse.json(
        {
          success: true,
          data: {
            avatarUrl: "",
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
    }

    if (!avatarUrl || !avatarUrl.includes("cloudinary.com")) {
      return NextResponse.json(
        {
          success: false,
          error: "Недійсний URL аватара",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Користувач не знайдений",
        },
        { status: 404 }
      );
    }

    if (user.avatar && user.avatar !== avatarUrl) {
      const publicId = extractPublicId(user.avatar);
      if (publicId) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (error) {
          console.error("Error deleting old avatar:", error);
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        avatar: avatarUrl,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Не вдалося оновити аватар",
        },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        data: {
          avatarUrl: updatedUser.avatar,
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
    console.error("Avatar update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
