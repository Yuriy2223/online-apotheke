import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/jwt/jwt";
import { JWTPayload } from "@/types";

export const getTokenFromHeader = (request: NextRequest): string | null => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
};

export const verifyAuth = (request: NextRequest): JWTPayload => {
  const token = getTokenFromHeader(request);
  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    return verifyAccessToken(token);
  } catch {
    throw new Error("Invalid token");
  }
};
