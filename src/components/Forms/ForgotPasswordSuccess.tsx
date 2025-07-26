"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function ForgotPasswordSuccess() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Лист відправлено
      </h2>
      <p className="text-gray-600 mb-4">
        Ми надіслали посилання на відновлення пароля на вашу електронну пошту.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Перевірте папку &quot;Спам&quot;, якщо лист не прийшов протягом кількох
        хвилин.
      </p>

      <Link
        href="/login"
        className="inline-block mt-6 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
      >
        Повернутися до входу
      </Link>
    </div>
  );
}
