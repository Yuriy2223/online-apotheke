import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthUrl } from "@/auth/google";
import { processGoogleAuth } from "@/auth/googleAuthService";
import { connectDB } from "@/database/MongoDB";

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
    console.error("Google auth URL generation error:", error);
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

    const authResult = await processGoogleAuth(code);

    if (!authResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: authResult.error,
          details: authResult.details,
        },
        { status: authResult.statusCode }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        data: authResult.data,
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", authResult.data!.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    response.cookies.set("refreshToken", authResult.data!.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Помилка входу через Google",
      },
      { status: 500 }
    );
  }
}
