"use client";

import { useForm } from "react-hook-form";
import clsx from "clsx";
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
    formState: { errors, isValid },
  } = useForm<ForgotPasswordData>({
    resolver: yupResolver(schemaForgotPassword),
    mode: "onChange",
  });

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-black-true">
          Відновлення пароля
        </h1>
        <p className="text-gray-dark mt-2 text-sm">
          Введіть email, щоб отримати посилання на відновлення
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-dark text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col tablet:flex-row tablet:flex-wrap tablet:justify-between"
      >
        <div className="flex flex-col gap-1 w-full">
          <div className="relative group w-full">
            <Mail
              className={clsx(
                "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
                errors.email
                  ? "text-red-dark"
                  : "text-gray-dark group-focus-within:text-green-light"
              )}
            />
            <input
              {...register("email")}
              type="email"
              className={clsx(
                "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent",
                errors.email ? "border-red-dark" : "border-gray-dark"
              )}
              placeholder="example@email.com"
            />
          </div>
          <div className="h-6 my-1">
            {errors.email && (
              <p className="text-red-dark text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
            !isValid || loading
              ? "bg-green-soft text-green-light cursor-not-allowed"
              : "bg-green-light text-white-true hover:bg-green-dark shadow-lg hover:shadow-xl"
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
