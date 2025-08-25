"use client";

import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData } from "@/types/users";
import { loginSchema } from "@/validation/users";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading: boolean;
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col tablet:flex-row tablet:flex-wrap tablet:justify-between"
    >
      <div className="flex flex-col gap-1 tablet:max-w-[300px] w-full">
        <div className="relative group tablet:max-w-[300px]">
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
        <div className="h-6 mt-1">
          {errors.email && (
            <p className="text-red-dark text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 tablet:max-w-[300px] w-full">
        <div className="relative group">
          <Lock
            className={clsx(
              "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
              errors.password
                ? "text-red-dark"
                : "text-gray-dark group-focus-within:text-green-light"
            )}
          />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={clsx(
              "w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent",
              errors.password ? "border-red-dark" : "border-gray-dark"
            )}
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="h-6 mt-1">
          {errors.password && (
            <p className="text-red-dark text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mt-2">
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full max-w-[400px] bg-green-light text-white-true py-3 px-4 rounded-lg
           hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading || isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </div>
    </form>
  );
}
