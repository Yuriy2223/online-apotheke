"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  ShoppingCart,
  FlaskConical,
  BarChart3,
  Users,
  X,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
  { icon: FlaskConical, label: "Products", href: "/dashboard/products" },
  { icon: BarChart3, label: "Suppliers", href: "/dashboard/suppliers" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-30 inset-0 bg-black/10 backdrop-blur-[2px] desktop:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-24 bg-green-light shadow-lg z-40",
          "flex flex-col items-center py-6 transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "-translate-x-[1000px]": !isOpen,
            "desktop:translate-x-0 desktop:static": true,
          }
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-10 right-6 desktop:hidden p-2 hover:scale-110 hover:rotate-360 rounded-lg transition-transform"
          aria-label="Close sidebar"
        >
          <X size={40} className="text-white-true" />
        </button>

        <nav className="flex flex-col items-center gap-10 mt-24 mb-2 desktop:mt-4">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className="group relative"
                onClick={() => onClose()}
              >
                <div
                  className={clsx(
                    "w-12 h-12 flex items-center justify-center rounded-full transition-all cursor-pointer",
                    active
                      ? "bg-white-true text-green-dark shadow"
                      : "text-white-true hover:bg-white-true hover:text-green-light"
                  )}
                >
                  <Icon size={26} />
                </div>
                <div className="absolute left-[80%] ml-2 px-2 py-1 bg-white-true text-green-dark border text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {label}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
