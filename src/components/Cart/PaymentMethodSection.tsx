interface PaymentMethodSectionProps {
  paymentMethod: "Cash On Delivery" | "Bank";
  onPaymentMethodChange: (method: "Cash On Delivery" | "Bank") => void;
}

export default function PaymentMethodSection({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Payment method</h2>
      <p className="text-gray-600 text-sm mb-4">
        You can pay us in a multiple way in our payment gateway system.
      </p>

      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="Cash On Delivery"
            checked={paymentMethod === "Cash On Delivery"}
            onChange={(e) =>
              onPaymentMethodChange(
                e.target.value as "Cash On Delivery" | "Bank"
              )
            }
            className="w-4 h-4 text-green-600 focus:ring-green-500"
          />
          <span className="ml-2 text-sm text-gray-700">Cash On Delivery</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="Bank"
            checked={paymentMethod === "Bank"}
            onChange={(e) =>
              onPaymentMethodChange(
                e.target.value as "Cash On Delivery" | "Bank"
              )
            }
            className="w-4 h-4 text-green-600 focus:ring-green-500"
          />
          <span className="ml-2 text-sm text-gray-700">Bank</span>
        </label>
      </div>
    </div>
  );
}
