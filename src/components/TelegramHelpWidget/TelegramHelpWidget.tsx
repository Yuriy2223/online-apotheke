"use client";

import React from "react";

const TG_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
const TG_LINK =
  process.env.NEXT_PUBLIC_TELEGRAM_LINK ||
  (TG_USERNAME ? `https://t.me/${TG_USERNAME}` : "https://t.me");

export default function TelegramHelpWidget() {
  return (
    <a
      href={TG_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Відкрити чат у Telegram"
      className="fixed bottom-5 right-5 flex items-center gap-3 z-50 group"
    >
      <div className="bg-white border border-slate-200 shadow-lg rounded-xl px-4 py-3 flex flex-col gap-1 max-w-xs group-hover:shadow-xl transition">
        <span className="font-semibold text-sm text-slate-900">
          Потрібна допомога?
        </span>
        <span className="text-xs text-slate-600">Написати в Telegram</span>
      </div>

      <div className="w-14 h-14 rounded-full bg-[#229ED9] text-white grid place-items-center shadow-lg group-hover:scale-105 group-hover:shadow-xl transition">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M22 2L11 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M22 2L15.5 22l-4.1-7.9L3.5 10.5 22 2z" />
        </svg>
      </div>
    </a>
  );
}
