"use client";

import { store, persistor } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

// interface LoadingScreenProps {
//   message?: string;
// }

// function LoadingScreen({ message = "Завантаження..." }: LoadingScreenProps) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//         <p className="text-gray-600">{message}</p>
//       </div>
//     </div>
//   );
// }

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        // loading={<LoadingScreen message="Відновлення сесії..." />}
        persistor={persistor}
      >
        {children}
        <ToastContainer
          // position="top-center"
          position="top-right"
          autoClose={4000}
          // hideProgressBar={false}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          limit={3}
          theme="light"
          // theme="colored"
          toastClassName="border-2 border-green-dark"
        />
      </PersistGate>
    </Provider>
  );
}
