"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarFooterProps {
  onItemClick?: () => void;
}

export const NavBarFooter: React.FC<NavBarFooterProps> = ({ onItemClick }) => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pharmacies", label: "Pharmacies" },
    { href: "/medicine", label: "Medicine" },
  ];

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`text-white-true mx-6 relative transition-colors duration-300 group`}
          >
            <span
              className={`relative z-10 ${isActive ? "font-semibold" : ""}`}
            >
              {item.label}
            </span>
            <span
              className={`
                absolute left-0 bottom-[-12px] h-[3px] w-full bg-white-true
                scale-x-0 origin-right
                transition-transform duration-400 ease-out
                group-hover:scale-x-100 group-hover:origin-left
                ${isActive ? "scale-x-100 origin-left" : ""}
              `}
            />
          </Link>
        );
      })}
    </>
  );
};
