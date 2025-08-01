import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/users";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  checkAuthStatus,
  updateProfile,
  removeAvatar,
  uploadAvatar,
} from "./operations";

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
  uploadLoading: boolean;
  profileLoading: boolean;
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
  uploadLoading: false,
  profileLoading: false,
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
      })

      .addCase(uploadAvatar.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.uploadLoading = false;
        if (state.user) {
          state.user.avatar = action.payload;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload as string;
      })

      .addCase(removeAvatar.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(removeAvatar.fulfilled, (state) => {
        state.uploadLoading = false;
        if (state.user) {
          state.user.avatar = "";
        }
      })
      .addCase(removeAvatar.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updateProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload as string;
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
