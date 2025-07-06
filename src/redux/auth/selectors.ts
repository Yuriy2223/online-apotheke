// import { RootState } from "../store";

// // Basic selectors
// export const selectLoading = (state: RootState) => state.auth.loading;
// export const selectError = (state: RootState) => state.auth.error;
// export const selectAuth = (state: RootState) => state.auth;
// export const selectUser = (state: RootState) => state.auth.user;
// // export const selectToken = (state: RootState) => state.auth.token;
// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;
// export const selectAuthLoading = (state: RootState) => state.auth.loading;
// export const selectAuthError = (state: RootState) => state.auth.error;

// // // User-specific selectors
// // export const selectUserName = (state: RootState) => state.auth.user?.name;
// // export const selectUserEmail = (state: RootState) => state.auth.user?.email;
// // export const selectIsEmailVerified = (state: RootState) =>
// //   state.auth.user?.isEmailVerified;
// // export const selectUserProvider = (state: RootState) =>
// //   state.auth.user?.provider;

// // Forgot password selectors
// export const selectForgotPasswordLoading = (state: RootState) =>
//   state.auth.forgotPasswordLoading;
// export const selectForgotPasswordSent = (state: RootState) =>
//   state.auth.forgotPasswordSent;

// // Reset password selectors
// export const selectResetPasswordLoading = (state: RootState) =>
//   state.auth.resetPasswordLoading;
// export const selectResetPasswordSuccess = (state: RootState) =>
//   state.auth.resetPasswordSuccess;

// // Verify email selectors
// export const selectVerifyEmailLoading = (state: RootState) =>
//   state.auth.verifyEmailLoading;
// export const selectVerifyEmailSuccess = (state: RootState) =>
//   state.auth.verifyEmailSuccess;

/***************спроба найти помилку ****************** */

import { RootState } from "../store";

// Basic selectors
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// ← ДОДАЙТЕ ЦЕ: Селектор для перевірки статусу авторизації
export const selectIsAuthChecking = (state: RootState) =>
  state.auth.isAuthChecking;

// ← ДОДАЙТЕ ЦЕ: Комбінований селектор для визначення стану авторизації
export const selectAuthState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthChecking: state.auth.isAuthChecking,
  user: state.auth.user,
});

// User-specific selectors
export const selectUserName = (state: RootState) => state.auth.user?.name;
export const selectUserEmail = (state: RootState) => state.auth.user?.email;
export const selectIsEmailVerified = (state: RootState) =>
  state.auth.user?.isEmailVerified;
export const selectUserProvider = (state: RootState) =>
  state.auth.user?.provider;

// Forgot password selectors
export const selectForgotPasswordLoading = (state: RootState) =>
  state.auth.forgotPasswordLoading;
export const selectForgotPasswordSent = (state: RootState) =>
  state.auth.forgotPasswordSent;

// Reset password selectors
export const selectResetPasswordLoading = (state: RootState) =>
  state.auth.resetPasswordLoading;
export const selectResetPasswordSuccess = (state: RootState) =>
  state.auth.resetPasswordSuccess;

// Verify email selectors
export const selectVerifyEmailLoading = (state: RootState) =>
  state.auth.verifyEmailLoading;
export const selectVerifyEmailSuccess = (state: RootState) =>
  state.auth.verifyEmailSuccess;
