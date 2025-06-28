// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { X } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { closeModal } from "../../redux/modal/slice";
// import { useAppDispatch } from "../../redux/store";
// import { ModalSignOut } from "../SignOut/SignOut";
// import { ModalSignUp } from "../SignUp/SignUp";
// import { ModalSignIn } from "../SignIn/SignIn";
// import {
//   selectIsModalOpen,
//   selectModalProps,
//   selectModalType,
// } from "../../redux/modal/selectors";
// import {
//   CloseButton,
//   ModalContent,
//   OverlayModal,
// } from "./UniversalModal.steled";

// export const ModalUniversal = () => {
//   const dispatch = useAppDispatch();
//   const isOpen = useSelector(selectIsModalOpen);
//   const modalType = useSelector(selectModalType);
//   const modalProps = useSelector(selectModalProps);

//   useEffect(() => {
//     if (isOpen) {
//       const scrollbarWidth =
//         window.innerWidth - document.documentElement.clientWidth;
//       document.body.style.overflow = "hidden";
//       document.body.style.paddingRight = `${scrollbarWidth}px`;
//     } else {
//       document.body.style.overflow = "auto";
//       document.body.style.paddingRight = "0px";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//       document.body.style.paddingRight = "0px";
//     };
//   }, [isOpen]);

//   const closeHandler = () => dispatch(closeModal());

//   const renderModalContent = () => {
//     switch (modalType) {
//       case "ModalSignUp":
//         return <ModalSignUp {...modalProps} />;
//       case "ModalSignIn":
//         return <ModalSignIn {...modalProps} />;
//       case "ModalSignOut":
//         return <ModalSignOut {...modalProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {isOpen && (
//         <OverlayModal
//           as={motion.div}
//           key="overlay"
//           onClick={closeHandler}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         >
//           <ModalContent
//             as={motion.div}
//             key="modal"
//             onClick={(e) => e.stopPropagation()}
//             initial={{ scale: 0.1, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.1, opacity: 0 }}
//             transition={{
//               duration: 0.6,
//               ease: "easeInOut",
//             }}
//           >
//             <CloseButton onClick={closeHandler}>
//               <X size={36} />
//             </CloseButton>
//             {renderModalContent()}
//           </ModalContent>
//         </OverlayModal>
//       )}
//     </AnimatePresence>
//   );
// };
