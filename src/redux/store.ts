// import { configureStore } from "@reduxjs/toolkit";
// // import storage from "../hooks/createWebStorage";
// import { useDispatch } from "react-redux";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { authReducer } from "./auth/slice";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const persistor = persistStore(store);

// // // createWebStorage.ts
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// const createNoopStorage = () => {
//   return {
//     getItem() {
//       return Promise.resolve(null);
//     },
//     setItem(_key: string, value: string) {
//       return Promise.resolve(value);
//     },
//     removeItem() {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window !== "undefined"
//     ? createWebStorage("local")
//     : createNoopStorage();

// export default storage;

// // Providers.tsx
// ("use client");

// import { store, persistor } from "@/redux/store";
// import { ReactNode } from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//         <ToastContainer
//           position="top-center"
//           autoClose={2000}
//           hideProgressBar
//           closeOnClick
//           pauseOnHover
//           draggable
//           pauseOnFocusLoss={false}
//           limit={3}
//           theme="colored"
//         />
//       </PersistGate>
//     </Provider>
//   );
// }

// // AppGuard.tsx
// ("use client");

// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useAppDispatch, RootState } from "@/redux/store";
// import { fetchProfile } from "@/redux/auth/operations"; // припускаємо що це існує
// import Loader from "@/components/Loader"; // припускаємо що це існує

// export function AppGuard({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch();

//   // Отримуємо дані з Redux store
//   const { profile, loading } = useSelector((state: RootState) => state.auth);

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
