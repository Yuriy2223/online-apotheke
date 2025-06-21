import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/users";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  requestPasswordReset,
  resetPassword,
} from "./operations";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const handlePending = (state: AuthState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (
  state: AuthState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload ?? "Something went wrong";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
    clearAuthState(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = action.payload ?? "Session expired";
      })
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          loginUser.pending,
          logoutUser.pending,
          refreshToken.pending,
          requestPasswordReset.pending,
          resetPassword.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          loginUser.rejected,
          logoutUser.rejected,
          refreshToken.rejected,
          requestPasswordReset.rejected,
          resetPassword.rejected
        ),
        handleRejected
      );
  },
});

export const { resetAuthError, clearAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
