// "use client";

// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useAppDispatch } from "@/redux/store";
// // import { selectLoggedIn } from "@/redux/auth/selectors";
// // import { selectProfile, selectLoading } from "@/redux/profile/selectors";
// import { Loader } from "@/components/Loader/Loader";
// // import { refreshToken } from "@/redux/auth/operations";
// // import { fetchProfile } from "@/redux/profile/operations";
// // import { Loader } from "../Loader/Loader";

// export function AppGuard({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch();
//   const profile = useSelector(selectProfile);
//   const loading = useSelector(selectLoading);
//   // const isLoggedIn = useSelector(selectLoggedIn);

//   // useEffect(() => {
//   //   if (isLoggedIn) {
//   //     dispatch(refreshToken());
//   //   }
//   // }, [dispatch, isLoggedIn]);

//   useEffect(() => {
//     if (!profile && !loading) {
//       dispatch(fetchProfile());
//     }
//   }, [dispatch, profile, loading]);

//   if (loading || !profile) {
//     return <Loader />;
//   }

//   return <>{children}</>;
// }
