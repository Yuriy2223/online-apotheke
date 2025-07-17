"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { GoogleAuthButton } from "@/components/GoogleAuthButton/GoogleAuthButton";
import { RegisterForm } from "@/components/Forms/RegisterForm";
import { useUrlErrorHandler } from "@/hooks/useUrlErrorHandler";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/redux/auth/selectors";

export default function RegisterPage() {
  const router = useRouter();
  const loading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useUrlErrorHandler();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Ласкаво просимо!");
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleGoogleError = (error: string) => {
    console.error("Google Auth Error:", error);
    toast.error(`Помилка Google авторизації: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Реєстрація</h2>
          <p className="text-gray-600 mt-2">Створіть новий акаунт</p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-gray-600 mt-6">
          Вже маєте акаунт?
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Увійти
          </Link>
        </p>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">або</span>
            </div>
          </div>

          <div className="mt-3">
            <GoogleAuthButton
              buttonText="Увійти через Google"
              loadingText="Підключення до Google..."
              disabled={loading}
              onError={handleGoogleError}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**************************************** */

// "use client";

// import Link from "next/link";
// import { toast } from "react-toastify";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { registerUser } from "@/redux/auth/operations";
// import { RegisterFormData } from "@/types/users";
// import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
// import GoogleAuthButton from "@/components/GoogleAuthButton/GoogleAuthButton";
// import { useUrlErrorHandler } from "@/hooks/useUrlErrorHandler";
// import {
//   selectIsAuthenticated,
//   selectAuthLoading,
// } from "@/redux/auth/selectors";

// export default function RegisterPage() {
//   const dispatch = useAppDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const router = useRouter();
//   const loading = useAppSelector(selectAuthLoading);
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);

//   useUrlErrorHandler();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//     reset,
//   } = useForm<RegisterFormData>();

//   const password = watch("password");

//   useEffect(() => {
//     if (isAuthenticated) {
//       toast.success("Ласкаво просимо!");
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

//   const onSubmit = async (data: RegisterFormData) => {
//     if (data.password !== data.confirmPassword) {
//       toast.error("Паролі не співпадають");
//       return;
//     }

//     try {
//       const result = await dispatch(registerUser(data));

//       if (registerUser.rejected.match(result)) {
//         if (result.payload === "Підтвердьте email для завершення реєстрації") {
//           reset();
//           setTimeout(() => {
//             router.push("/login");
//           }, 2000);
//         }
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   const handleGoogleError = (error: string) => {
//     console.error("Google Auth Error:", error);
//     toast.error(`Помилка Google авторизації: ${error}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-900">Реєстрація</h2>
//           <p className="text-gray-600 mt-2">Створіть новий акаунт</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Ім&apos;я
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 {...register("name", {
//                   required: "Ім'я обов'язкове",
//                 })}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Введіть ваше ім'я"
//               />
//             </div>
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 {...register("email", {
//                   required: "Email обов'язковий",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Невірний формат email",
//                   },
//                 })}
//                 type="email"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="example@email.com"
//               />
//             </div>
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Телефон
//             </label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 {...register("phone", {
//                   required: "Телефон обов'язковий",
//                 })}
//                 type="tel"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="+380991234567"
//               />
//             </div>
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.phone.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Пароль
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 {...register("password", {
//                   required: "Пароль обов'язковий",
//                   minLength: {
//                     value: 6,
//                     message: "Пароль має бути мінімум 6 символів",
//                   },
//                 })}
//                 type={showPassword ? "text" : "password"}
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Введіть пароль"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Підтвердіть пароль
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 {...register("confirmPassword", {
//                   required: "Підтвердження пароля обов'язкове",
//                   validate: (value) =>
//                     value === password || "Паролі не співпадають",
//                 })}
//                 type={showConfirmPassword ? "text" : "password"}
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Повторіть пароль"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading || isSubmitting}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {loading || isSubmitting ? "Реєстрація..." : "Зареєструватися"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Вже маєте акаунт?{" "}
//           <Link href="/login" className="text-blue-600 hover:text-blue-700">
//             Увійти
//           </Link>
//         </p>

//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">або</span>
//             </div>
//           </div>

//           <div className="mt-3">
//             <GoogleAuthButton
//               buttonText="Увійти через Google"
//               loadingText="Підключення до Google..."
//               disabled={loading || isSubmitting}
//               onError={handleGoogleError}
//               size="md"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
/************************************************** */
