import { NextRequest, NextResponse } from "next/server";
import { processGoogleAuth } from "@/auth/googleAuthService";
import { connectDB } from "@/database/MongoDB";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const baseUrl = process.env.CLIENT_URL!;

  if (error) {
    return NextResponse.redirect(`${baseUrl}/login?error=google_auth_failed`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=no_auth_code`);
  }

  try {
    await connectDB();

    const authResult = await processGoogleAuth(code);

    if (authResult.success && authResult.data) {
      // const redirectResponse = NextResponse.redirect(`${baseUrl}/dashboard`);
      const redirectResponse = NextResponse.redirect(`${baseUrl}/`);

      redirectResponse.cookies.set("accessToken", authResult.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60,
        path: "/",
      });

      redirectResponse.cookies.set(
        "refreshToken",
        authResult.data.refreshToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        }
      );

      return redirectResponse;
    } else {
      let errorType = "auth_failed";
      let errorMessage = authResult.error || "Помилка авторизації";

      if (authResult.statusCode === 409) {
        errorType = "email_exists_local";
        if (authResult.details) {
          errorMessage = authResult.details;
        }
      }

      return NextResponse.redirect(
        `${baseUrl}/login?error=${errorType}&message=${encodeURIComponent(
          errorMessage
        )}`
      );
    }
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      `${baseUrl}/login?error=server_error&message=${encodeURIComponent(
        "Помилка сервера"
      )}`
    );
  }
}
