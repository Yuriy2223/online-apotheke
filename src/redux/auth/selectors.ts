import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;

export const selectLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectLoading = (state: RootState) => state.auth.loading;

export const selectError = (state: RootState) => state.auth.error;
