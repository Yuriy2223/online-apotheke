import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import User, { UserDocument } from "@/models/User";
import { verifyAuth } from "@/auth/auth";
import { JWTPayload, UserResponse } from "@/types/users";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    let decoded: JWTPayload;
    try {
      decoded = verifyAuth(request);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Необхідна авторизація",
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
        { status: 404 }
      );
    }

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.emailVerificationToken;
    userObject._id = userObject._id.toString();

    const userResponse = userObject as UserResponse;

    return NextResponse.json(
      {
        success: true,
        data: { user: userResponse },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user info error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );
  }
}
