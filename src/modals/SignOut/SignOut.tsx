// import { useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// // import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../redux/store";
// import { toast } from "react-toastify";
// import { closeModal } from "../../redux/modal/slice";
// import { selectModalType } from "../../redux/modal/selectors";
// import { logoutUser } from "../../redux/auth/operations";
// import {
//   BtnWrap,
//   CancelBtn,
//   LogBtn,
//   ModalTitle,
//   ModalWrap,
// } from "./SignOut.styled";
// import { useRouter } from "next/navigation";

// export const ModalSignOut = () => {
//   const dispatch = useAppDispatch();
//   const modalType = useSelector(selectModalType);
//   const { t } = useTranslation();
//   // const navigate = useNavigate();
//   const router = useRouter();

//   if (modalType !== "ModalSignOut") return null;

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap();
//       toast.success(t("modal.logout.message.success"));
//       dispatch(closeModal());
//       // navigate("/");
//       router.push("/");
//     } catch (error: unknown) {
//       const message =
//         typeof error === "string"
//           ? error
//           : error instanceof Error
//           ? error.message
//           : t("modal.logout.message.error");
//       toast.error(message);
//       dispatch(closeModal());
//     }
//   };

//   return (
//     <ModalWrap>
//       <ModalTitle>{t("modal.logout.title")}</ModalTitle>

//       <BtnWrap>
//         <CancelBtn type="button" onClick={() => dispatch(closeModal())}>
//           {t("modal.logout.cancel")}
//         </CancelBtn>
//         <LogBtn type="button" onClick={handleLogout}>
//           {t("modal.logout.logbtn")}
//         </LogBtn>
//       </BtnWrap>
//     </ModalWrap>
//   );
// };
