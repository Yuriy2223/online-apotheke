"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { selectCartTotalItems } from "@/redux/cart/selectors";
import {
  selectIsAuthenticated,
  selectUserAvatar,
  selectUserName,
} from "@/redux/auth/selectors";

export const UserCartAndIcon = () => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const cartCount = useAppSelector(selectCartTotalItems);
  const userName = useAppSelector(selectUserName);
  const userAvatar = useAppSelector(selectUserAvatar);

  if (!isLoggedIn) return null;

  const getFirstLetter = (name: string | undefined) => {
    if (!name || name.trim() === "") return null;
    return name.charAt(0).toUpperCase();
  };

  //   return (
  //     <div className="flex items-center gap-4 relative">
  //       <Link
  //         href="/cart"
  //         aria-label="Go to shopping cart"
  //         className="relative flex items-center justify-center w-11 h-11 bg-white-true/20 rounded-full"
  //       >
  //         <ShoppingCart className="w-6 h-6 text-white-true" />
  //         {cartCount >= 0 && (
  //           <span className="absolute -top-1 -right-2 flex items-center justify-center text-[10px] text-white-true bg-green-dark rounded-full h-5 min-w-5 px-1">
  //             {cartCount > 99 ? "99+" : cartCount}
  //           </span>
  //         )}
  //       </Link>

  //       <Link
  //         href="/profile"
  //         aria-label="Go to profile"
  //         className="flex items-center justify-center w-11 h-11 bg-white-true/20 rounded-full"
  //       >
  //         {userAvatar ? (
  //           <img
  //             src={userAvatar}
  //             alt="User avatar"
  //             // className="w-full h-full object-cover"
  //             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  //           />
  //         ) : getFirstLetter(userName) ? (
  //           <span className="text-white-true text-lg font-semibold">
  //             {getFirstLetter(userName)}
  //           </span>
  //         ) : (
  //           <User className="w-6 h-6 text-white-true" />
  //         )}
  //       </Link>
  //     </div>
  //   );
  // };

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
        className="relative group"
      >
        <div className="flex items-center justify-center w-11 h-11 bg-white-true/20 rounded-full overflow-hidden border-2 border-white-true/30 backdrop-blur-sm transition-all duration-300 group-hover:border-white-true/60 group-hover:shadow-lg group-hover:scale-105">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="User avatar"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : getFirstLetter(userName) ? (
            <span className="text-white-true text-lg font-semibold transition-transform duration-300 group-hover:scale-110">
              {getFirstLetter(userName)}
            </span>
          ) : (
            <User className="w-6 h-6 text-white-true transition-transform duration-300 group-hover:scale-110" />
          )}
        </div>

        <div className="absolute inset-0 rounded-full bg-white-true/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
      </Link>
    </div>
  );
};
