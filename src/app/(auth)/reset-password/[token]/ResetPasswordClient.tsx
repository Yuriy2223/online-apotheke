// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { schemaResetPassword } from "@/validation/users";
// import { clearError, resetResetPasswordState } from "@/redux/auth/slice";
// import { resetPassword } from "@/redux/auth/operations";
// import { ResetPasswordData } from "@/types/users";
// import {
//   selectAuthError,
//   selectResetPasswordLoading,
//   selectResetPasswordSuccess,
// } from "@/redux/auth/selectors";
// import {
//   Lock,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";

// export interface ResetPasswordProps {
//   token: string;
// }

// export default function ResetPasswordClient({ token }: ResetPasswordProps) {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const isSubmitting = useAppSelector(selectResetPasswordLoading);
//   const success = useAppSelector(selectResetPasswordSuccess);
//   const error = useAppSelector(selectAuthError);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, touchedFields, isValid },
//   } = useForm<ResetPasswordData>({
//     resolver: yupResolver(schemaResetPassword),
//     mode: "onChange",
//   });

//   const values = watch();

//   useEffect(() => {
//     dispatch(clearError());

//     return () => {
//       dispatch(resetResetPasswordState());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         router.push("/login");
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [success, router]);

//   const onSubmit = async (data: ResetPasswordData) => {
//     if (!token) {
//       return;
//     }

//     dispatch(
//       resetPassword({
//         token: token,
//         password: data.password,
//       })
//     );
//   };

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
//         <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Недійсне посилання
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Посилання для скидання пароля недійсне або прострочене.
//           </p>
//           <Link
//             href="/forgot-password"
//             className="inline-block text-blue-600 hover:text-blue-700 font-semibold transition-colors"
//           >
//             Запросити новий лист
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
//       <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
//         {success ? (
//           <div className="text-center">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="w-8 h-8 text-green-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Пароль змінено
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Ваш пароль успішно змінено. Можете увійти з новим паролем.
//             </p>
//             <p className="text-sm text-gray-500">
//               Перенаправлення через 2 секунди...
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="text-center mb-6">
//               <h1 className="text-3xl font-bold text-gray-800">
//                 Створіть новий пароль
//               </h1>
//               <p className="text-gray-600 mt-2 text-sm">
//                 Введіть новий пароль для вашого акаунту
//               </p>
//             </div>

//             {error && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
//                 <p className="text-red-600 text-sm flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-2" />
//                   {error}
//                 </p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <Lock className="w-5 h-5" />
//                 </div>
//                 <input
//                   {...register("password")}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Новий пароль"
//                   autoComplete="new-password"
//                   disabled={isSubmitting}
//                   className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     errors.password
//                       ? "border-red-300 focus:border-red-500 bg-red-50"
//                       : touchedFields.password && values.password
//                       ? "border-green-300 focus:border-green-500 bg-green-50"
//                       : "border-gray-200 focus:border-blue-500 bg-gray-50"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   disabled={isSubmitting}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//                 {errors.password && touchedFields.password && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center">
//                     <AlertCircle className="w-3 h-3 mr-1" />
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <Lock className="w-5 h-5" />
//                 </div>
//                 <input
//                   {...register("confirmPassword")}
//                   type="password"
//                   placeholder="Підтвердіть пароль"
//                   autoComplete="new-password"
//                   disabled={isSubmitting}
//                   className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     errors.confirmPassword
//                       ? "border-red-300 focus:border-red-500 bg-red-50"
//                       : touchedFields.confirmPassword && values.confirmPassword
//                       ? "border-green-300 focus:border-green-500 bg-green-50"
//                       : "border-gray-200 focus:border-blue-500 bg-gray-50"
//                   }`}
//                 />
//                 {errors.confirmPassword && touchedFields.confirmPassword && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center">
//                     <AlertCircle className="w-3 h-3 mr-1" />
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={!isValid || isSubmitting}
//                 className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center ${
//                   !isValid || isSubmitting
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Збереження...
//                   </>
//                 ) : (
//                   "Зберегти новий пароль"
//                 )}
//               </button>
//             </form>

//             <div className="text-center mt-6">
//               <Link
//                 href="/login"
//                 className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
//               >
//                 Повернутися до входу
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Container } from "@/shared/Container";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { schemaResetPassword } from "@/validation/users";
// import { clearError, resetResetPasswordState } from "@/redux/auth/slice";
// import { resetPassword } from "@/redux/auth/operations";
// import { ResetPasswordData } from "@/types/users";
// import {
//   selectAuthError,
//   selectResetPasswordLoading,
//   selectResetPasswordSuccess,
// } from "@/redux/auth/selectors";
// import {
//   Lock,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";

// export interface ResetPasswordProps {
//   token: string;
// }

// export default function ResetPasswordClient({ token }: ResetPasswordProps) {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const isSubmitting = useAppSelector(selectResetPasswordLoading);
//   const success = useAppSelector(selectResetPasswordSuccess);
//   const error = useAppSelector(selectAuthError);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, touchedFields, isValid },
//   } = useForm<ResetPasswordData>({
//     resolver: yupResolver(schemaResetPassword),
//     mode: "onChange",
//   });

//   const values = watch();

//   useEffect(() => {
//     dispatch(clearError());

//     return () => {
//       dispatch(resetResetPasswordState());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         router.push("/login");
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [success, router]);

//   const onSubmit = async (data: ResetPasswordData) => {
//     if (!token) {
//       return;
//     }

//     dispatch(
//       resetPassword({
//         token: token,
//         password: data.password,
//       })
//     );
//   };

//   if (!token) {
//     return (
//       <Container className="flex">
//         <div className="flex flex-col gap-7 w-full desktop:flex-row desktop:pt-[100px] desktop:pb-[100px] desktop:gap-[70px]">
//           <div className="pt-[80px] pb-8 relative tablet:pt-[140px] tablet:pb-12 desktop:flex-1 desktop:pt-0 desktop:pb-0 tablet:flex tablet:items-center tablet:justify-center desktop:flex desktop:items-center desktop:justify-start">
//             <div className="relative tablet:w-[614px] desktop:w-auto desktop:max-w-[600px]">
//               <h2 className="font-semibold text-[28px] leading-[1.21] text-black-true tablet:text-[54px] tablet:leading-[1.11] desktop:text-[48px] desktop:leading-[1.15]">
//                 Secure password reset for your
//                 <span className="text-green-light"> healthcare </span>
//                 peace of mind.
//               </h2>
//               <div className="absolute top-14 right-2 max-mobile:top-[-80px] max-mobile:right-[-6px] tablet:top-24 tablet:right-0 desktop:top-[-50px] desktop:right-[-80px]">
//                 <div className="relative h-[93px] w-[95px] tablet:h-[120px] tablet:w-[123px]">
//                   <Image
//                     src="/images/auth-pill.webp"
//                     alt="pill"
//                     fill
//                     className="object-contain"
//                     priority
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="desktop:flex-1 desktop:flex desktop:items-center desktop:justify-center">
//             <div className="w-full max-w-md tablet:max-w-lg tablet:mx-auto desktop:mx-0">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <AlertCircle className="w-8 h-8 text-red-dark" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-black-true mb-4">
//                   Недійсне посилання
//                 </h2>
//                 <p className="text-gray-dark mb-6">
//                   Посилання для скидання пароля недійсне або прострочене.
//                 </p>
//                 <Link
//                   href="/forgot-password"
//                   className="inline-block text-green-light hover:text-green-dark font-semibold transition-colors"
//                 >
//                   Запросити новий лист
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <Container className="flex">
//       <div className="flex flex-col gap-7 w-full desktop:flex-row desktop:pt-[100px] desktop:pb-[100px] desktop:gap-[70px]">
//         <div className="pt-[80px] pb-8 relative tablet:pt-[140px] tablet:pb-12 desktop:flex-1 desktop:pt-0 desktop:pb-0 tablet:flex tablet:items-center tablet:justify-center desktop:flex desktop:items-center desktop:justify-start">
//           <div className="relative tablet:w-[614px] desktop:w-auto desktop:max-w-[600px]">
//             <h2 className="font-semibold text-[28px] leading-[1.21] text-black-true tablet:text-[54px] tablet:leading-[1.11] desktop:text-[48px] desktop:leading-[1.15]">
//               Secure password reset for your
//               <span className="text-green-light"> healthcare </span>
//               peace of mind.
//             </h2>
//             <div className="absolute top-14 right-2 max-mobile:top-[-80px] max-mobile:right-[-6px] tablet:top-24 tablet:right-0 desktop:top-[-50px] desktop:right-[-80px]">
//               <div className="relative h-[93px] w-[95px] tablet:h-[120px] tablet:w-[123px]">
//                 <Image
//                   src="/images/auth-pill.webp"
//                   alt="pill"
//                   fill
//                   className="object-contain"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Правий блок з формою */}
//         <div className="desktop:flex-1 desktop:flex desktop:items-center desktop:justify-center">
//           <div className="w-full max-w-md tablet:max-w-lg tablet:mx-auto desktop:mx-0">
//             {success ? (
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <CheckCircle className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                   Пароль змінено
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   Ваш пароль успішно змінено. Можете увійти з новим паролем.
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Перенаправлення через 2 секунди...
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="text-center mb-8">
//                   <h1 className="text-[32px] font-bold text-black-true mb-2">
//                     Створити новий пароль
//                   </h1>
//                   <p className="text-gray-600 text-sm">
//                     Введіть новий пароль для вашого акаунту
//                   </p>
//                 </div>

//                 {error && (
//                   <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                     <p className="text-red-600 text-sm flex items-center">
//                       <AlertCircle className="w-4 h-4 mr-2" />
//                       {error}
//                     </p>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                   <div className="relative">
//                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                       <Lock className="w-5 h-5" />
//                     </div>
//                     <input
//                       {...register("password")}
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Новий пароль"
//                       autoComplete="new-password"
//                       disabled={isSubmitting}
//                       className={`w-full pl-12 pr-12 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                         errors.password
//                           ? "border-red-300 focus:border-red-500 bg-red-50"
//                           : touchedFields.password && values.password
//                           ? "border-green-300 focus:border-green-500 bg-green-50"
//                           : "border-gray-200 focus:border-green-light bg-gray-50"
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       disabled={isSubmitting}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-5 h-5" />
//                       ) : (
//                         <Eye className="w-5 h-5" />
//                       )}
//                     </button>
//                     {errors.password && touchedFields.password && (
//                       <p className="text-red-500 text-xs mt-2 flex items-center">
//                         <AlertCircle className="w-3 h-3 mr-1" />
//                         {errors.password.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="relative">
//                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                       <Lock className="w-5 h-5" />
//                     </div>
//                     <input
//                       {...register("confirmPassword")}
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Підтвердіть пароль"
//                       autoComplete="new-password"
//                       disabled={isSubmitting}
//                       className={`w-full pl-12 pr-12 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//                         errors.confirmPassword
//                           ? "border-red-300 focus:border-red-500 bg-red-50"
//                           : touchedFields.confirmPassword &&
//                             values.confirmPassword
//                           ? "border-green-300 focus:border-green-500 bg-green-50"
//                           : "border-gray-200 focus:border-green-light bg-gray-50"
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword((prev) => !prev)}
//                       disabled={isSubmitting}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="w-5 h-5" />
//                       ) : (
//                         <Eye className="w-5 h-5" />
//                       )}
//                     </button>
//                     {errors.confirmPassword &&
//                       touchedFields.confirmPassword && (
//                         <p className="text-red-500 text-xs mt-2 flex items-center">
//                           <AlertCircle className="w-3 h-3 mr-1" />
//                           {errors.confirmPassword.message}
//                         </p>
//                       )}
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={!isValid || isSubmitting}
//                     className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
//                       !isValid || isSubmitting
//                         ? "bg-gray-300 cursor-not-allowed"
//                         : "bg-green-light hover:bg-green-dark shadow-lg hover:shadow-xl"
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Збереження...
//                       </>
//                     ) : (
//                       "Зберегти новий пароль"
//                     )}
//                   </button>
//                 </form>

//                 <div className="text-center mt-6">
//                   <Link
//                     href="/login"
//                     className="text-green-light hover:text-green-dark font-semibold text-sm transition-colors"
//                   >
//                     Повернутися до входу
//                   </Link>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }
/************************************* */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/Container";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearError, resetResetPasswordState } from "@/redux/auth/slice";
import { selectResetPasswordSuccess } from "@/redux/auth/selectors";
import { CheckCircle, AlertCircle } from "lucide-react";
import { ResetPasswordForm } from "@/components/Forms/ResetPasswordForm";

export interface ResetPasswordProps {
  token: string;
}

export default function ResetPasswordClient({ token }: ResetPasswordProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const success = useAppSelector(selectResetPasswordSuccess);

  useEffect(() => {
    dispatch(clearError());

    return () => {
      dispatch(resetResetPasswordState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const renderSuccessMessage = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Пароль змінено</h2>
      <p className="text-gray-600 mb-6">
        Ваш пароль успішно змінено. Можете увійти з новим паролем.
      </p>
      <p className="text-sm text-gray-500">
        Перенаправлення через 2 секунди...
      </p>
    </div>
  );

  const renderInvalidTokenMessage = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-red-dark" />
      </div>
      <h2 className="text-2xl font-bold text-black-true mb-4">
        Недійсне посилання
      </h2>
      <p className="text-gray-dark mb-6">
        Посилання для скидання пароля недійсне або прострочене.
      </p>
      <Link
        href="/forgot-password"
        className="inline-block text-green-light hover:text-green-dark font-semibold transition-colors"
      >
        Запросити новий лист
      </Link>
    </div>
  );

  return (
    <Container className="flex">
      <div className="flex flex-col gap-7 w-full desktop:flex-row desktop:pt-[100px] desktop:pb-[100px] desktop:gap-[70px]">
        <div className="pt-[80px] pb-8 relative tablet:pt-[140px] tablet:pb-12 desktop:flex-1 desktop:pt-0 desktop:pb-0 tablet:flex tablet:items-center tablet:justify-center desktop:flex desktop:items-center desktop:justify-start">
          <div className="relative tablet:w-[614px] desktop:w-auto desktop:max-w-[600px]">
            <h2 className="font-semibold text-[28px] leading-[1.21] text-black-true tablet:text-[54px] tablet:leading-[1.11] desktop:text-[48px] desktop:leading-[1.15]">
              Secure password reset for your
              <span className="text-green-light"> healthcare </span>
              peace of mind.
            </h2>
            <div className="absolute top-14 right-2 max-mobile:top-[-80px] max-mobile:right-[-6px] tablet:top-24 tablet:right-0 desktop:top-[-50px] desktop:right-[-80px]">
              <div className="relative h-[93px] w-[95px] tablet:h-[120px] tablet:w-[123px]">
                <Image
                  src="/images/auth-pill.webp"
                  alt="pill"
                  fill
                  sizes="(max-width: 767px) 95px, (min-width: 768px) 120px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="desktop:flex-1 desktop:flex desktop:items-center desktop:justify-center">
          {/* <div className="w-full max-w-md tablet:max-w-lg tablet:mx-auto desktop:mx-0"> */}
          <div className="w-full">
            {!token ? (
              renderInvalidTokenMessage()
            ) : success ? (
              renderSuccessMessage()
            ) : (
              <ResetPasswordForm token={token} />
            )}
            <div className="w-full flex items-center justify-center my-6">
              <Link
                href="/login"
                className="text-green-light hover:text-green-dark font-semibold text-sm transition-colors"
              >
                Повернутися до входу
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
