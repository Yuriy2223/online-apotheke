"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Container } from "@/shared/Container";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearError, resetForgotPasswordState } from "@/redux/auth/slice";
import { forgotPassword } from "@/redux/auth/operations";
import { ForgotPasswordData } from "@/types/users";
import { ForgotPasswordSuccess } from "@/components/Forms/ForgotPasswordSuccess";
import { ForgotPasswordForm } from "@/components/Forms/ForgotPasswordForm";
import {
  selectForgotPasswordLoading,
  selectForgotPasswordSent,
  selectAuthError,
} from "@/redux/auth/selectors";

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectForgotPasswordLoading);
  const submitted = useAppSelector(selectForgotPasswordSent);
  const error = useAppSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearError());

    return () => {
      dispatch(resetForgotPasswordState());
    };
  }, [dispatch]);

  const handleFormSubmit = (data: ForgotPasswordData) => {
    dispatch(forgotPassword({ email: data.email }));
  };

  return (
    <Container className="flex">
      <div className="flex flex-col gap-5 w-full desktop:flex-row desktop:py-[190px]">
        <div className="pt-[80px] pb-8 relative tablet:pt-[140px] tablet:pb-12 desktop:flex-1 desktop:pt-0 desktop:pb-0 tablet:flex tablet:items-center tablet:justify-center desktop:flex desktop:items-center desktop:justify-start">
          <div className="relative tablet:w-[614px] desktop:w-auto desktop:max-w-[600px]">
            <h2 className="font-semibold text-[34px] leading-[1.21] text-black-true tablet:text-[54px] tablet:leading-[1.11] desktop:text-[48px] desktop:leading-[1.15]">
              Your medication, delivered. Say goodbye to all
              <span className="text-green-light"> your healthcare </span>
              worries with us.
            </h2>
            <div className="absolute top-[-70px] right-[-2] max-mobile:top-[-78px] max-mobile:right-1 tablet:top-[-110px] tablet:right-3 desktop:top-[-114px] desktop:right-10">
              <div className="relative h-[93px] w-[95px] tablet:h-[175px] tablet:w-[179px]">
                <Image
                  src="/images/auth-pill.webp"
                  alt="pill"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="desktop:flex-1 desktop:flex desktop:items-center desktop:justify-center">
          <div className="w-full max-w-md tablet:max-w-lg tablet:mx-auto desktop:mx-0">
            {submitted ? (
              <ForgotPasswordSuccess />
            ) : (
              <>
                <ForgotPasswordForm
                  onSubmit={handleFormSubmit}
                  loading={isLoading}
                  error={error}
                />
                <div className="text-center my-6">
                  <Link
                    href="/login"
                    className="text-green-light hover:text-green-dark font-semibold text-sm transition-colors"
                  >
                    Return to login?
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
