"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Loader } from "@/components/Loader/Loader";
import { selectAuth } from "@/redux/auth/selectors";
import { checkAuthStatus } from "@/redux/auth/operations";

interface Props {
  children: React.ReactNode;
}

export const AppGuard = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, isAuthChecking } =
    useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthChecking && !loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthChecking, loading, isAuthenticated, router]);

  if (isAuthChecking || loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
