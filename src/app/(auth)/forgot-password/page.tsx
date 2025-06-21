"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Обов'язкове поле")
    .email("Некоректний email")
    .max(100, "Максимум 100 символів"),
});

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const values = watch();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Помилка при надсиланні листа");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Помилка мережі. Спробуйте пізніше.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        {submitted ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Лист відправлено
            </h2>
            <p className="text-gray-600 mb-4">
              Ми надіслали посилання на відновлення пароля на вашу електронну
              пошту.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Перевірте папку &quot;Спам&quot;, якщо лист не прийшов протягом
              кількох хвилин.
            </p>

            <Link
              href="/login"
              className="inline-block mt-6 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Повернутися до входу
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Відновлення пароля
              </h1>
              <p className="text-gray-600 mt-2 text-sm">
                Введіть email, щоб отримати посилання на відновлення
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
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : touchedFields.email && values.email
                      ? "border-green-300 focus:border-green-500 bg-green-50"
                      : "border-gray-200 focus:border-blue-500 bg-gray-50"
                  }`}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && touchedFields.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                  !isValid || isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Надсилання...
                  </>
                ) : (
                  "Надіслати лист"
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
