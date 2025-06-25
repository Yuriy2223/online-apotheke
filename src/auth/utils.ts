// import { verifyAccessToken } from "@/jwt/jwt";
// import { NextRequest } from "next/server";

// // Утиліта для перевірки авторизації в API маршрутах
// export function verifyAuth(request: NextRequest) {
//   const accessToken = request.cookies.get("accessToken")?.value;

//   if (!accessToken) {
//     throw new Error("Access token not found");
//   }

//   try {
//     return verifyAccessToken(accessToken);
//   } catch (error) {
//     throw new Error("Invalid access token");
//   }
// }

// // Утиліта для отримання користувача з запиту
// export function getUserFromRequest(request: NextRequest) {
//   try {
//     return verifyAuth(request);
//   } catch (error) {
//     return null;
//   }
// }

// // Функція для створення захищеного API handler
// export function withAuth<T extends any[]>(
//   handler: (request: NextRequest, ...args: T) => Promise<Response> | Response
// ) {
//   return async (request: NextRequest, ...args: T) => {
//     try {
//       verifyAuth(request);
//       return handler(request, ...args);
//     } catch (error) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Необхідна авторизація",
//         }),
//         {
//           status: 401,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }
//   };
// }

// // Хук для клієнтської перевірки авторизації
// export const useAuthCheck = () => {
//   const checkAuth = async (): Promise<boolean> => {
//     try {
//       const response = await fetch("/api/user/me", {
//         credentials: "include",
//       });
//       return response.ok;
//     } catch (error) {
//       return false;
//     }
//   };

//   return { checkAuth };
// };
