"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LoginFormData } from "@/types/users";
import { loginUser } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/store";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "@/redux/auth/selectors";
import GoogleAuthButton from "@/components/GoogleAuthButton/GoogleAuthButton";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const loading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data));
  };

  const handleGoogleError = (error: string) => {
    console.error("Google Auth Error:", error);
    toast.error(`Помилка Google авторизації: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Вхід</h2>
          <p className="text-gray-600 mt-2">Увійдіть у свій акаунт</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("email", {
                  required: "Email обов'язковий",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Невірний формат email",
                  },
                })}
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("password", { required: "Пароль обов'язковий" })}
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Введіть пароль"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading || isSubmitting ? "Входжу..." : "Увійти"}
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
              disabled={loading || isSubmitting}
              onError={handleGoogleError}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
