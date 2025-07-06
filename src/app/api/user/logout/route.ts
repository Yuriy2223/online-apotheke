import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/database/ConnectMongoDB";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (refreshToken) {
      try {
        await User.updateMany(
          { refreshToken: refreshToken },
          { $pull: { refreshToken } }
        );
      } catch (error) {
        console.error("Error removing refresh token from DB:", error);
      }
    }

    const response = NextResponse.json(
      {
        success: true,
        data: { message: "Успішний вихід" },
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    const response = NextResponse.json(
      {
        success: false,
        error: "Помилка сервера",
      },
      { status: 500 }
    );

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  }
}
