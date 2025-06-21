"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-8 pill-shadow">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <div className="pharmacy-card p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Щось пішло не так
          </h1>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Вибачте за незручності. Сталася технічна помилка при завантаженні
            сторінки. Наша команда вже працює над її усуненням.
          </p>

          {process.env.NODE_ENV === "development" && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 mb-2">
                Технічні деталі
              </summary>
              <div className="bg-slate-100 p-3 rounded-lg text-xs text-slate-700 font-mono overflow-x-auto">
                <p>
                  <strong>Помилка:</strong> {error.message}
                </p>
                {error.digest && (
                  <p>
                    <strong>ID:</strong> {error.digest}
                  </p>
                )}
              </div>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Спробувати знову
            </button>

            <Link
              href="/"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              На головну
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="tel:+380123456789"
              className="hover:text-green-600 transition-colors"
            >
              📞 +38 (012) 345-67-89
            </a>
            <a
              href="mailto:support@e-pharmacy.com"
              className="hover:text-green-600 transition-colors"
            >
              ✉️ support@e-pharmacy.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
