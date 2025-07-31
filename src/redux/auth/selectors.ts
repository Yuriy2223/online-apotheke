import { RootState } from "../store";

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectIsAuthChecking = (state: RootState) =>
  state.auth.isAuthChecking;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUserName = (state: RootState) => state.auth.user?.name;
export const selectUserEmail = (state: RootState) => state.auth.user?.email;
export const selectUserAvatar = (state: RootState) => state.auth.user?.avatar;
export const selectIsEmailVerified = (state: RootState) =>
  state.auth.user?.isEmailVerified;
export const selectUserProvider = (state: RootState) =>
  state.auth.user?.provider;

export const selectForgotPasswordLoading = (state: RootState) =>
  state.auth.forgotPasswordLoading;
export const selectForgotPasswordSent = (state: RootState) =>
  state.auth.forgotPasswordSent;

export const selectResetPasswordLoading = (state: RootState) =>
  state.auth.resetPasswordLoading;
export const selectResetPasswordSuccess = (state: RootState) =>
  state.auth.resetPasswordSuccess;

export const selectVerifyEmailLoading = (state: RootState) =>
  state.auth.verifyEmailLoading;
export const selectVerifyEmailSuccess = (state: RootState) =>
  state.auth.verifyEmailSuccess;

export const selectUploadLoading = (state: RootState) =>
  state.auth.uploadLoading;
export const selectProfileLoading = (state: RootState) =>
  state.auth.profileLoading;
