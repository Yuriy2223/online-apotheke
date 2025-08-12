"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";

interface DeleteProductProps {
  title?: string;
  message?: string;
  itemName?: string;
  itemType?: string;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export const ModalDeleteProduct = ({
  title = "Delete confirmation",
  message,
  itemName = "",
  itemType = "item",
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDangerous = true,
}: DeleteProductProps) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultMessage = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;

  const displayMessage = message || defaultMessage;

  const handleConfirm = async () => {
    if (!onConfirm) {
      dispatch(closeModal());
      return;
    }

    try {
      setIsDeleting(true);
      await onConfirm();
      toast.success(
        `${
          itemType.charAt(0).toUpperCase() + itemType.slice(1)
        } deleted successfully!`
      );
      dispatch(closeModal());
    } catch {
      toast.error(`Failed to delete ${itemType}. Please try again.`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="flex flex-col gap-4 min-[375px]:gap-5 min-[768px]:gap-6 min-[1440px]:gap-8">
      <div className="flex items-center gap-3 min-[375px]:gap-4 min-[768px]:gap-5">
        <div
          className={`flex-shrink-0 w-10 h-10 min-[375px]:w-12 min-[375px]:h-12 min-[768px]:w-14 min-[768px]:h-14 min-[1440px]:w-16 min-[1440px]:h-16 rounded-full flex items-center justify-center ${
            isDangerous ? "bg-red-100" : "bg-yellow-100"
          }`}
        >
          {isDangerous ? (
            <Trash2
              size={20}
              className="min-[375px]:text-[24px] min-[768px]:text-[28px] min-[1440px]:text-[32px] text-red-600"
            />
          ) : (
            <AlertTriangle
              size={20}
              className="min-[375px]:text-[24px] min-[768px]:text-[28px] min-[1440px]:text-[32px] text-yellow-600"
            />
          )}
        </div>
        <div>
          <h2 className="text-lg min-[375px]:text-xl min-[768px]:text-2xl min-[1440px]:text-3xl font-semibold text-gray-900 pr-8 min-[375px]:pr-10 min-[768px]:pr-12 min-[1440px]:pr-16">
            {title}
          </h2>
        </div>
      </div>

      <div className="text-gray-600 leading-relaxed text-sm min-[375px]:text-base min-[768px]:text-lg">
        <p>{displayMessage}</p>
        {isDangerous && (
          <p className="mt-2 min-[375px]:mt-3 min-[768px]:mt-4 text-xs min-[375px]:text-sm min-[768px]:text-base text-red-600 font-medium">
            This action is permanent and cannot be reversed.
          </p>
        )}
      </div>

      <div className="flex gap-3 min-[375px]:gap-4 min-[1440px]:gap-5 pt-2 min-[768px]:pt-3 min-[1440px]:pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isDeleting}
          className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isDeleting}
          className={`flex-1 rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 focus:ring-2 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg disabled:opacity-50 disabled:cursor-not-allowed ${
            isDangerous
              ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              : "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500"
          }`}
        >
          {isDeleting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 min-[375px]:w-4 min-[375px]:h-4 min-[768px]:w-5 min-[768px]:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs min-[375px]:text-sm min-[768px]:text-base">
                Deleting...
              </span>
            </div>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </div>
  );
};
