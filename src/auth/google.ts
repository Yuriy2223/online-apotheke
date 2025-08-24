import { OAuth2Client } from "google-auth-library";

export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
}

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.CLIENT_URL
) {
  throw new Error("Google OAuth credentials and CLIENT_URL are required");
}

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.CLIENT_URL}/api/user/google/callback`
);

export const getGoogleAuthUrl = (): string => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
};

export const getGoogleUserInfo = async (code: string): Promise<GoogleUser> => {
  try {
    const { tokens } = await client.getToken(code);

    if (!tokens.id_token) {
      throw new Error("No ID token received from Google");
    }

    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email || !payload.name) {
      throw new Error("Incomplete user data from Google");
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      isEmailVerified: payload.email_verified || false,
    };
  } catch {
    throw new Error("Failed to get user info from Google");
  }
};
