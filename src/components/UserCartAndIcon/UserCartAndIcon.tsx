"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { selectIsAuthenticated } from "@/redux/auth/selectors";
import { selectCartTotalItems } from "@/redux/cart/selectors";

export const UserCartAndIcon = () => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const cartCount = useAppSelector(selectCartTotalItems);

  if (!isLoggedIn) return null;

  return (
    <div className="flex items-center gap-4 relative">
      <Link
        href="/cart"
        aria-label="Go to shopping cart"
        className="relative flex items-center justify-center w-11 h-11 bg-white-true/20 rounded-full"
      >
        <ShoppingCart className="w-6 h-6 text-white-true" />
        {cartCount >= 0 && (
          <span className="absolute -top-1 -right-2 flex items-center justify-center text-[10px] text-white-true bg-green-dark rounded-full h-5 min-w-5 px-1">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>

      <Link
        href="/profile"
        aria-label="Go to profile"
        className="flex items-center justify-center w-11 h-11 bg-white-true/20 rounded-full"
      >
        <User className="w-6 h-6 text-white-true" />
      </Link>
    </div>
  );
};
