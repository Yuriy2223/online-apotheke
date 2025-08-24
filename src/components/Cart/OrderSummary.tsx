interface OrderSummaryProps {
  totalAmount: number;
  isPlacingOrder: boolean;
  isCartEmpty: boolean;
}

export const OrderSummary = ({
  totalAmount,
  isPlacingOrder,
  isCartEmpty,
}: OrderSummaryProps) => {
  return (
    <div className="bg-white-true rounded-lg shadow-sm p-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Order details</h2>
        <p className="text-gray-dark text-sm mb-4">
          Shipping and additional costs are calculated based on values you have
          entered.
        </p>
      </div>

      <div className="flex justify-between items-center p-4 bg-green-soft rounded-lg mb-4">
        <span className="font-medium">Total:</span>
        <span className="text-xl font-bold">$ {totalAmount.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        disabled={isPlacingOrder || isCartEmpty}
        className="w-full bg-green-light text-white-true py-3 px-4 rounded-lg
         hover:bg-green-dark disabled:bg-gray-dark disabled:cursor-not-allowed 
         transition-colors font-medium"
      >
        {isPlacingOrder ? "Placing Order..." : "Place order"}
      </button>
    </div>
  );
};
