// "use client";

// import { toast } from "react-toastify";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { registerUser } from "@/redux/auth/operations";
// import { RegisterFormData } from "@/types/users";
// import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { registerSchema } from "@/validation/users";
// import { selectAuthLoading } from "@/redux/auth/selectors";

// // interface RegisterFormProps {
// //   onSuccess?: () => void;
// // }

// export function RegisterForm() {
//   // { onSuccess }: RegisterFormProps
//   const dispatch = useAppDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const router = useRouter();
//   const loading = useAppSelector(selectAuthLoading);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<RegisterFormData>({
//     resolver: yupResolver(registerSchema),
//     mode: "onChange",
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     try {
//       const result = await dispatch(registerUser(data));

//       if (registerUser.rejected.match(result)) {
//         if (result.payload === "Підтвердьте email для завершення реєстрації") {
//           toast.info("Перевірте вашу пошту для підтвердження реєстрації");
//           reset();
//           setTimeout(() => {
//             router.push("/login");
//           }, 2000);
//         }
//       } else if (registerUser.fulfilled.match(result)) {
//         toast.success("Реєстрацію успішно завершено!");
//         reset();
//         // onSuccess?.();
//       }
//     } catch {
//       // console.error("Registration error:", error);
//       toast.error("Помилка реєстрації. Спробуйте ще раз.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         {/* <label className="block text-sm font-medium text-gray-700 mb-1">
//           Ім&apos;я
//         </label> */}
//         <div className="relative group">
//           <User
//             className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
//               errors.name
//                 ? "text-red-dark"
//                 : "text-gray-dark group-focus-within:text-green-light"
//             }`}
//           />
//           <input
//             {...register("name")}
//             className={`w-full pl-10 pr-4 py-2 outline-none border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent ${
//               errors.name ? "border-red-dark" : "border-gray-dark"
//             }`}
//             placeholder="Enter full name"
//           />
//         </div>
//         {errors.name && (
//           <p className="text-red-dark text-sm mt-1">{errors.name.message}</p>
//         )}
//       </div>

//       <div>
//         {/* <label className="block text-sm font-medium text-gray-700 mb-1">
//           Email
//         </label> */}
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark w-5 h-5" />
//           <input
//             {...register("email")}
//             type="email"
//             className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent ${
//               errors.email ? "border-red-dark" : "border-gray-dark"
//             }`}
//             placeholder="example@email.com"
//           />
//         </div>
//         {errors.email && (
//           <p className="text-red-dark text-sm mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       <div>
//         {/* <label className="block text-sm font-medium text-gray-700 mb-1">
//           Пароль
//         </label> */}
//         <div className="relative">
//           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark w-5 h-5" />
//           <input
//             {...register("password")}
//             type={showPassword ? "text" : "password"}
//             className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent ${
//               errors.password ? "border-red-dark" : "border-gray-dark"
//             }`}
//             placeholder="Введіть пароль"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showPassword ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//         </div>
//         {errors.password && (
//           <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//         )}
//       </div>

//       <div>
//         {/* <label className="block text-sm font-medium text-gray-700 mb-1">
//           Підтвердіть пароль
//         </label> */}
//         <div className="relative">
//           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark w-5 h-5" />
//           <input
//             {...register("confirmPassword")}
//             type={showConfirmPassword ? "text" : "password"}
//             className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent ${
//               errors.confirmPassword ? "border-red-dark" : "border-gray-dark"
//             }`}
//             placeholder="Повторіть пароль"
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-dark hover:text-gray-dark"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//         </div>
//         {errors.confirmPassword && (
//           <p className="text-red-dark text-sm mt-1">
//             {errors.confirmPassword.message}
//           </p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={loading || isSubmitting}
//         className="w-full bg-green-light text-white-true py-2 px-4 rounded-lg hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
//       >
//         {loading || isSubmitting ? "Реєстрація..." : "Зареєструватися"}
//       </button>
//     </form>
//   );
// }

"use client";

import clsx from "clsx";
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

export function RegisterForm() {
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
      }
    } catch {
      toast.error("Помилка реєстрації. Спробуйте ще раз.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="relative group">
          <User
            className={clsx(
              "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
              errors.name
                ? "text-red-dark"
                : "text-gray-dark group-focus-within:text-green-light"
            )}
          />
          <input
            {...register("name")}
            className={clsx(
              "w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-dark focus:border-transparent",
              errors.name ? "border-red-dark" : "border-green-light"
            )}
            placeholder="Enter full name"
          />
        </div>
        <div className="h-6 mt-1">
          {errors.name && (
            <p className="text-red-dark text-sm">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="relative">
          {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark w-5 h-5" /> */}
          <Mail
            className={clsx(
              "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
              errors.name
                ? "text-red-dark"
                : "text-gray-dark group-focus-within:text-green-light"
            )}
          />
          <input
            {...register("email")}
            type="email"
            className={clsx(
              "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent",
              errors.email ? "border-red-dark" : "border-gray-dark"
            )}
            placeholder="example@email.com"
          />
        </div>
        <div className="h-6 mt-1">
          {errors.email && (
            <p className="text-red-dark text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="relative">
          {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark w-5 h-5" /> */}
          <Lock
            className={clsx(
              "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
              errors.name
                ? "text-red-dark"
                : "text-gray-dark group-focus-within:text-green-light"
            )}
          />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={clsx(
              "w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent",
              errors.password ? "border-red-dark" : "border-gray-dark"
            )}
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
        <div className="h-6 mt-1">
          {errors.password && (
            <p className="text-red-dark text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="relative">
          {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-dark w-5 h-5" /> */}
          <Lock
            className={clsx(
              "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors",
              errors.name
                ? "text-red-dark"
                : "text-gray-dark group-focus-within:text-green-light"
            )}
          />
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className={clsx(
              "w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-light focus:border-transparent",
              errors.confirmPassword ? "border-red-dark" : "border-gray-dark"
            )}
            placeholder="Повторіть пароль"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-dark hover:text-gray-dark"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="h-6 mt-1">
          {errors.confirmPassword && (
            <p className="text-red-dark text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || isSubmitting}
        className="w-full bg-green-light text-white-true py-2 px-4 rounded-lg hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {loading || isSubmitting ? "Реєстрація..." : "Зареєструватися"}
      </button>
    </form>
  );
}
