"use client";

import { useEffect } from "react";
import {
  LayoutGrid,
  ShoppingCart,
  FlaskConical,
  BarChart3,
  Users,
} from "lucide-react";

export function Sidebar({ isOpen = false, onClose = () => {} }) {
  useEffect(() => {
    const handleEscape = (e) => {
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
          className="fixed inset-0 bg-black-true bg-opacity-50 z-40 tablet:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed left-0 top-0 h-full bg-white-true border-r border-gray-light z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        tablet:translate-x-0 tablet:static tablet:z-auto
        w-20 flex flex-col items-center py-6
        shadow-lg tablet:shadow-none
      `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 tablet:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-dark"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mb-8 mt-8 tablet:mt-0">
          <div className="w-10 h-10 bg-green-light rounded-lg flex items-center justify-center shadow-sm">
            <div className="w-6 h-6 bg-white-true rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-green-light rounded-sm"></div>
            </div>
          </div>
        </div>

        <nav className="flex flex-col space-y-2">
          <div className="group relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-light text-white-true shadow-sm">
              <LayoutGrid size={20} />
            </div>

            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-dark text-white-true text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Dashboard
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-dark hover:bg-green-soft hover:text-green-dark transition-all cursor-pointer transform hover:scale-105">
              <ShoppingCart size={20} />
            </div>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-dark text-white-true text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Shopping
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-dark hover:bg-green-soft hover:text-green-dark transition-all cursor-pointer transform hover:scale-105">
              <FlaskConical size={20} />
            </div>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-dark text-white-true text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Laboratory
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-dark hover:bg-green-soft hover:text-green-dark transition-all cursor-pointer transform hover:scale-105">
              <BarChart3 size={20} />
            </div>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-dark text-white-true text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Analytics
            </div>
          </div>

          <div className="group relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-dark hover:bg-green-soft hover:text-green-dark transition-all cursor-pointer transform hover:scale-105">
              <Users size={20} />
            </div>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-dark text-white-true text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Users
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
