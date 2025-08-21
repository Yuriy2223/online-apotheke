"use client";

import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./AuthProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          limit={3}
          // theme="light"
          theme="colored"
          toastClassName="border-2 border-green-dark"
        />
      </AuthProvider>
    </Provider>
  );
}
