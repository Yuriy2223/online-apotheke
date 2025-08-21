"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/Container";
import { useAppSelector } from "@/redux/store";
import { GoogleAuthButton } from "@/components/GoogleAuthButton/GoogleAuthButton";
import { RegisterForm } from "@/components/Forms/RegisterForm";
import { useUrlErrorHandler } from "@/hooks/useUrlErrorHandler";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/redux/auth/selectors";

export default function RegisterPage() {
  const router = useRouter();
  const loading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useUrlErrorHandler();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleGoogleError = (error: string) => {
    toast.error(`Google authorization error: ${error}`);
  };

  return (
    <Container className="flex">
      <div className="flex flex-col gap-7 desktop:flex-row desktop:pt-[198px] desktop:pb-[198px] desktop:gap-[70px]">
        <div className="pt-[80px] relative tablet:pt-[140px] tablet:flex tablet:items-center tablet:justify-center  desktop:flex-1 desktop:pt-0">
          <h2 className="font-semibold text-[28px] leading-[1.21] text-black-true tablet:text-[54px] tablet:leading-[1.11] tablet:w-[614px]">
            Your medication, delivered. Say goodbye to all
            <span className="text-green-light"> your healthcare </span>
            worries with us.
          </h2>
          <div className="absolute top-6 right-7 max-mobile:top-2 max-mobile:right-1 tablet:top-7 tablet:right-15 desktop:top-[-54px] desktop:right-6">
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
          <RegisterForm />
          <p className="text-center text-sm text-gray-dark mt-6">
            Already have an account?
            <Link
              href="/login"
              className="text-green-light hover:text-green-dark font-medium ml-2 transition-colors"
            >
              Login
            </Link>
          </p>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative w-full max-w-[400px]">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-dark" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="text-base px-2 text-gray-dark bg-gray-light">
                  or
                </span>
              </div>
            </div>
            <div className="mt-4 mb-6 w-full max-w-[400px]">
              <GoogleAuthButton
                buttonText="Sign in with Google"
                loadingText="Connecting to Google..."
                disabled={loading}
                onError={handleGoogleError}
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
