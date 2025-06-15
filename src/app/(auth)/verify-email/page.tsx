"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Токен відсутній");
      return;
    }

    fetch("/api/user/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setMessage("Email успішно підтверджено!");
        } else {
          setStatus("error");
          setMessage(data.error || "Помилка верифікації");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Помилка мережі");
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Підтвердження Email
        </h1>

        {status === "loading" && (
          <p className="text-center">Перевіряємо ваш email...</p>
        )}

        {status === "success" && (
          <div className="text-center">
            <p className="text-green-600 mb-4">{message}</p>
            <a
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Перейти до входу
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <p className="text-red-600 mb-4">{message}</p>
            <a
              href="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Спробувати знову
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
