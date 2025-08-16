import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/modal/slice";
import { Calendar, ChevronDown } from "lucide-react";
import { updateDashboardSupplier } from "@/redux/suppliers/operations";

interface SupplierFormData {
  name: string;
  address: string;
  company: string;
  date: string;
  amount: number;
  status: string;
}

interface EditSupplierProps {
  supplier?: {
    _id: string;
    name: string;
    address: string;
    company: string;
    date: string;
    amount: number;
    status: string;
  };
}

const supplierSchema = yup.object({
  name: yup
    .string()
    .required("Supplier name is required")
    .min(2, "Name must be at least 2 characters"),
  address: yup.string().required("Address is required"),
  company: yup.string().required("Company is required"),
  date: yup.string().required("Delivery date is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0.01, "Amount must be greater than 0"),
  status: yup.string().required("Status is required"),
});

export const ModalEditSupplier = ({ supplier }: EditSupplierProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupplierFormData>({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      name: supplier?.name || "",
      address: supplier?.address || "",
      company: supplier?.company || "",
      date: supplier?.date || "",
      amount: supplier?.amount || 0,
      status: supplier?.status || "",
    },
  });

  const onSubmit = async (data: SupplierFormData) => {
    try {
      if (supplier?._id) {
        await dispatch(
          updateDashboardSupplier({
            id: supplier._id,
            data: data,
          })
        ).unwrap();

        toast.success("Supplier updated successfully!");
      }
      dispatch(closeModal());
    } catch {
      toast.error("Failed to update supplier. Please try again.");
    }
  };

  const handleCancel = () => {
    reset();
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col gap-4 min-[375px]:gap-5 min-[768px]:gap-6 min-[1440px]:gap-8">
      <h2 className="text-lg min-[375px]:text-xl min-[768px]:text-2xl min-[1440px]:text-3xl font-semibold text-gray-800 pr-8 min-[375px]:pr-10 min-[768px]:pr-12 min-[1440px]:pr-16">
        Edit supplier
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 min-[375px]:gap-4 min-[768px]:gap-5 min-[1440px]:gap-6"
      >
        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-3 min-[375px]:gap-4 min-[1440px]:gap-5">
          <div className="flex flex-col">
            <input
              {...register("name")}
              placeholder="Suppliers info"
              className={`border rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
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
              placeholder="Address"
              className={`border rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
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

        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-3 min-[375px]:gap-4 min-[1440px]:gap-5">
          <div className="flex flex-col">
            <input
              {...register("company")}
              placeholder="Company"
              className={`border rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
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
                {...register("date")}
                type="date"
                className={`w-full border rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 pr-10 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              <Calendar
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {errors.date && (
              <span className="text-red-500 text-xs mt-1">
                {errors.date.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-3 min-[375px]:gap-4 min-[1440px]:gap-5">
          <div className="flex flex-col">
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              min="0"
              placeholder="Amount"
              className={`border rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
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
                className={`appearance-none w-full border rounded-lg px-3 py-2 min-[375px]:px-4 min-[375px]:py-2.5 min-[768px]:px-4 min-[768px]:py-3 min-[1440px]:px-5 min-[1440px]:py-3.5 pr-10 text-sm min-[768px]:text-base min-[1440px]:text-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
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

        <div className="flex gap-3 min-[375px]:gap-4 min-[1440px]:gap-5 pt-2 min-[768px]:pt-3 min-[1440px]:pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-500 text-white rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 min-[375px]:py-2.5 min-[768px]:py-3 min-[1440px]:py-3.5 px-4 min-[1440px]:px-6 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium text-sm min-[768px]:text-base min-[1440px]:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
