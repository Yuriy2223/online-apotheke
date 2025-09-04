import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { uploadImage } from "@/utils/cloudinary-client";
import {
  LoginFormData,
  ProfileFormData,
  RegisterFormData,
  User,
} from "@/types/users";

interface AuthResponse {
  user: User;
}

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterFormData,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      toast.error(result.error || "Registration error");
      return rejectWithValue(result.error || "Registration error");
    }

    if (!result.data.user) {
      toast.success(result.data.message || "Check your email for confirmation");
      return rejectWithValue("Confirm email to complete registration");
    }

    toast.success("Registration successful!");
    return { user: result.data.user };
  } catch {
    toast.error("Server connection error");
    return rejectWithValue("Server connection error");
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginFormData,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      toast.error(result.error || "Login error");
      return rejectWithValue(result.error || "Login error");
    }

    toast.success(`Welcome, ${result.data.user.name}!`);
    return { user: result.data.user };
  } catch {
    toast.error("Server connection error");
    return rejectWithValue("Server connection error");
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        console.warn("Server logout failed");
      }

      toast.success("You have logged out");
      return;
    } catch {
      toast.success("You have logged out");
      return rejectWithValue("Error during logout");
    }
  }
);

export const checkAuthStatus = createAsyncThunk<
  AuthResponse | null,
  void,
  { rejectValue: string }
>("auth/checkStatus", async () => {
  try {
    const response = await fetch("/api/user/me", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (!result.success || !result.data?.user) {
      return null;
    }

    return { user: result.data.user };
  } catch {
    return null;
  }
});

export const forgotPassword = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: string }
>("auth/forgotPassword", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/user/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      toast.error(result.error || "Error sending email");
      return rejectWithValue(result.error || "Error sending email");
    }

    toast.success("Email sent to your address");
    return { message: result.message || "Email sent" };
  } catch {
    toast.error("Network error. Try again later.");
    return rejectWithValue("Network error. Try again later.");
  }
});

export const resetPassword = createAsyncThunk<
  { message: string },
  { token: string; password: string },
  { rejectValue: string }
>("auth/resetPassword", async ({ token, password }, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/user/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      toast.error(result.error || "Error changing password");
      return rejectWithValue(result.error || "Error changing password");
    }

    toast.success("Password successfully changed");
    return { message: result.message || "Password changed" };
  } catch {
    toast.error("Network error. Try again later.");
    return rejectWithValue("Network error. Try again later.");
  }
});

export const verifyEmail = createAsyncThunk<
  { message: string },
  { token: string },
  { rejectValue: string }
>("auth/verifyEmail", async ({ token }, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/user/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      toast.error(result.error || "Verification error");
      return rejectWithValue(result.error || "Verification error");
    }

    toast.success("Email successfully verified!");
    return { message: result.message || "Email verified" };
  } catch {
    toast.error("Network error");
    return rejectWithValue("Network error");
  }
});

export const uploadAvatar = createAsyncThunk<
  string,
  File,
  { rejectValue: string }
>("auth/uploadAvatar", async (file, { rejectWithValue }) => {
  try {
    const cloudinaryUrl = await uploadImage(file);
    if (!cloudinaryUrl) {
      throw new Error("Error uploading image");
    }

    const response = await fetch("/api/user/upload-avatar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ avatarUrl: cloudinaryUrl }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || "Error updating avatar");
    }

    const avatarUrl = result.data?.avatarUrl;
    if (!avatarUrl) {
      throw new Error("Received invalid response from server");
    }

    return avatarUrl;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return rejectWithValue(message);
  }
});

export const removeAvatar = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/removeAvatar", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/user/upload-avatar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ avatarUrl: "" }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || "Error removing avatar");
    }

    return "";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return rejectWithValue(message);
  }
});

export const updateProfile = createAsyncThunk<
  User,
  ProfileFormData,
  { rejectValue: string }
>("auth/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const cleanData = {
      name: data.name.trim(),
      phone: data.phone?.trim() || null,
      address: data.address?.trim() || null,
      avatar: data.avatar?.trim() || null,
    };

    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(cleanData),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || "Error updating profile");
    }

    const updatedUser = result.data?.user;
    if (!updatedUser) {
      throw new Error("Received invalid response from server");
    }

    return updatedUser;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return rejectWithValue(message);
  }
});
