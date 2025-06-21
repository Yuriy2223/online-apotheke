import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils/errorUtils";
import {
  LoginData,
  RegisterData,
  RequestResetData,
  ResetPasswordData,
  User,
} from "@/types/users";
import {
  loginUserApi,
  logoutApi,
  refreshTokenApi,
  registerUserApi,
  requestPasswordResetApi,
  resetPasswordApi,
} from "../../services/authApi";

export const registerUser = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const { user } = await registerUserApi(data);
    return user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Registration failed"));
  }
});

export const loginUser = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const { user } = await loginUserApi(data);
    return user;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Login failed"));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch {
      return rejectWithValue("Logout failed");
    }
  }
);

export const refreshToken = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    await refreshTokenApi();

    return true;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 401) {
      return rejectWithValue("Session expired");
    }

    if (err.response?.status === 403) {
      return rejectWithValue("Invalid or expired refresh token");
    }

    return rejectWithValue("Failed to refresh session");
  }
});

export const requestPasswordReset = createAsyncThunk<
  string,
  RequestResetData,
  { rejectValue: string }
>("auth/requestReset", async (data, { rejectWithValue }) => {
  try {
    const { message } = await requestPasswordResetApi(data);
    return message;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Request failed"));
  }
});

export const resetPassword = createAsyncThunk<
  string,
  ResetPasswordData,
  { rejectValue: string }
>("auth/resetPassword", async (data, { rejectWithValue }) => {
  try {
    const { message } = await resetPasswordApi(data);
    return message;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Reset failed"));
  }
});
