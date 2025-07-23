"use client";

import { useState } from "react";

interface GoogleAuthUrlResponse {
  success: boolean;
  data?: {
    authUrl: string;
  };
  error?: string;
}

interface GoogleAuthButtonProps {
  buttonText?: string;
  loadingText?: string;
  disabled?: boolean;
  onError?: (error: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function GoogleAuthButton({
  buttonText = "Увійти через Google",
  loadingText = "Підключення до Google...",
  disabled = false,
  onError,
  className = "",
  size = "md",
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/user/google", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }

      const data: GoogleAuthUrlResponse = await response.json();

      if (data.success && data.data?.authUrl) {
        window.location.href = data.data.authUrl;
      } else {
        const errorMessage = data.error || "Помилка отримання посилання Google";
        if (onError) {
          onError(errorMessage);
        } else {
          console.error("Google auth error:", errorMessage);
        }
      }
    } catch (error) {
      const errorMessage = "Помилка з'єднання з сервером Google";
      console.error("Google auth error:", error);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-sm",
    lg: "py-4 px-6 text-base",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const spinnerSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      disabled={disabled || isLoading}
      className={`
        w-full max-w-[400px] flex justify-center items-center rounded-lg shadow-sm font-medium text-white-true bg-green-light hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors
        ${sizeClasses[size]}
        ${className}
      `}
      // className={`
      //   w-full max-w-[400px] flex justify-center items-center border border-gray-dark rounded-lg shadow-sm font-medium text-black-true bg-green-light hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
      //   ${sizeClasses[size]}
      //   ${className}
      // `}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className={`animate-spin -ml-1 mr-3 text-black-true ${spinnerSizes[size]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </div>
      ) : (
        <>
          <svg className={`mr-2 ${iconSizes[size]}`} viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
}
