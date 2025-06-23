"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { clearError, resetVerifyEmailState } from "@/redux/auth/slice";
import { verifyEmail } from "@/redux/auth/operations";
import {
  selectAuthError,
  selectVerifyEmailLoading,
  selectVerifyEmailSuccess,
} from "@/redux/auth/selectors";

export default function VerifyEmailPage() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectVerifyEmailLoading);
  const success = useSelector(selectVerifyEmailSuccess);
  const error = useSelector(selectAuthError);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(resetVerifyEmailState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail({ token }));
    }
  }, [token, dispatch]);

  const getStatus = () => {
    if (!token) return "error";
    if (isLoading) return "loading";
    if (success) return "success";
    if (error) return "error";
    return "loading";
  };

  const getMessage = () => {
    if (!token) return "Токен відсутній";
    if (success) return "Email успішно підтверджено!";
    if (error) return error;
    return "";
  };

  const status = getStatus();
  const message = getMessage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Підтвердження Email
          </h1>

          {status === "loading" && (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <p className="text-gray-600 text-lg">Перевіряємо ваш email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Email підтверджено
              </h2>
              <p className="text-green-600 mb-6 text-lg">{message}</p>
              <Link
                href="/login"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Перейти до входу
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Помилка підтвердження
              </h2>
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {message}
                </p>
              </div>
              <Link
                href="/register"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Спробувати знову
              </Link>
            </>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
            >
              Повернутися до входу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
