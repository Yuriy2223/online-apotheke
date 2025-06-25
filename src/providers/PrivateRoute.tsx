// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { checkAuthStatus } from "@/redux/auth/operations";
// import { useAppDispatch, useAppSelector } from "@/redux/store";

// export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     dispatch(checkAuthStatus());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) return null;

//   return <>{children}</>;
// };
