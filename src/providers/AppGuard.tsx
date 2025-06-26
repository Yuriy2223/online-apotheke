"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/redux/auth/selectors";
import { Loader } from "@/components/Loader/Loader";

interface Props {
  children: React.ReactNode;
}

export const AppGuard = ({ children }: Props) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
