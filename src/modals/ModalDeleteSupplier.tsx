"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { deleteDashboardSupplier } from "@/redux/suppliers/operations";
import { toast } from "react-toastify";

interface DeleteSupplierProps {
  supplierId?: string;
  supplierName?: string;
}

export const ModalDeleteSupplier = ({
  supplierId,
  supplierName,
}: DeleteSupplierProps) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const displayMessage = supplierName
    ? `Are you sure you want to delete "${supplierName}"? This action cannot be undone.`
    : `Are you sure you want to delete this supplier? This action cannot be undone.`;

  const handleConfirm = async () => {
    if (!supplierId) {
      dispatch(closeModal());
      return;
    }

    try {
      setIsDeleting(true);
      await dispatch(deleteDashboardSupplier(supplierId)).unwrap();
      toast.success("Supplier deleted successfully!");
      dispatch(closeModal());
    } catch {
      toast.error("Failed to delete supplier. Please try again.");
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
        <div className="flex-shrink-0 w-10 h-10 min-[375px]:w-12 min-[375px]:h-12 min-[768px]:w-14 min-[768px]:h-14 min-[1440px]:w-16 min-[1440px]:h-16 rounded-full flex items-center justify-center bg-red-100">
          <Trash2
            size={20}
            className="min-[375px]:text-[24px] min-[768px]:text-[28px] min-[1440px]:text-[32px] text-red-600"
          />
        </div>
        <div>
          <h2 className="text-lg min-[375px]:text-xl min-[768px]:text-2xl min-[1440px]:text-3xl font-semibold text-gray-900 pr-8 min-[375px]:pr-10 min-[768px]:pr-12 min-[1440px]:pr-16">
            Delete confirmation
          </h2>
        </div>
      </div>

      <div className="text-gray-600 leading-relaxed text-sm min-[375px]:text-base min-[768px]:text-lg">
        <p>{displayMessage}</p>
        <p className="mt-2 min-[375px]:mt-3 min-[768px]:mt-4 text-xs min-[375px]:text-sm min-[768px]:text-base text-red-600 font-medium">
          This action is permanent and cannot be reversed.
        </p>
      </div>

      <div className="flex gap-3 min-[375px]:gap-4 min-[1440px]:gap-5 pt-2 min-[768px]:pt-3 min-[1440px]:pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isDeleting}
          className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isDeleting}
          className="flex-1 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 focus:ring-2 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 min-[375px]:w-4 min-[375px]:h-4 min-[768px]:w-5 min-[768px]:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs min-[375px]:text-sm min-[768px]:text-base">
                Deleting...
              </span>
            </div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};
