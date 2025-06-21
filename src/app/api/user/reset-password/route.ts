import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import User from "@/models/User";
import { verify, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: "Токен і пароль обов'язкові" },
        { status: 400 }
      );
    }

    try {
      verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json(
        { success: false, error: "Недійсний або прострочений токен" },
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
          error: "Користувача не знайдено або токен недійсний",
        },
        { status: 404 }
      );
    }

    user.password = password;
    user.resetPasswordToken = null;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Пароль успішно змінено. Тепер ви можете увійти.",
    });
  } catch (error) {
    console.error("Помилка при зміні пароля:", error);
    return NextResponse.json(
      { success: false, error: "Помилка сервера" },
      { status: 500 }
    );
  }
}
