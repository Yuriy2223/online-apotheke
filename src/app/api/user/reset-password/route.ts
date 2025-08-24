import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import User from "@/models/User";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: "Token and password are required" },
        { status: 400 }
      );
    }

    try {
      verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ resetPasswordToken: token }).select(
      "+password"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found or token invalid",
        },
        { status: 404 }
      );
    }

    user.password = password;
    user.resetPasswordToken = null;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password changed successfully. You can now log in.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
