// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Eye, EyeOff } from "lucide-react";
// import { useAppDispatch } from "../../redux/store";
// import { toast } from "react-toastify";
// import { closeModal } from "../../redux/modal/slice";
// import { selectModalType } from "../../redux/modal/selectors";
// import { registerUser } from "../../redux/auth/operations";
// import { signUpSchema } from "../../validation/signUpSchema";
// import { Input } from "../../shared/Input";
// import {
//   BtnWrap,
//   CancelBtn,
//   LogBtn,
//   ModalForm,
//   ModalTitle,
//   ModalWrap,
//   PasswordToggleButton,
// } from "./SignUp.styled";

// export interface SignUpData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword?: string;
// }

// export const ModalSignUp = () => {
//   const dispatch = useAppDispatch();
//   const modalType = useSelector(selectModalType);
//   const { t } = useTranslation();

//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     clearErrors,
//     trigger,
//   } = useForm<SignUpData>({
//     resolver: yupResolver(signUpSchema(t)),
//   });

//   if (modalType !== "ModalSignUp") return null;

//   const togglePassword = () => setShowPassword((prev) => !prev);

//   const passwordToggleBtn = (
//     <PasswordToggleButton type="button" onClick={togglePassword}>
//       {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//     </PasswordToggleButton>
//   );

//   const onSubmit = async (data: SignUpData) => {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { confirmPassword, ...payload } = data;

//     try {
//       await dispatch(registerUser(payload)).unwrap();
//       toast.success(t("modal.register.message.success"));
//       reset();
//       clearErrors();
//       dispatch(closeModal());
//     } catch (error) {
//       toast.error(
//         error instanceof Error
//           ? error.message
//           : t("modal.register.message.error")
//       );
//     }
//   };

//   return (
//     <ModalWrap onSubmit={handleSubmit(onSubmit)}>
//       <ModalTitle>{t("modal.register.title")}</ModalTitle>

//       <ModalForm>
//         <Input
//           {...register("name")}
//           label={t("modal.form.name")}
//           autoComplete="name"
//           type="text"
//           width="100%"
//           onClearError={() => clearErrors("name")}
//           onValidate={() => trigger("name")}
//           error={errors.name?.message}
//         />

//         <Input
//           {...register("email")}
//           label={t("modal.form.email")}
//           autoComplete="email"
//           type="email"
//           width="100%"
//           onClearError={() => clearErrors("email")}
//           onValidate={() => trigger("email")}
//           error={errors.email?.message}
//         />

//         <Input
//           {...register("password")}
//           label={t("modal.form.password")}
//           autoComplete="new-password"
//           type={showPassword ? "text" : "password"}
//           width="100%"
//           onClearError={() => clearErrors("password")}
//           onValidate={() => trigger("password")}
//           error={errors.password?.message}
//           button={passwordToggleBtn}
//         />

//         <Input
//           {...register("confirmPassword")}
//           label={t("modal.form.confirm_password")}
//           autoComplete="new-password"
//           type={showPassword ? "text" : "password"}
//           width="100%"
//           onClearError={() => clearErrors("confirmPassword")}
//           onValidate={() => trigger("confirmPassword")}
//           error={errors.confirmPassword?.message}
//           button={passwordToggleBtn}
//         />

//         <BtnWrap>
//           <CancelBtn type="button" onClick={() => dispatch(closeModal())}>
//             {t("modal.register.cancel")}
//           </CancelBtn>
//           <LogBtn type="submit">{t("modal.register.register")}</LogBtn>
//         </BtnWrap>
//       </ModalForm>
//     </ModalWrap>
//   );
// };
