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
      toast.error(result.error || "Помилка реєстрації");
      return rejectWithValue(result.error || "Помилка реєстрації");
    }

    if (!result.data.user) {
      toast.success(result.data.message || "Перевірте пошту для підтвердження");
      return rejectWithValue("Підтвердьте email для завершення реєстрації");
    }

    toast.success("Реєстрація успішна!");
    return { user: result.data.user };
  } catch (error) {
    console.error("Register error:", error);
    toast.error("Помилка з'єднання з сервером");
    return rejectWithValue("Помилка з'єднання з сервером");
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
      toast.error(result.error || "Помилка входу");
      return rejectWithValue(result.error || "Помилка входу");
    }

    toast.success(`Вітаємо, ${result.data.user.name}!`);
    return { user: result.data.user };
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Помилка з'єднання з сервером");
    return rejectWithValue("Помилка з'єднання з сервером");
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

      toast.success("Ви вийшли з акаунту");
      return;
    } catch (error) {
      console.warn("Logout error:", error);
      toast.success("Ви вийшли з акаунту");
      return rejectWithValue("Помилка при виході");
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
      toast.error(result.error || "Помилка при надсиланні листа");
      return rejectWithValue(result.error || "Помилка при надсиланні листа");
    }

    toast.success("Лист відправлено на вашу пошту");
    return { message: result.message || "Лист відправлено" };
  } catch (error) {
    console.error("Forgot password error:", error);
    toast.error("Помилка мережі. Спробуйте пізніше.");
    return rejectWithValue("Помилка мережі. Спробуйте пізніше.");
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
      toast.error(result.error || "Помилка при зміні пароля");
      return rejectWithValue(result.error || "Помилка при зміні пароля");
    }

    toast.success("Пароль успішно змінено");
    return { message: result.message || "Пароль змінено" };
  } catch (error) {
    console.error("Reset password error:", error);
    toast.error("Помилка мережі. Спробуйте пізніше.");
    return rejectWithValue("Помилка мережі. Спробуйте пізніше.");
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
      toast.error(result.error || "Помилка верифікації");
      return rejectWithValue(result.error || "Помилка верифікації");
    }

    toast.success("Email успішно підтверджено!");
    return { message: result.message || "Email підтверджено" };
  } catch (error) {
    console.error("Verify email error:", error);
    toast.error("Помилка мережі");
    return rejectWithValue("Помилка мережі");
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
      throw new Error("Помилка при завантаженні зображення");
    }

    const response = await fetch("/api/user/upload-avatar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ avatarUrl: cloudinaryUrl }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || "Помилка при оновленні аватара");
    }

    const avatarUrl = result.data?.avatarUrl;
    if (!avatarUrl) {
      throw new Error("Отримано невалідну відповідь від сервера");
    }

    return avatarUrl;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Невідома помилка";
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
      throw new Error(result.error || "Помилка при видаленні аватара");
    }

    return "";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Невідома помилка";
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
      throw new Error(result.error || "Помилка при оновленні профілю");
    }

    const updatedUser = result.data?.user;
    if (!updatedUser) {
      throw new Error("Отримано невалідну відповідь від сервера");
    }

    return updatedUser;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Невідома помилка";
    return rejectWithValue(message);
  }
});
