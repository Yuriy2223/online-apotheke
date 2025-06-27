import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LoginFormData, RegisterFormData, User } from "@/types/users";

interface AuthResponse {
  user: User;
}

// --- Register ---
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

// --- Login ---
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

// --- Logout ---
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

// --- Check Auth Status ---
// export const checkAuthStatus = createAsyncThunk<
//   AuthResponse | null,
//   void,
//   { rejectValue: string }
// >("auth/checkStatus", async () => {
//   try {
//     const response = await fetch("/api/user/me", {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!response.ok) {
//       return null;
//     }

//     const result = await response.json();

//     if (!result.success) {
//       return null;
//     }

//     return { user: result.data.user };
//   } catch (error) {
//     console.error("Auth check error:", error);
//     return null;
//   }
// });
//   проба 2
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

// --- Forgot Password ---
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

// --- Reset Password ---
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

// // --- Verify Email ---
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
/**************************************************** */

// // --- Check Auth Status ---
// export const checkAuthStatus = createAsyncThunk<
//   AuthResponse | null,
//   void,
//   { rejectValue: string }
// >("auth/checkStatus", async (_, { rejectWithValue }) => {
//   try {
//     const response = await fetch("/api/user/me", {
//       method: "GET",
//       credentials: "include",
//     });

//     // Якщо сервер повертає 401/403 - це нормально, просто немає аутентифікації
//     if (response.status === 401 || response.status === 403) {
//       return null;
//     }

//     if (!response.ok) {
//       console.warn("Auth check failed:", response.status);
//       return null;
//     }

//     const result = await response.json();

//     if (!result.success || !result.data?.user) {
//       return null;
//     }

//     return { user: result.data.user };
//   } catch (error) {
//     console.error("Auth check error:", error);
//     return null;
//   }
// });
