"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isMobile, onItemClick }) => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/medicine-store", label: "Medicine store" },
    { href: "/medicine", label: "Medicine" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        const baseClass = "rounded-full transition-colors";
        const activeMobile = "text-green-light bg-white";
        const inactiveMobile =
          "text-white border border-white hover:bg-white/20";

        const activeDesktop = "bg-white/20 text-white";
        const inactiveDesktop = "text-white hover:bg-white/20";

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`${
              isMobile
                ? `w-full max-w-xs px-8 py-3 text-center ${baseClass} ${
                    isActive ? activeMobile : inactiveMobile
                  }`
                : `px-6 py-2 ${baseClass} ${
                    isActive ? activeDesktop : inactiveDesktop
                  }`
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
};
