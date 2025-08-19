"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { Calendar, ChevronDown } from "lucide-react";
import { createDashboardSupplier } from "@/redux/suppliers/operations";
import { supplierSchema } from "@/validation/suppliers";
import { SupplierFormData } from "@/types/suppliers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ModalAddSupplier = () => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupplierFormData>({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      name: "",
      address: "",
      company: "",
      date: "",
      amount: undefined,
      status: "Active",
    },
  });

  const onSubmit = async (data: SupplierFormData) => {
    await dispatch(createDashboardSupplier(data)).unwrap();
    reset();
    setSelectedDate(null);
    dispatch(closeModal());
  };

  const handleCancel = () => {
    reset();
    setSelectedDate(null);
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-black-true">
        Add a new supplier
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex flex-col">
            <input
              {...register("name")}
              type="text"
              placeholder="Supplier Info"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
                 focus:ring-green-light
                 focus:border-transparent transition-all ${
                   errors.name ? "border-red-dark" : "border-gray-soft"
                 }`}
            />
            <div className="h-5 mt-1">
              {errors.name && (
                <span className="text-red-dark text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <input
              {...register("address")}
              type="text"
              placeholder="Address"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
                 focus:ring-green-light 
                focus:border-transparent transition-all ${
                  errors.address ? "border-red-dark" : "border-gray-soft"
                }`}
            />
            <div className="h-5 mt-1">
              {errors.address && (
                <span className="text-red-dark text-xs mt-1">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex flex-col">
            <input
              {...register("company")}
              type="text"
              placeholder="Company"
              className={`border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2
                 focus:ring-green-light
                 focus:border-transparent transition-all ${
                   errors.company ? "border-red-dark" : "border-gray-soft"
                 }`}
            />
            <div className="h-5 mt-1">
              {errors.company && (
                <span className="text-red-dark text-xs mt-1">
                  {errors.company.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      setSelectedDate(date);
                      if (date) {
                        const formatted = date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                        field.onChange(formatted);
                      } else {
                        field.onChange("");
                      }
                    }}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="August 1, 2023"
                    customInput={
                      <input
                        className={`w-full border rounded-lg max-tablet:px-9 tablet:px-8 py-2 pr-10 text-sm
                           outline-none focus:ring-2
                           focus:ring-green-light focus:border-transparent transition-all ${
                             errors.date
                               ? "border-red-dark"
                               : "border-gray-soft"
                           }`}
                      />
                    }
                  />
                )}
              />
              <Calendar
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-light pointer-events-none"
              />
            </div>
            <div className="h-5 mt-1">
              {errors.date && (
                <span className="text-red-dark text-xs mt-1">
                  {errors.date.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex flex-col">
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              min="0"
              placeholder="Amount"
              className={`border rounded-lg px-4 py-2 
                text-sm outline-none focus:ring-2
                 focus:ring-green-light focus:border-transparent 
                 transition-all ${
                   errors.amount ? "border-red-dark" : "border-gray-soft"
                 }`}
            />
            <div className="h-5 mt-1">
              {errors.amount && (
                <span className="text-red-dark text-xs mt-1">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <select
                {...register("status")}
                className={`appearance-none w-full border rounded-lg px-4 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-light focus:border-transparent transition-all ${
                  errors.status ? "border-red-dark" : "border-gray-soft"
                }`}
              >
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-light pointer-events-none"
              />
            </div>
            <div className="h-5 mt-1">
              {errors.status && (
                <span className="text-red-dark text-xs mt-1">
                  {errors.status.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-light text-white-true rounded-lg py-2 px-4 hover:bg-green-dark
             focus:ring-2 focus:ring-green-dark focus:ring-offset-2 transition-all font-medium 
             disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gray-soft text-black-true rounded-lg py-2 px-4 hover:bg-gray-dark
             hover:text-white-true focus:ring-2 focus:ring-gray-dark focus:ring-offset-2 transition-all
              font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
