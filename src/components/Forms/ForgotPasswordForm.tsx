"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, AlertCircle, Loader2 } from "lucide-react";
import { schemaForgotPassword } from "@/validation/users";
import { ForgotPasswordData } from "@/types/users";

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => void;
  loading: boolean;
  error?: string | null;
}

export function ForgotPasswordForm({
  onSubmit,
  loading,
  error,
}: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
  } = useForm<ForgotPasswordData>({
    resolver: yupResolver(schemaForgotPassword),
    mode: "onChange",
  });

  const values = watch();

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Відновлення пароля</h1>
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
            disabled={loading}
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
          disabled={!isValid || loading}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
            !isValid || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Надсилання...
            </>
          ) : (
            "Надіслати лист"
          )}
        </button>
      </form>
    </>
  );
}
