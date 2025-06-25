// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { toast } from "react-toastify";

// export function useAuthErrorToast() {
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const error = searchParams.get("error");
//     const message = searchParams.get("message");

//     if (error) {
//       const decodedMessage = message ? decodeURIComponent(message) : null;

//       switch (error) {
//         case "email_exists_local":
//           toast.error(
//             decodedMessage || "Будь ласка, увійдіть так як зареєструвались"
//           );
//           break;
//         case "google_auth_failed":
//           toast.error(decodedMessage || "Помилка авторизації через Google");
//           break;
//         case "no_auth_code":
//           toast.error(
//             decodedMessage || "Не отримано код авторизації від Google"
//           );
//           break;
//         case "auth_failed":
//           toast.error(decodedMessage || "Помилка авторизації");
//           break;
//         case "server_error":
//           toast.error(decodedMessage || "Помилка сервера");
//           break;
//         default:
//           toast.error(decodedMessage || "Сталася невідома помилка");
//       }

//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//     }
//   }, [searchParams]);
// }
