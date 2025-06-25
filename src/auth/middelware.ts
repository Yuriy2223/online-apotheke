// import { NextRequest, NextResponse } from "next/server";
// import { verifyAccessToken, verifyRefreshToken } from "@/jwt/jwt";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Захищені маршрути
//   const protectedRoutes = [
//     "/dashboard",
//     "/profile",
//     "/settings",
//     // Додайте інші захищені маршрути
//   ];

//   // API маршрути, які потребують авторизації
//   const protectedApiRoutes = [
//     "/api/user/me",
//     "/api/user/update-profile",
//     // Додайте інші захищені API маршрути
//   ];

//   // Перевіряємо, чи це захищений маршрут
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   const isProtectedApiRoute = protectedApiRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isProtectedRoute || isProtectedApiRoute) {
//     const accessToken = request.cookies.get("accessToken")?.value;
//     const refreshToken = request.cookies.get("refreshToken")?.value;

//     // Якщо немає жодного токена
//     if (!accessToken && !refreshToken) {
//       if (isProtectedApiRoute) {
//         return NextResponse.json(
//           { success: false, error: "Необхідна авторизація" },
//           { status: 401 }
//         );
//       }
//       // Перенаправляємо на сторінку входу для веб-маршрутів
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     // Перевіряємо access token
//     if (accessToken) {
//       try {
//         verifyAccessToken(accessToken);
//         return NextResponse.next();
//       } catch (error) {
//         console.log("Access token invalid, checking refresh token");
//       }
//     }

//     // Якщо access token недійсний, перевіряємо refresh token
//     if (refreshToken) {
//       try {
//         verifyRefreshToken(refreshToken);
//         // Refresh token дійсний, дозволяємо запит
//         // Новий access token буде згенерований в API endpoint
//         return NextResponse.next();
//       } catch (error) {
//         console.log("Refresh token invalid");
//       }
//     }

//     // Обидва токени недійсні
//     if (isProtectedApiRoute) {
//       return NextResponse.json(
//         { success: false, error: "Необхідна авторизація" },
//         { status: 401 }
//       );
//     }

//     // Очищаємо недійсні cookies та перенаправляємо на логін
//     const response = NextResponse.redirect(new URL("/login", request.url));
//     response.cookies.delete("accessToken");
//     response.cookies.delete("refreshToken");
//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Захищені сторінки
//     "/dashboard/:path*",
//     "/profile/:path*",
//     "/settings/:path*",
//     // Захищені API маршрути
//     "/api/user/me",
//     "/api/user/update-profile",
//     // Додайте інші маршрути за потребою
//   ],
// };
/**************************** */

// import { NextRequest, NextResponse } from "next/server";
// import { verifyAccessToken, verifyRefreshToken } from "@/jwt/jwt";

// export async function middleware(request: NextRequest) {
//   // Маршрути, які потребують авторизації
//   const protectedPaths = ["/dashboard", "/profile", "/api/protected"];
//   const isProtectedPath = protectedPaths.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//   );

//   if (!isProtectedPath) {
//     return NextResponse.next();
//   }

//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   // Якщо немає жодного токена, перенаправляємо на логін
//   if (!accessToken && !refreshToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Перевіряємо access token
//   if (accessToken) {
//     try {
//       verifyAccessToken(accessToken);
//       return NextResponse.next();
//     } catch (error) {
//       // Access token недійсний, спробуємо refresh token
//     }
//   }

//   // Якщо access token недійсний, перевіряємо refresh token
//   if (refreshToken) {
//     try {
//       verifyRefreshToken(refreshToken);

//       // Якщо це API запит, повертаємо 401 для автоматичного оновлення
//       if (request.nextUrl.pathname.startsWith("/api/")) {
//         return NextResponse.json(
//           { success: false, error: "Token expired" },
//           { status: 401 }
//         );
//       }

//       // Для звичайних сторінок перенаправляємо на оновлення токена
//       const response = NextResponse.redirect(
//         new URL("/api/auth/refresh", request.url)
//       );
//       response.headers.set("x-redirect-back", request.nextUrl.pathname);
//       return response;
//     } catch (error) {
//       // Refresh token також недійсний
//       const response = NextResponse.redirect(new URL("/login", request.url));

//       // Очищаємо cookies
//       response.cookies.set("accessToken", "", { maxAge: 0 });
//       response.cookies.set("refreshToken", "", { maxAge: 0 });

//       return response;
//     }
//   }

//   return NextResponse.redirect(new URL("/login", request.url));
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
// };
