// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { schemaResetPassword } from "@/validation/users";
// import { resetPassword } from "@/redux/auth/operations";
// import { ResetPasswordData } from "@/types/users";
// import {
//   selectAuthError,
//   selectResetPasswordLoading,
// } from "@/redux/auth/selectors";
// import { Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

// interface ResetPasswordFormProps {
//   token: string;
// }

// export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
//   const dispatch = useAppDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const isSubmitting = useAppSelector(selectResetPasswordLoading);
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

//   return (
//     <>
//       <div className="text-center mb-8">
//         <h1 className="text-[32px] font-bold text-black-true mb-2">
//           Створити новий пароль
//         </h1>
//         <p className="text-gray-600 text-sm">
//           Введіть новий пароль для вашого акаунту
//         </p>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-600 text-sm flex items-center">
//             <AlertCircle className="w-4 h-4 mr-2" />
//             {error}
//           </p>
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="relative">
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//             <Lock className="w-5 h-5" />
//           </div>
//           <input
//             {...register("password")}
//             type={showPassword ? "text" : "password"}
//             placeholder="Новий пароль"
//             autoComplete="new-password"
//             disabled={isSubmitting}
//             className={`w-full pl-12 pr-12 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//               errors.password
//                 ? "border-red-300 focus:border-red-500 bg-red-50"
//                 : touchedFields.password && values.password
//                 ? "border-green-300 focus:border-green-500 bg-green-50"
//                 : "border-gray-200 focus:border-green-light bg-gray-50"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             disabled={isSubmitting}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//           >
//             {showPassword ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//           {errors.password && touchedFields.password && (
//             <p className="text-red-500 text-xs mt-2 flex items-center">
//               <AlertCircle className="w-3 h-3 mr-1" />
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <div className="relative">
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//             <Lock className="w-5 h-5" />
//           </div>
//           <input
//             {...register("confirmPassword")}
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Підтвердіть пароль"
//             autoComplete="new-password"
//             disabled={isSubmitting}
//             className={`w-full pl-12 pr-12 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
//               errors.confirmPassword
//                 ? "border-red-300 focus:border-red-500 bg-red-50"
//                 : touchedFields.confirmPassword && values.confirmPassword
//                 ? "border-green-300 focus:border-green-500 bg-green-50"
//                 : "border-gray-200 focus:border-green-light bg-gray-50"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword((prev) => !prev)}
//             disabled={isSubmitting}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//           {errors.confirmPassword && touchedFields.confirmPassword && (
//             <p className="text-red-500 text-xs mt-2 flex items-center">
//               <AlertCircle className="w-3 h-3 mr-1" />
//               {errors.confirmPassword.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={!isValid || isSubmitting}
//           className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
//             !isValid || isSubmitting
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-green-light hover:bg-green-dark shadow-lg hover:shadow-xl"
//           }`}
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Збереження...
//             </>
//           ) : (
//             "Зберегти новий пароль"
//           )}
//         </button>
//       </form>

//       <div className="text-center mt-6">
//         <Link
//           href="/login"
//           className="text-green-light hover:text-green-dark font-semibold text-sm transition-colors"
//         >
//           Повернутися до входу
//         </Link>
//       </div>
//     </>
//   );
// }
/**************** */

"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { schemaResetPassword } from "@/validation/users";
import { resetPassword } from "@/redux/auth/operations";
import { ResetPasswordData } from "@/types/users";
import {
  selectAuthError,
  selectResetPasswordLoading,
} from "@/redux/auth/selectors";
import { Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isSubmitting = useAppSelector(selectResetPasswordLoading);
  const error = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<ResetPasswordData>({
    resolver: yupResolver(schemaResetPassword),
    mode: "onChange",
  });

  const values = watch();

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      return;
    }

    dispatch(
      resetPassword({
        token: token,
        password: data.password,
      })
    );
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-bold text-black-true mb-2">
          Створити новий пароль
        </h1>
        <p className="text-gray-600 text-sm">
          Введіть новий пароль для вашого акаунту
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock className="w-5 h-5" />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Новий пароль"
            autoComplete="new-password"
            disabled={isSubmitting}
            className={`w-full pl-12 pr-12 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.password
                ? "border-red-500 focus:border-red-500 bg-white"
                : touchedFields.password && values.password
                ? "border-green-500 focus:border-green-500 bg-white"
                : "border-gray-200 focus:border-green-light bg-white"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isSubmitting}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {errors.password && touchedFields.password && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock className="w-5 h-5" />
          </div>
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Підтвердіть пароль"
            autoComplete="new-password"
            disabled={isSubmitting}
            className={`w-full pl-12 pr-12 py-4 border-2 rounded-lg focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.confirmPassword
                ? "border-red-500 focus:border-red-500 bg-white"
                : touchedFields.confirmPassword && values.confirmPassword
                ? "border-green-500 focus:border-green-500 bg-white"
                : "border-gray-200 focus:border-green-light bg-white"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            disabled={isSubmitting}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {errors.confirmPassword && touchedFields.confirmPassword && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
            !isValid || isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-light hover:bg-green-dark shadow-lg hover:shadow-xl"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Збереження...
            </>
          ) : (
            "Зберегти новий пароль"
          )}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          href="/login"
          className="text-green-light hover:text-green-dark font-semibold text-sm transition-colors"
        >
          Повернутися до входу
        </Link>
      </div>
    </>
  );
}
