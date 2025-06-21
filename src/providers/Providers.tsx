// "use client";

// import { store, persistor } from "@/redux/store";
// import { ReactNode } from "react";
// import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import { PersistGate } from "redux-persist/integration/react";

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
