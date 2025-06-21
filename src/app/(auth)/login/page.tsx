"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import GoogleAuthButton from "@/components/GoogleAuthButton/GoogleAuthButton";

interface LoginFormData {
  email: string;
  password: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  googleId: string | null;
  provider: "local" | "google";
}

interface ApiResponse {
  success: boolean;
  error?: string;
  details?: string[];
  data?: {
    message: string;
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
    isNewUser?: boolean;
  };
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [apiError, setApiError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setApiError("");
    clearErrors();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        console.log("Login successful:", result.data);
        router.push("/"); /** тимчасово */
      } else {
        if (result.details && result.details.length > 0) {
          result.details.forEach((detail) => {
            if (detail.toLowerCase().includes("email")) {
              setError("email", { message: detail });
            } else if (detail.toLowerCase().includes("password")) {
              setError("password", { message: detail });
            } else {
              setApiError(detail);
            }
          });
        } else if (result.error) {
          setApiError(result.error);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError("Помилка з'єднання з сервером");
    }
  };

  const handleGoogleError = (error: string) => {
    setApiError(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Вхід в акаунт
            </h2>
            <p className="text-gray-600">Введіть свої дані для входу</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email адреса
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email обов'язковий",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Невірний формат email",
                  },
                })}
                className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Пароль
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Пароль обов'язковий",
                  minLength: {
                    value: 6,
                    message: "Пароль має містити мінімум 6 символів",
                  },
                })}
                className={`w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.password ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Введіть пароль"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {apiError}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Входжу...
                </div>
              ) : (
                "Увійти"
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Забули пароль?{" "}
              <Link
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Відновити
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Немає акаунту?{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Зареєструватися
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">або</span>
              </div>
            </div>

            <div className="mt-3">
              <GoogleAuthButton
                buttonText="Увійти через Google"
                loadingText="Підключення до Google..."
                disabled={isSubmitting}
                onError={handleGoogleError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
