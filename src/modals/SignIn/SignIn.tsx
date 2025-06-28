// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Eye, EyeOff } from "lucide-react";
// import { useAppDispatch } from "../../redux/store";
// import { toast } from "react-toastify";
// import { closeModal } from "../../redux/modal/slice";
// import { selectModalType } from "../../redux/modal/selectors";
// import { Input } from "../../shared/Input";
// import { singInSchema } from "../../validation/singInSchema";
// import { loginUser } from "../../redux/auth/operations";
// // import { LoginData } from "../../App.type";
// // import { useNavigate } from "react-router-dom";
// import { useRouter } from "next/navigation";
// import {
//   BtnWrap,
//   CancelBtn,
//   LogBtn,
//   ModalForm,
//   ModalMessage,
//   ModalTitle,
//   ModalWrap,
//   PasswordToggleButton,
// } from "./SignIn.styled";
// import { LoginData } from "@/types";

// export const ModalSignIn = () => {
//   const dispatch = useAppDispatch();
//   // const navigate = useNavigate();
//   const router = useRouter();
//   const modalType = useSelector(selectModalType);
//   const { t, i18n } = useTranslation();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showAdminMessage, setShowAdminMessage] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     clearErrors,
//     trigger,
//   } = useForm<LoginData>({
//     resolver: yupResolver(singInSchema(t)),
//   });

//   useEffect(() => {
//     const errorFields = Object.keys(errors) as (keyof LoginData)[];
//     if (errorFields.length > 0) {
//       trigger(errorFields);
//     }
//   }, [i18n.language, errors, trigger]);

//   if (modalType !== "ModalSignIn") return null;

//   const togglePassword = () => setShowPassword((prev) => !prev);

//   const passwordToggleBtn = (
//     <PasswordToggleButton type="button" onClick={togglePassword}>
//       {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//     </PasswordToggleButton>
//   );

//   const onSubmit = async (data: LoginData) => {
//     try {
//       await dispatch(loginUser(data)).unwrap();
//       // toast.success(t("modal.login.message.yes") || "Login successful!");
//       toast.success(t("modal.login.message.yes"));
//       reset();
//       clearErrors();
//       dispatch(closeModal());
//       // navigate("/user");
//       router.push("/user");
//     } catch (error) {
//       toast.error(
//         error instanceof Error ? error.message : t("modal.login.message.no")
//       );
//       setShowAdminMessage(true);
//       setTimeout(() => {
//         setShowAdminMessage(false);
//       }, 3000);
//     }
//   };

//   return (
//     <ModalWrap onSubmit={handleSubmit(onSubmit)}>
//       <ModalTitle>{t("modal.login.title")}</ModalTitle>

//       <ModalForm>
//         <Input
//           {...register("email")}
//           label={t("modal.form.email")}
//           autoComplete="new-email"
//           type="email"
//           onClearError={() => clearErrors("email")}
//           onValidate={() => trigger("email")}
//           error={errors.email?.message}
//         />
//         <Input
//           {...register("password")}
//           label={t("modal.form.password")}
//           autoComplete="new-password"
//           type={showPassword ? "text" : "password"}
//           onClearError={() => clearErrors("password")}
//           onValidate={() => trigger("password")}
//           error={errors.password?.message}
//           button={passwordToggleBtn}
//         />
//         <BtnWrap>
//           <CancelBtn type="button" onClick={() => dispatch(closeModal())}>
//             {t("modal.login.cancel")}
//           </CancelBtn>
//           <LogBtn type="submit">{t("modal.login.login")}</LogBtn>
//         </BtnWrap>
//       </ModalForm>

//       {showAdminMessage && (
//         <ModalMessage
//           initial={{ opacity: 0, transform: "translate(-50%, -150%)" }}
//           animate={{ opacity: 1, transform: "translate(-50%, -50%)" }}
//           exit={{ opacity: 0, transform: "translate(-50%, 50%)" }}
//           transition={{ duration: 0.6 }}
//         >
//           {t("modal.login.message.no")}
//         </ModalMessage>
//       )}
//     </ModalWrap>
//   );
// };
