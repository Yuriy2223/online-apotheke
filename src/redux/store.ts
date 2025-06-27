import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  persistStore,
  // persistReducer
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";

// const authPersistConfig = {
//   key: "auth",
//   storage,
//   // whitelist: ["user", "isAuthenticated"],
//   whitelist: ["isAuthenticated"],
// };

// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // auth: persistedAuthReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/PAUSE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
