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
        <h2 className="text-2xl font-bold text-black-true">Лист відправлено</h2>
        <p className="text-gray-dark">
          Ми надіслали посилання на відновлення пароля на вашу електронну пошту.
        </p>
      </div>

      <p className="text-sm text-gray-dark">
        Перевірте папку &quot;Спам&quot;, якщо лист не прийшов протягом кількох
        хвилин.
      </p>

      <Link
        href="/login"
        className="inline-block mt-6 text-green-light hover:text-green-dark font-semibold transition-colors duration-200"
      >
        Повернутися до входу
      </Link>
    </div>
  );
}
