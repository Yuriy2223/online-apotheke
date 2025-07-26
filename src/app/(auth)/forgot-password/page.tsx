"use client";

import Link from "next/link";
import { useEffect } from "react";
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
import Image from "next/image";
import { Container } from "@/shared/Container";

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
      <div className="flex flex-col gap-7 desktop:flex-row desktop:pt-[198px] desktop:pb-[198px] desktop:gap-[70px]">
        <div className="pt-[80px] relative tablet:pt-[140px] tablet:flex tablet:items-center tablet:justify-center desktop:flex-1 desktop:pt-0">
          <h2 className="font-semibold text-[28px] leading-[1.21] text-black-true tablet:text-[54px] tablet:leading-[1.11] tablet:w-[614px]">
            Your medication, delivered. Say goodbye to all
            <span className="text-green-light"> your healthcare </span>
            worries with us.
          </h2>
          <div className="absolute top-6 right-7 max-mobile:top-2 max-mobile:right-1 tablet:top-7 tablet:right-5 desktop:top-[-68px] desktop:right-6">
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
        <div className="desktop:flex-1 desktop:shrink-0 tablet:px-10 desktop:px-1">
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
                  Повернутися до входу? Так!
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
