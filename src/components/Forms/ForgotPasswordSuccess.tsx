"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function ForgotPasswordSuccess() {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-soft rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-light" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-black-true">Email sent</h2>
        <p className="text-gray-dark">
          We have sent a password recovery link to your email.
        </p>
      </div>

      <p className="text-sm text-gray-dark">
        Check your &quot;Spam&quot; folder if you don&apos;t receive the email
        within a few minutes.
      </p>

      <Link
        href="/login"
        className="inline-block my-6 text-green-light hover:text-green-dark font-semibold transition-colors duration-200"
      >
        Return to login
      </Link>
    </div>
  );
}
