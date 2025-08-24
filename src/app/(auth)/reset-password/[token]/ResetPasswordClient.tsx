"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/Container";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearError, resetResetPasswordState } from "@/redux/auth/slice";
import { selectResetPasswordSuccess } from "@/redux/auth/selectors";
import { CheckCircle, AlertCircle } from "lucide-react";
import { ResetPasswordForm } from "@/components/Forms/ResetPasswordForm";

export interface ResetPasswordProps {
  token: string;
}

export default function ResetPasswordClient({ token }: ResetPasswordProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const success = useAppSelector(selectResetPasswordSuccess);

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
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const renderSuccessMessage = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Password changed
      </h2>
      <p className="text-gray-600 mb-6">
        Your password has been changed successfully. You can log in with your
        new password.
      </p>
      <p className="text-sm text-gray-500">Redirecting in 2 seconds...</p>
    </div>
  );

  const renderInvalidTokenMessage = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-red-dark" />
      </div>
      <h2 className="text-2xl font-bold text-black-true mb-4">Invalid link</h2>
      <p className="text-gray-dark mb-6">
        The password reset link is invalid or expired.
      </p>
      <Link
        href="/forgot-password"
        className="inline-block text-green-light hover:text-green-dark font-semibold transition-colors"
      >
        Invite a new letter
      </Link>
    </div>
  );

  return (
    <Container className="flex">
      <div className="flex flex-col gap-7 w-full desktop:flex-row desktop:pt-[100px] desktop:pb-[100px] desktop:gap-[70px]">
        <div className="pt-[80px] pb-8 relative tablet:pt-[140px] tablet:pb-12 desktop:flex-1 desktop:pt-0 desktop:pb-0 tablet:flex tablet:items-center tablet:justify-center desktop:flex desktop:items-center desktop:justify-start">
          <div className="relative tablet:w-[614px] desktop:w-auto desktop:max-w-[600px]">
            <h2 className="font-semibold text-[28px] leading-[1.21] text-black-true tablet:text-[54px] tablet:leading-[1.11] desktop:text-[48px] desktop:leading-[1.15]">
              Secure password reset for your
              <span className="text-green-light"> healthcare </span>
              peace of mind.
            </h2>
            <div className="absolute top-14 right-2 max-mobile:top-[-80px] max-mobile:right-[-6px] tablet:top-24 tablet:right-0 desktop:top-[-50px] desktop:right-[-80px]">
              <div className="relative h-[93px] w-[95px] tablet:h-[120px] tablet:w-[123px]">
                <Image
                  src="/images/auth-pill.webp"
                  alt="pill"
                  fill
                  sizes="(max-width: 767px) 95px, (min-width: 768px) 120px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="desktop:flex-1 desktop:flex desktop:items-center desktop:justify-center">
          <div className="w-full">
            {!token ? (
              renderInvalidTokenMessage()
            ) : success ? (
              renderSuccessMessage()
            ) : (
              <ResetPasswordForm token={token} />
            )}
            <div className="w-full flex items-center justify-center my-6">
              <Link
                href="/login"
                className="text-green-light hover:text-green-dark font-semibold text-sm transition-colors"
              >
                Return to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
