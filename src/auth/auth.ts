// import { NextRequest } from "next/server";
// import { verifyAccessToken } from "@/jwt/jwt";
// import { JWTPayload } from "@/types/users";
// import jwt from "jsonwebtoken";

// export const getTokenFromHeader = (request: NextRequest): string | null => {
//   const authHeader = request.headers.get("authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return null;
//   }
//   return authHeader.substring(7);
// };

// export const verifyAuth = (request: NextRequest): JWTPayload => {
//   const token = getTokenFromHeader(request);
//   if (!token) {
//     throw new Error("Token not provided");
//   }

//   try {
//     return verifyAccessToken(token);
//   } catch {
//     throw new Error("Invalid token");
//   }
// };

// export async function getUserId(request: NextRequest): Promise<string | null> {
//   try {
//     const authHeader = request.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return null;
//     }

//     const token = authHeader.substring(7);

//     if (!token) {
//       return null;
//     }

//     const JWT_SECRET = process.env.JWT_SECRET;
//     if (!JWT_SECRET) {
//       console.error("JWT_SECRET не встановлено");
//       return null;
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     return decoded.userId;
//   } catch (error) {
//     console.error("Помилка при верифікації токена:", error);
//     return null;
//   }
// }

// export async function verifyToken(token: string): Promise<JWTPayload | null> {
//   try {
//     const JWT_SECRET = process.env.JWT_SECRET;
//     if (!JWT_SECRET) {
//       console.error("JWT_SECRET не встановлено");
//       return null;
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     return decoded;
//   } catch (error) {
//     console.error("Помилка при верифікації токена:", error);
//     return null;
//   }
// }

// export function withAuth(
//   handler: (request: NextRequest, userId: string) => Promise<Response>
// ) {
//   return async (request: NextRequest) => {
//     const userId = await getUserId(request);

//     if (!userId) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Користувач не авторизований",
//         }),
//         {
//           status: 401,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     return handler(request, userId);
//   };
// }

// export function getAuthenticatedUser(request: NextRequest) {
//   const accessToken = request.cookies.get("accessToken")?.value;

//   if (!accessToken) {
//     throw new Error("Access token відсутній");
//   }

//   try {
//     const decoded = verifyAccessToken(accessToken);
//     return decoded;
//   } catch {
//     throw new Error("Недійсний access token");
//   }
// }
/************************************ */

import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/jwt/jwt";
import { JWTPayload } from "@/types/users";
import jwt from "jsonwebtoken";

export const getTokenFromHeader = (request: NextRequest): string | null => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
};

export const getTokenFromCookies = (request: NextRequest): string | null => {
  return request.cookies.get("accessToken")?.value || null;
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

// // 🔧 ВИПРАВЛЕНО: тепер шукає токен в cookies
// export async function getUserId(request: NextRequest): Promise<string | null> {
//   try {
//     // Спочатку пробуємо отримати з cookies
//     let token = request.cookies.get("accessToken")?.value;

//     // Якщо немає в cookies, пробуємо в headers
//     if (!token) {
//       const authHeader = request.headers.get("authorization");
//       if (authHeader && authHeader.startsWith("Bearer ")) {
//         token = authHeader.substring(7);
//       }
//     }

//     if (!token) {
//       return null;
//     }

//     const JWT_SECRET = process.env.JWT_SECRET;
//     if (!JWT_SECRET) {
//       console.error("JWT_SECRET не встановлено");
//       return null;
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     return decoded.userId;
//   } catch (error) {
//     console.error("Помилка при верифікації токена:", error);
//     return null;
//   }
// }
export async function getUserId(request: NextRequest): Promise<string | null> {
  try {
    // Використовуємо існуючу логіку з getAuthenticatedUser
    const user = getAuthenticatedUser(request);
    return user.userId;
  } catch (error) {
    console.error("Помилка при отриманні userId:", error);
    return null;
  }
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET не встановлено");
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("Помилка при верифікації токена:", error);
    return null;
  }
}

export function withAuth(
  handler: (request: NextRequest, userId: string) => Promise<Response>
) {
  return async (request: NextRequest) => {
    const userId = await getUserId(request);

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Користувач не авторизований",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return handler(request, userId);
  };
}

export function getAuthenticatedUser(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Access token відсутній");
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    return decoded;
  } catch {
    throw new Error("Недійсний access token");
  }
}

// 🔧 ДОДАНО: універсальна функція для отримання userId
export async function getUserIdUniversal(
  request: NextRequest
): Promise<string | null> {
  try {
    // Спочатку пробуємо використати існуючу функцію getAuthenticatedUser
    const user = getAuthenticatedUser(request);
    return user.userId;
  } catch {
    // Якщо не вдалося, пробуємо getUserId
    return await getUserId(request);
  }
}
