"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectAuth } from "@/redux/auth/selectors";
import { checkAuthStatus } from "@/redux/auth/operations";
import { Loader } from "@/components/Loader/Loader";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { isAuthChecking } = useAppSelector(selectAuth);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (!hasChecked.current) {
      hasChecked.current = true;
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

  if (isAuthChecking) {
    return <Loader />;
  }

  return <>{children}</>;
};
