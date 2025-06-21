"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { RegisterFormData } from "@/types/users";
import { registerSchema } from "@/validation/users";
import GoogleAuthButton from "@/components/GoogleAuthButton/GoogleAuthButton";

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  googleId: string | null;
  provider: "local" | "google";
}

interface ApiResponse {
  success: boolean;
  data?: {
    message?: string;
    user?: UserResponse;
    accessToken?: string;
    refreshToken?: string;
    isNewUser?: boolean;
  };
  error?: string;
  details?: string[];
}

const RegistrationPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitStatus(null);
    clearErrors();

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.data?.message ||
            "Реєстрація успішна! Перевірте email для підтвердження.",
        });
        reset();

        if (result.data?.accessToken) {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } else {
        if (result.details && Array.isArray(result.details)) {
          result.details.forEach((error: string) => {
            const lowerError = error.toLowerCase();
            if (
              lowerError.includes("name") ||
              lowerError.includes("імʼя") ||
              lowerError.includes("ім'я")
            ) {
              setError("name", { message: error });
            } else if (lowerError.includes("email")) {
              setError("email", { message: error });
            } else if (
              lowerError.includes("phone") ||
              lowerError.includes("телефон")
            ) {
              setError("phone", { message: error });
            } else if (
              lowerError.includes("password") ||
              lowerError.includes("пароль")
            ) {
              if (
                lowerError.includes("confirm") ||
                lowerError.includes("підтвердження")
              ) {
                setError("confirmPassword", { message: error });
              } else {
                setError("password", { message: error });
              }
            } else {
              setSubmitStatus({
                type: "error",
                message: error,
              });
            }
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: result.error || "Сталася помилка при реєстрації",
          });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus({
        type: "error",
        message: "Помилка з'єднання з сервером",
      });
    }
  };

  const handleGoogleError = (error: string) => {
    setSubmitStatus({
      type: "error",
      message: error,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center">
          <div className="text-center text-white px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Ласкаво просимо!</h1>
              <p className="text-xl opacity-90">
                Створіть акаунт для доступу до всіх можливостей
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 opacity-20">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 border-2 border-white rounded-lg animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Реєстрація
                </h2>
                <p className="text-gray-600">
                  Заповніть поля для створення акаунту
                </p>
              </div>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Повне ім&apos;я
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      maxLength={50}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Введіть ваше повне ім'я"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email адреса
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Введіть ваш email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Номер телефону
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+380991234567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password")}
                      maxLength={32}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Введіть пароль (6-32 символи)"
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
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Підтвердіть пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      {...register("confirmPassword")}
                      maxLength={32}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Повторіть пароль"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  } text-white`}
                >
                  {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Вже маєте акаунт?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Увійти
                  </a>
                </p>
              </div>

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
                    buttonText="Зареєструватися через Google"
                    loadingText="Підключення до Google..."
                    disabled={isSubmitting}
                    onError={handleGoogleError}
                    size="md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
/******************************* */

// "use client";

// import React, { useState } from "react";
// import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   Eye,
//   EyeOff,
//   User,
//   Phone,
//   Mail,
//   Lock,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";

// interface FormData {
//   name: string;
//   phone: string;
//   email: string;
//   password: string;
// }

// interface InputFieldProps {
//   label: string;
//   name: keyof FormData;
//   type?: string;
//   placeholder: string;
//   icon: React.ReactNode;
//   register: UseFormRegister<FormData>;
//   errors: FieldErrors<FormData>;
//   touchedFields: Partial<Record<keyof FormData, boolean>>;
//   values: Partial<FormData>;
//   showPassword?: boolean;
//   onTogglePassword?: () => void;
// }

// // Схема валідації Yup
// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .required("Обов'язкове поле")
//     .min(2, "Мінімум 2 символи")
//     .max(50, "Максимум 50 символів")
//     .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s]+$/, "Тільки літери"),

//   phone: yup
//     .string()
//     .required("Обов'язкове поле")
//     .matches(/^\+380\d{9}$/, "Формат: +380XXXXXXXXX"),

//   // email: yup
//   //   .string()
//   //   .required("Обов'язкове поле")
//   //   .email("Некоректний email")
//   //   .max(100, "Максимум 100 символів"),
//   email: yup
//     .string()
//     .required("Обов'язкове поле")
//     .matches(
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//       "Некоректний email"
//     )
//     .max(100, "Максимум 100 символів"),

//   password: yup
//     .string()
//     .required("Обов'язкове поле")
//     .min(8, "Мінімум 8 символів")
//     .max(128, "Максимум 128 символів"),
// });

// // Компонент InputField
// const InputField: React.FC<InputFieldProps> = ({
//   name,
//   type = "text",
//   placeholder,
//   icon,
//   register,
//   errors,
//   touchedFields,
//   values,
//   showPassword,
//   onTogglePassword,
// }) => {
//   const getFieldStatus = (): string => {
//     // Якщо поле не було торкнуто або порожнє - не показуємо статус
//     if (!touchedFields[name] || !values[name] || values[name].trim() === "") {
//       return "";
//     }

//     // Якщо є помилка - показуємо помилку
//     if (errors[name]) {
//       return "error";
//     }

//     // Якщо поле заповнене і немає помилок - показуємо успіх
//     return "success";
//   };

//   return (
//     <div className="relative">
//       <div className="relative">
//         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">
//           {icon}
//         </div>
//         <input
//           {...register(name)}
//           type={type === "password" && showPassword ? "text" : type}
//           className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
//             getFieldStatus() === "error"
//               ? "border-red-300 focus:border-red-500 bg-red-50"
//               : getFieldStatus() === "success"
//               ? "border-green-300 focus:border-green-500 bg-green-50"
//               : "border-gray-200 focus:border-blue-500 bg-gray-50"
//           }`}
//           placeholder={placeholder}
//         />

//         {/* Іконка стану поля або перемикач паролю */}
//         {type === "password" && onTogglePassword ? (
//           <button
//             type="button"
//             onClick={onTogglePassword}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showPassword ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//         ) : (
//           <>
//             {getFieldStatus() === "success" && (
//               <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
//             )}
//             {getFieldStatus() === "error" && (
//               <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
//             )}
//           </>
//         )}
//       </div>

//       {/* Зарезервоване місце для повідомлень про помилки */}
//       <div className="h-5 mt-1">
//         {errors[name] &&
//           touchedFields[name] &&
//           values[name] &&
//           values[name].trim() !== "" && (
//             <p className="text-red-500 text-xs flex items-center">
//               <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
//               {errors[name].message}
//             </p>
//           )}
//       </div>
//     </div>
//   );
// };

// // Компонент Google кнопки
// const GoogleButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({
//   onClick,
//   disabled,
// }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     disabled={disabled}
//     className={`w-full flex items-center justify-center py-3 px-4 border-2 rounded-xl font-medium transition-all duration-200 ${
//       disabled
//         ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
//         : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100"
//     }`}
//   >
//     <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//       <path
//         fill="#4285F4"
//         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//       />
//       <path
//         fill="#34A853"
//         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//       />
//       <path
//         fill="#FBBC05"
//         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//       />
//       <path
//         fill="#EA4335"
//         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//       />
//     </svg>
//     Продовжити з Google
//   </button>
// );

// // Основний компонент
// export default function ModernRegistrationForm() {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, touchedFields },
//     watch,
//     reset,
//   } = useForm<FormData>({
//     resolver: yupResolver(schema),
//     mode: "onChange",
//   });

//   const watchedValues = watch();

//   const onSubmit = async (data: FormData): Promise<void> => {
//     setIsSubmitting(true);
//     try {
//       // Симуляція API запиту
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       console.log("Form data:", data);
//       setSubmitSuccess(true);
//       reset();
//       setTimeout(() => setSubmitSuccess(false), 3000);
//     } catch (error) {
//       console.error("Registration error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleGoogleSignup = async (): Promise<void> => {
//     setIsSubmitting(true);
//     try {
//       // Симуляція Google OAuth
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       console.log("Google signup initiated");
//       setSubmitSuccess(true);
//       setTimeout(() => setSubmitSuccess(false), 3000);
//     } catch (error) {
//       console.error("Google signup error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (submitSuccess) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <CheckCircle className="w-8 h-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Реєстрація успішна!
//           </h2>
//           <p className="text-gray-600">
//             Перевірте свою пошту для підтвердження акаунту
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Створити акаунт
//           </h1>
//           <p className="text-gray-600 mt-2">Заповніть дані для реєстрації</p>
//         </div>

//         <div className="space-y-4">
//           {/* Поля форми */}
//           <InputField
//             label="Повне ім'я"
//             name="name"
//             placeholder="Введіть ваше повне ім'я"
//             icon={<User className="w-5 h-5" />}
//             register={register}
//             errors={errors}
//             touchedFields={touchedFields}
//             values={watchedValues}
//           />

//           <InputField
//             label="Номер телефону"
//             name="phone"
//             type="tel"
//             placeholder="+380XXXXXXXXX"
//             icon={<Phone className="w-5 h-5" />}
//             register={register}
//             errors={errors}
//             touchedFields={touchedFields}
//             values={watchedValues}
//           />

//           <InputField
//             label="Email адреса"
//             name="email"
//             type="email"
//             placeholder="example@email.com"
//             icon={<Mail className="w-5 h-5" />}
//             register={register}
//             errors={errors}
//             touchedFields={touchedFields}
//             values={watchedValues}
//           />

//           <InputField
//             label="Пароль"
//             name="password"
//             type="password"
//             placeholder="Створіть надійний пароль"
//             icon={<Lock className="w-5 h-5" />}
//             register={register}
//             errors={errors}
//             touchedFields={touchedFields}
//             values={watchedValues}
//             showPassword={showPassword}
//             onTogglePassword={() => setShowPassword(!showPassword)}
//           />

//           {/* Кнопка submit */}
//           <button
//             type="button"
//             onClick={handleSubmit(onSubmit)}
//             disabled={!isValid || isSubmitting}
//             className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
//               !isValid || isSubmitting
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
//             }`}
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Реєстрація...
//               </div>
//             ) : (
//               "Створити акаунт"
//             )}
//           </button>

//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">або</span>
//             </div>
//           </div>

//           {/* Google кнопка */}
//           <GoogleButton onClick={handleGoogleSignup} disabled={isSubmitting} />
//         </div>

//         <div className="text-center mt-6">
//           <p className="text-gray-600">
//             Вже маєте акаунт?{" "}
//             <a
//               href="#"
//               className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
//             >
//               Увійти
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
