"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { ModalAddProduct } from "./ModalAddProduct";
import { ModalEditProduct } from "./ModalEditProduct";
import { ModalAddSupplier } from "./ModalAddSupplier";
import { ModalEditSupplier } from "./ModalEditSupplier";
import { ModalDeleteProduct } from "./ModalDeleteProduct";
import {
  selectIsModalOpen,
  selectModalProps,
  selectModalType,
} from "../redux/modal/selectors";

export const ModalUniversal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectIsModalOpen);
  const modalType = useSelector(selectModalType);
  const modalProps = useSelector(selectModalProps);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const closeHandler = () => dispatch(closeModal());

  const renderModalContent = () => {
    switch (modalType) {
      case "ModalAddProduct":
        return <ModalAddProduct {...modalProps} />;
      case "ModalEditProduct":
        return <ModalEditProduct {...modalProps} />;
      case "ModalDeleteProduct":
        return <ModalDeleteProduct {...modalProps} />;
      case "ModalAddSupplier":
        return <ModalAddSupplier {...modalProps} />;
      case "ModalEditSupplier":
        return <ModalEditSupplier {...modalProps} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={closeHandler}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative min-w-[300px] max-w-[360px] tablet:min-w-[600px] tablet:max-w-[600px] bg-white-true rounded-xl max-tablet:p-5 tablet:p-8 shadow-2xl z-10"
      >
        <button
          onClick={closeHandler}
          className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center bg-transparent rounded-full transition-colors duration-200 text-black-true hover:text-green-light"
          aria-label="Close"
        >
          <X size={32} />
        </button>

        <div className="relative z-20">{renderModalContent()}</div>
      </div>
    </div>
  );
};
