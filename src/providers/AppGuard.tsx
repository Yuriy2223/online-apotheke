"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { Loader } from "@/components/Loader/Loader";
import { selectAuth } from "@/redux/auth/selectors";

interface Props {
  children: React.ReactNode;
}

export const AppGuard = ({ children }: Props) => {
  const router = useRouter();
  const { isAuthenticated, loading, isAuthChecking } =
    useAppSelector(selectAuth);

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
