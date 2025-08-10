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
    { href: "/pharmacies", label: "Pharmacies" },
    { href: "/medicine", label: "Medicine" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      {navItems.map((item) => {
        // const isActive = pathname === item.href;
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        const baseClass = "relative transition-colors duration-300";
        const activeMobile = "text-green-light bg-white-true";
        const inactiveMobile =
          "text-white-true border border-white-true hover:bg-white-true/20";

        const desktopText = "text-white-true mx-6";

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`${
              isMobile
                ? `w-full max-w-xs px-8 py-3 text-center rounded-full ${baseClass} ${
                    isActive ? activeMobile : inactiveMobile
                  }`
                : `${desktopText} ${baseClass} group`
            }`}
          >
            <span
              className={`relative z-10 ${
                !isMobile && isActive ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </span>
            {!isMobile && (
              <span
                className={`
                  absolute left-0 bottom-[-12px] h-[3px] w-full bg-white-true
                  scale-x-0 origin-right
                  transition-transform duration-400 ease-out
                  hover:scale-x-100 hover:origin-left
                  group-hover:scale-x-100 group-hover:origin-left
                  ${isActive ? "scale-x-100 origin-left" : ""}
                `}
              />
            )}
          </Link>
        );
      })}
    </>
  );
};
