"use client";

import Link from "next/link";

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  const phone = process.env.NEXT_PUBLIC_PHARMACY_PHONE;
  const email = process.env.NEXT_PUBLIC_PHARMACY_EMAIL;
  const phoneHref = phone ? `tel:${phone.replace(/\D/g, "")}` : "#";
  const emailHref = email ? `mailto:${email}` : "#";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div
          className="mx-auto w-24 h-24 bg-gradient-to-br from-green-light to-green-dark 
        rounded-full flex items-center justify-center mb-8 pill-shadow"
        >
          <svg
            className="w-12 h-12 text-white-true"
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
            Something went wrong.
          </h1>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Sorry for the inconvenience. There was a technical error loading the
            page. Our team is already working on fixing it.
          </p>

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
              Try again
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
              To the main page
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          <div className="flex justify-center gap-4 mt-2">
            {phone && (
              <a
                href={phoneHref}
                className="hover:text-green-light transition-colors"
              >
                📞 {phone}
              </a>
            )}
            {email && (
              <a
                href={emailHref}
                className="hover:text-green-light transition-colors"
              >
                ✉️ {email}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
