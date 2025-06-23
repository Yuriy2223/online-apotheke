import React from "react";
import Link from "next/link";

interface NavBarProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isMobile, onItemClick }) => {
  const navItems = [
    { href: "/", label: "Home", isActive: true },
    { href: "/medicine-store", label: "Medicine store" },
    { href: "/medicine", label: "Medicine" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  if (isMobile) {
    return (
      <>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`w-full max-w-xs px-8 py-3 text-center rounded-full transition-colors ${
              item.isActive
                ? "text-green-light bg-white"
                : "text-white border border-white hover:bg-white/20"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <nav className="hidden tablet:flex items-center space-x-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-6 py-2 text-white rounded-full transition-colors ${
            // className={`w-full max-w-xs px-8 py-3 text-center rounded-full transition-colors ${
            item.isActive ? "bg-white/20" : "hover:bg-white/20"
            // item.isActive
            //   ? "text-green-light bg-white"
            //   : "text-white border border-white hover:bg-white/20"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
