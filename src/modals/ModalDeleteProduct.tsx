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
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex items-center gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            isDangerous ? "bg-red-100" : "bg-yellow-100"
          }`}
        >
          {isDangerous ? (
            <Trash2 size={24} className="text-red-600" />
          ) : (
            <AlertTriangle size={24} className="text-yellow-600" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
      </div>

      <div className="text-gray-600 leading-relaxed">
        <p>{displayMessage}</p>
        {isDangerous && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            This action is permanent and cannot be reversed.
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isDeleting}
          className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2.5 px-4 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isDeleting}
          className={`flex-1 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
            isDangerous
              ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              : "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500"
          }`}
        >
          {isDeleting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Deleting...
            </div>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </div>
  );
};
