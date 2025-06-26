"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { selectIsAuthenticated } from "@/redux/auth/selectors";

export const UserCartAndIcon = () => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  if (!isLoggedIn) return null;

  return (
    <div className="flex items-center gap-4 relative">
      <Link href="/cart" className="relative">
        <ShoppingCart className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-2 flex items-center justify-center text-[10px] text-white bg-green-dark rounded-full w-4 h-4">
          0
        </span>
      </Link>

      <Link href="/profile">
        <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
          <User className="w-4 h-4 text-white" />
        </div>
      </Link>
    </div>
  );
};
