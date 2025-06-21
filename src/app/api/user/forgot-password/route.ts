import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import User from "@/models/User";
import { sign } from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/email/sendResetPasswordEmail";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email обов'язковий" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: true, message: "Якщо email існує, лист буде надіслано" },
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
        { success: true, message: "Лист з посиланням надіслано" },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);

      user.resetPasswordToken = null;
      await user.save();

      return NextResponse.json(
        { success: false, error: "Помилка при надсиланні листа" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "Помилка сервера" },
      { status: 500 }
    );
  }
}
