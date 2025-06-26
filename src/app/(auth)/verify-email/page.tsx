"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearError, resetVerifyEmailState } from "@/redux/auth/slice";
import { verifyEmail } from "@/redux/auth/operations";
import {
  selectAuthError,
  selectVerifyEmailLoading,
  selectVerifyEmailSuccess,
} from "@/redux/auth/selectors";

export default function VerifyEmailPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLoading = useAppSelector(selectVerifyEmailLoading);
  const success = useAppSelector(selectVerifyEmailSuccess);
  const error = useAppSelector(selectAuthError);
  const token = searchParams.get("token");
  const hasInitialized = useRef(false);

  useEffect(() => {
    dispatch(clearError());
    dispatch(resetVerifyEmailState());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      router.push("/register");
      return;
    }

    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    dispatch(verifyEmail({ token }));
  }, [token, dispatch, router]);

  useEffect(() => {
    if (success && !error) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else if (error && !isLoading) {
      setTimeout(() => {
        router.push("/register");
      }, 2000);
    }
  }, [success, error, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Підтвердження Email
          </h1>

          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600 text-lg">Перевіряємо ваш email...</p>

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
