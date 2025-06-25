// import { useLayoutEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { checkAuthStatus } from "@/redux/auth/operations";
// import { setAuthFromServer, clearAuth } from "@/redux/auth/slice";
// import { selectAuth } from "@/redux/auth/selectors";

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const dispatch = useAppDispatch();
//   const { isAuthenticated } = useAppSelector(selectAuth);

//   useLayoutEffect(() => {
//     const initAuth = async () => {
//       try {
//         const result = await dispatch(checkAuthStatus()).unwrap();

//         if (result) {
//           dispatch(
//             setAuthFromServer({
//               user: result.user,
//               isAuthenticated: true,
//             })
//           );
//         } else {
//           dispatch(clearAuth());
//         }
//       } catch (error) {
//         console.error("Auth initialization error:", error);
//         dispatch(clearAuth());
//       }
//     };

//     // Перевіряємо авторизацію тільки якщо користувач вважається авторизованим в Redux
//     // або якщо стан авторизації невідомий
//     if (isAuthenticated || isAuthenticated === undefined) {
//       initAuth();
//     }
//   }, [dispatch, isAuthenticated]);

//   return <>{children}</>;
// };
