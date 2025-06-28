import React from "react";
import Link from "next/link";
import { selectIsAuthenticated } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logoutUser } from "@/redux/auth/operations";
import { UserCartAndIcon } from "../UserCartAndIcon/UserCartAndIcon";

interface UserBarProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const UserBar: React.FC<UserBarProps> = ({
  isMobile = false,
  onItemClick,
}) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
    if (onItemClick) onItemClick();
  };

  if (isMobile) {
    if (isLoggedIn) {
      return (
        <div className="w-full space-y-4 px-10">
          <button
            onClick={handleLogout}
            className="block w-full px-8 py-3 text-center text-green-dark bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="w-full space-y-4 px-10">
        <Link
          href="/register"
          onClick={onItemClick}
          // className="block w-full px-8 py-3 text-center text-green-light bg-white rounded-full hover:bg-gray-100 transition-colors"
          className="block w-full px-8 py-3 text-center text-white border border-white rounded-full hover:bg-white/20 transition-colors"
        >
          Register
        </Link>
        <Link
          href="/login"
          onClick={onItemClick}
          className="block w-full px-8 py-3 text-center text-white border border-white rounded-full hover:bg-white/20 transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="hidden tablet:flex items-center space-x-4">
        <UserCartAndIcon />
        <button
          onClick={handleLogout}
          className="px-6 py-2 text-green-dark bg-white border border-white rounded-full hover:bg-gray-100 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="hidden tablet:flex items-center space-x-4">
      <Link
        href="/register"
        // className="px-6 py-2 text-green-light bg-white border border-white rounded-full hover:bg-gray-100 transition-colors"
        className="px-6 py-2 text-white border border-white rounded-full hover:bg-white/20 transition-colors underline"
        // className="px-4 py-2 text-white border border-white rounded-md hover:bg-white/20 transition-colors underline"
      >
        Register
      </Link>
      <Link
        href="/login"
        className="px-6 py-2 text-white border border-white rounded-full hover:bg-white/20 transition-colors underline"
      >
        Login
      </Link>
    </div>
  );
};
