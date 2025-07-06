import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  checkAuthStatus,
} from "./operations";
import { User } from "@/types/users";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isAuthChecking: boolean;
  forgotPasswordLoading: boolean;
  forgotPasswordSent: boolean;
  resetPasswordLoading: boolean;
  resetPasswordSuccess: boolean;
  verifyEmailLoading: boolean;
  verifyEmailSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isAuthChecking: true,
  forgotPasswordLoading: false,
  forgotPasswordSent: false,
  resetPasswordLoading: false,
  resetPasswordSuccess: false,
  verifyEmailLoading: false,
  verifyEmailSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    updateUser: (state, action: { payload: Partial<User> }) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    resetForgotPasswordState: (state) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordSent = false;
    },
    resetResetPasswordState: (state) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = false;
    },
    resetVerifyEmailState: (state) => {
      state.verifyEmailLoading = false;
      state.verifyEmailSuccess = false;
    },
    // ---- httpOnly cookies----
    setAuthFromServer: (
      state,
      action: { payload: { user: User; isAuthenticated: boolean } }
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // // ---- httpOnly cookies----
      // .addCase(checkAuthStatus.fulfilled, (state, action) => {
      //   if (action.payload?.user) {
      //     state.user = action.payload.user;
      //     state.isAuthenticated = true;
      //   } else {
      //     state.user = null;
      //     state.isAuthenticated = false;
      //   }
      // })

      // ---- Auth Status Check ----
      .addCase(checkAuthStatus.pending, (state) => {
        state.isAuthChecking = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthChecking = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isAuthChecking = false;
        state.isAuthenticated = false;
      })
      // --- Register ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Помилка реєстрації";
      })

      // --- Login ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Помилка входу";
      })

      // --- Logout ---
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })

      // --- Forgot Password ---
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.error = null;
        state.forgotPasswordSent = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordSent = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.error = action.payload || "Помилка при надсиланні листа";
      })

      // --- Reset Password ---
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.error = action.payload || "Помилка при зміні пароля";
      })

      // --- Verify Email ---
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailLoading = true;
        state.error = null;
        state.verifyEmailSuccess = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.verifyEmailLoading = false;
        state.verifyEmailSuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyEmailLoading = false;
        state.error = action.payload || "Помилка верифікації";
      });
  },
});

export const {
  clearError,
  setLoading,
  updateUser,
  resetForgotPasswordState,
  resetResetPasswordState,
  resetVerifyEmailState,
  setAuthFromServer,
  clearAuth,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
