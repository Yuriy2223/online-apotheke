"use client";

import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { schemaResetPassword } from "@/validation/users";
import { resetPassword } from "@/redux/auth/operations";
import { ResetPasswordData } from "@/types/users";
import {
  selectAuthError,
  selectResetPasswordLoading,
} from "@/redux/auth/selectors";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isSubmitting = useAppSelector(selectResetPasswordLoading);
  const error = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordData>({
    resolver: yupResolver(schemaResetPassword),
    mode: "onChange",
  });

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

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-bold text-black-true mb-2">
          Create a new password
        </h1>
        <p className="text-gray-600 text-sm">
          Enter a new password for your account.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col tablet:flex-row tablet:flex-wrap tablet:justify-between">
          <div className="flex flex-col gap-1 tablet:w-[300px] w-full">
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
                placeholder="New password"
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
                <p className="text-red-dark text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 tablet:w-[300px] w-full">
            <div className="relative group">
              <Lock
                className={clsx(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
                  errors.confirmPassword
                    ? "text-red-dark"
                    : "text-gray-dark group-focus-within:text-green-light"
                )}
              />
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                className={clsx(
                  "w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent",
                  errors.confirmPassword
                    ? "border-red-dark"
                    : "border-gray-dark"
                )}
                placeholder="Repeat password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-dark hover:text-gray-dark"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="h-6 mt-1">
              {errors.confirmPassword && (
                <p className="text-red-dark text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-2">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full max-w-[400px] bg-green-light text-white-true py-3 px-4 rounded-lg hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? <>Saving...</> : "Save new password"}
          </button>
        </div>
      </form>
    </>
  );
}
