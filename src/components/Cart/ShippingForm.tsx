import { ShippingInfo } from "@/types/cart";

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  shippingErrors: Record<string, string>;
  onShippingInfoChange: (field: keyof ShippingInfo, value: string) => void;
}

export default function ShippingForm({
  shippingInfo,
  shippingErrors,
  onShippingInfoChange,
}: ShippingFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200">
      <h2 className="text-lg font-semibold mb-2">Enter shipping info</h2>
      <p className="text-gray-600 text-sm mb-6">
        Enter your delivery address where you get the product. You can also send
        any other location where you send the products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter text"
            value={shippingInfo.name}
            onChange={(e) => onShippingInfoChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              shippingErrors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {shippingErrors.name && (
            <p className="text-red-500 text-xs mt-1">{shippingErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter text"
            value={shippingInfo.email}
            onChange={(e) => onShippingInfoChange("email", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              shippingErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {shippingErrors.email && (
            <p className="text-red-500 text-xs mt-1">{shippingErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            placeholder="Enter text"
            value={shippingInfo.phone}
            onChange={(e) => onShippingInfoChange("phone", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              shippingErrors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {shippingErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{shippingErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter text"
            value={shippingInfo.address}
            onChange={(e) => onShippingInfoChange("address", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              shippingErrors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {shippingErrors.address && (
            <p className="text-red-500 text-xs mt-1">
              {shippingErrors.address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
