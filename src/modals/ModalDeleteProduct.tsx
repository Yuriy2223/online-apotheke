"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { deleteDashboardProduct } from "@/redux/dashboard-product/operations";

interface DeleteProductProps {
  productId?: string;
  productName?: string;
}

export const ModalDeleteProduct = ({
  productId,
  productName,
}: DeleteProductProps) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!productId) {
      dispatch(closeModal());
      return;
    }

    try {
      setIsDeleting(true);
      await dispatch(deleteDashboardProduct(productId)).unwrap();
      dispatch(closeModal());
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-red-light">
          <Trash2 size={24} className="text-red-dark" />
        </div>
        <h2 className="text-xl font-semibold text-black-true">
          Delete Product
        </h2>
      </div>
      <div className="text-gray-dark leading-relaxed">
        {productName ? (
          <p>
            Are you sure you want to delete
            <span className="text-red-dark font-semibold">
              &quot;{productName}&quot;
            </span>
            ? This action cannot be undone.
          </p>
        ) : (
          <p>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
        )}
        <p className="mt-3 text-sm text-red-dark font-medium">
          This action is permanent and cannot be reversed.
        </p>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isDeleting}
          className="flex-1 bg-gray-soft text-black-true rounded-lg
           py-2 px-4 hover:bg-gray-dark hover:text-white-true 
           focus:ring-2 focus:ring-gray-dark focus:ring-offset-2
            transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isDeleting}
          className="flex-1 bg-red-dark text-white-true hover:bg-red-700
           focus:ring-red-dark rounded-lg py-2 px-4 focus:ring-2 focus:ring-offset-2
            transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Deleting...</span>
            </div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};
