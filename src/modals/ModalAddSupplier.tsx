"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { Calendar, ChevronDown } from "lucide-react";

interface SupplierFormData {
  name: string;
  address: string;
  company: string;
  deliveryDate: string;
  amount: number;
  status: string;
}

const supplierSchema = yup.object({
  name: yup
    .string()
    .required("Supplier name is required")
    .min(2, "Name must be at least 2 characters"),
  address: yup.string().required("Address is required"),
  company: yup.string().required("Company is required"),
  deliveryDate: yup.string().required("Delivery date is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0.01, "Amount must be greater than 0"),
  status: yup.string().required("Status is required"),
});

export const ModalAddSupplier = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupplierFormData>({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      name: "",
      address: "",
      company: "",
      deliveryDate: "",
      amount: 0,
      status: "",
    },
  });

  const onSubmit = async (data: SupplierFormData) => {
    try {
      console.log("Add supplier:", data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Supplier added successfully!");
      reset();
      dispatch(closeModal());
    } catch {
      toast.error("Failed to add supplier. Please try again.");
    }
  };

  const handleCancel = () => {
    reset();
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Add a new supplier
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <input
              {...register("name")}
              type="text"
              placeholder="Supplier Info"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              {...register("address")}
              type="text"
              placeholder="Address"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <span className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <input
              {...register("company")}
              type="text"
              placeholder="Company"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.company ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.company && (
              <span className="text-red-500 text-xs mt-1">
                {errors.company.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <input
                {...register("deliveryDate")}
                type="date"
                className={`w-full border rounded-lg px-4 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.deliveryDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              <Calendar
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {errors.deliveryDate && (
              <span className="text-red-500 text-xs mt-1">
                {errors.deliveryDate.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              placeholder="Amount"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <span className="text-red-500 text-xs mt-1">
                {errors.amount.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <select
                {...register("status")}
                className={`appearance-none w-full border rounded-lg px-4 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="delivered">Delivered</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {errors.status && (
              <span className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
