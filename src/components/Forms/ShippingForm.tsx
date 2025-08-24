import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ShippingInfo } from "@/types/cart";

interface ShippingFormProps {
  register: UseFormRegister<ShippingInfo>;
  errors: FieldErrors<ShippingInfo>;
}

export const ShippingForm = ({ register, errors }: ShippingFormProps) => {
  return (
    <div className="bg-white-true rounded-lg shadow-sm p-6 mb-6 border border-gray-light">
      <div>
        <h2 className="text-lg font-semibold mb-2">Enter shipping info</h2>
        <p className="text-gray-dark text-sm mb-6">
          Enter your delivery address where you get the product. You can also
          send any other location where you send the products.
        </p>
      </div>

      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black-true mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter text"
            {...register("name")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
               focus:ring-green-light focus:border-green-light ${
                 errors.name ? "border-red-dark" : "border-gray-dark"
               }`}
          />
          <div className="h-2 mt-1">
            {errors.name && (
              <p className="text-red-dark text-xs" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black-true mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter text"
            {...register("email")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
               focus:ring-green-light focus:border-green-light ${
                 errors.email ? "border-red-dark" : "border-gray-dark"
               }`}
          />
          <div className="h-2 mt-1">
            {errors.email && (
              <p className="text-red-dark text-xs" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-black-true mb-2"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter text"
            {...register("phone")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
               focus:ring-green-light focus:border-green-light ${
                 errors.phone ? "border-red-dark" : "border-gray-dark"
               }`}
          />
          <div className="h-2 mt-1">
            {errors.phone && (
              <p className="text-red-dark text-xs" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-black-true mb-2"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter text"
            {...register("address")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
               focus:ring-green-light focus:border-green-light ${
                 errors.address ? "border-red-dark" : "border-gray-dark"
               }`}
          />
          <div className="h-2 mt-1">
            {errors.address && (
              <p className="text-red-dark text-xs" role="alert">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
