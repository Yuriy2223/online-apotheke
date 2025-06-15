import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `${process.env.CLIENT_URL}/login?error=google_auth_failed`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.CLIENT_URL}/login?error=no_auth_code`
    );
  }

  try {
    const response = await fetch(`${process.env.CLIENT_URL}/api/user/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } else {
      return NextResponse.redirect(
        `${process.env.CLIENT_URL}/login?error=auth_failed`
      );
    }
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      `${process.env.CLIENT_URL}/login?error=server_error`
    );
  }
}
