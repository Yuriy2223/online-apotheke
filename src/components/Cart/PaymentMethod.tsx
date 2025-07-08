interface PaymentMethodProps {
  paymentMethod: "Cash On Delivery" | "Bank";
  onPaymentMethodChange: (method: "Cash On Delivery" | "Bank") => void;
}

export const PaymentMethod = ({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodProps) => {
  return (
    <div className="bg-white-true rounded-lg shadow-sm p-6 mb-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Payment method</h2>
        <p className="text-gray-dark text-sm mb-4">
          You can pay us in a multiple way in our payment gateway system.
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Select payment method</legend>
        {["Cash On Delivery", "Bank"].map((method) => {
          const isSelected = paymentMethod === method;
          return (
            <label key={method} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={isSelected}
                onChange={() =>
                  onPaymentMethodChange(method as "Cash On Delivery" | "Bank")
                }
                className="sr-only peer"
              />
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isSelected ? "border-green-light" : "border-gray-dark"
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-light" />
                )}
              </div>
              <span
                className={`ml-2 text-sm ${
                  isSelected ? "text-green-light" : "text-black-true"
                }`}
              >
                {method}
              </span>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
};
