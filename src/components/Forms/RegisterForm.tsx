"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { registerUser } from "@/redux/auth/operations";
import { RegisterFormData } from "@/types/users";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { registerSchema } from "@/validation/users";
import { selectAuthLoading } from "@/redux/auth/selectors";

// interface RegisterFormProps {
//   onSuccess?: () => void;
// }

export function RegisterForm() {
// { onSuccess }: RegisterFormProps
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const loading = useAppSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await dispatch(registerUser(data));

      if (registerUser.rejected.match(result)) {
        if (result.payload === "Підтвердьте email для завершення реєстрації") {
          toast.info("Перевірте вашу пошту для підтвердження реєстрації");
          reset();
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } else if (registerUser.fulfilled.match(result)) {
        toast.success("Реєстрацію успішно завершено!");
        reset();
        // onSuccess?.();
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Помилка реєстрації. Спробуйте ще раз.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ім&apos;я
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            {...register("name")}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Введіть ваше ім'я"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            {...register("email")}
            type="email"
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@email.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Пароль
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Введіть пароль"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Підтвердіть пароль
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Повторіть пароль"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {loading || isSubmitting ? "Реєстрація..." : "Зареєструватися"}
      </button>
    </form>
  );
}
