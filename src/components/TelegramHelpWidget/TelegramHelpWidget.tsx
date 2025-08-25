"use client";

import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";

const TG_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
const TG_LINK =
  process.env.NEXT_PUBLIC_TELEGRAM_LINK ||
  (TG_USERNAME ? `https://t.me/${TG_USERNAME}` : "https://t.me");

export default function TelegramHelpWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile && !isExpanded) {
      e.preventDefault();
      setIsExpanded(true);
      setTimeout(() => {
        setIsExpanded(false);
      }, 3000);
    }
  };

  return (
    <a
      href={TG_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Telegram chat"
      onClick={handleClick}
      className="fixed bottom-4 right-4 tablet:bottom-10 tablet:right-5 flex items-center
       gap-2 tablet:gap-3 z-50 group"
    >
      <div
        className={`bg-white border border-slate-200 shadow-lg
        rounded-xl px-3 py-2 tablet:px-4 tablet:py-3 flex flex-col gap-0.5 tablet:gap-1
        max-w-[200px] tablet:max-w-xs group-hover:shadow-xl transition-all duration-300
        ${
          isMobile
            ? isExpanded
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-4 pointer-events-none"
            : "opacity-100 translate-x-0 pointer-events-auto"
        }`}
      >
        <span className="font-semibold text-xs tablet:text-sm text-slate-900 leading-tight">
          Need help?
        </span>
        <span className="text-[10px] tablet:text-xs text-slate-600 leading-tight">
          Message on Telegram
        </span>
      </div>

      <div
        className="w-12 h-12 tablet:w-14 tablet:h-14 rounded-full bg-[#229ED9] text-white
       grid place-items-center shadow-lg group-hover:scale-105 group-hover:shadow-xl
       transition-transform duration-200 relative"
      >
        {isMobile && !isExpanded && (
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full
                         animate-pulse border-2 border-white"
          />
        )}

        <Send className="w-5 h-5 tablet:w-6 tablet:h-6" />
      </div>
    </a>
  );
}
