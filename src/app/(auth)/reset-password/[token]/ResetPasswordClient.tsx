"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  selectAuthError,
  selectResetPasswordLoading,
  selectResetPasswordSuccess,
} from "@/redux/auth/selectors";
import { schemaResetPassword } from "@/validation/users";
import { clearError, resetResetPasswordState } from "@/redux/auth/slice";
import { resetPassword } from "@/redux/auth/operations";
import { ResetPasswordData } from "@/types/users";

export interface ResetPasswordProps {
  token: string;
}

export default function ResetPasswordClient({ token }: ResetPasswordProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isSubmitting = useSelector(selectResetPasswordLoading);
  const success = useSelector(selectResetPasswordSuccess);
  const error = useSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<ResetPasswordData>({
    resolver: yupResolver(schemaResetPassword),
    mode: "onChange",
  });

  const values = watch();

  useEffect(() => {
    dispatch(clearError());

    return () => {
      dispatch(resetResetPasswordState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      return;
    }

    dispatch(
      resetPassword({
        token: token,
        password: data.password,
      })
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Недійсне посилання
          </h2>
          <p className="text-gray-600 mb-4">
            Посилання для скидання пароля недійсне або прострочене.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Запросити новий лист
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Пароль змінено
            </h2>
            <p className="text-gray-600 mb-4">
              Ваш пароль успішно змінено. Можете увійти з новим паролем.
            </p>
            <p className="text-sm text-gray-500">
              Перенаправлення через 3 секунди...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Створіть новий пароль
              </h1>
              <p className="text-gray-600 mt-2 text-sm">
                Введіть новий пароль для вашого акаунту
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Новий пароль"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : touchedFields.password && values.password
                      ? "border-green-300 focus:border-green-500 bg-green-50"
                      : "border-gray-200 focus:border-blue-500 bg-gray-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && touchedFields.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Підтвердіть пароль"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : touchedFields.confirmPassword && values.confirmPassword
                      ? "border-green-300 focus:border-green-500 bg-green-50"
                      : "border-gray-200 focus:border-blue-500 bg-gray-50"
                  }`}
                />
                {errors.confirmPassword && touchedFields.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                  !isValid || isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Збереження...
                  </>
                ) : (
                  "Зберегти новий пароль"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
              >
                Повернутися до входу
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
