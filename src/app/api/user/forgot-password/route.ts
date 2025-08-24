import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { sign } from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/email/sendResetPasswordEmail";
import { connectDB } from "@/database/MongoDB";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: true, message: "If email exists, the email will be sent" },
        { status: 200 }
      );
    }

    const resetToken = sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetPasswordToken = resetToken;
    await user.save();

    try {
      await sendResetPasswordEmail(email, resetToken);

      return NextResponse.json(
        { success: true, message: "Email with link sent" },
        { status: 200 }
      );
    } catch {
      user.resetPasswordToken = null;
      await user.save();

      return NextResponse.json(
        { success: false, error: "Error sending email" },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
