interface OrderSummarySectionProps {
  totalAmount: number;
  isPlacingOrder: boolean;
  isCartEmpty: boolean;
  canPlaceOrder: boolean;
  onPlaceOrder: () => void;
}

export default function OrderSummarySection({
  totalAmount,
  isPlacingOrder,
  isCartEmpty,
  canPlaceOrder,
  onPlaceOrder,
}: OrderSummarySectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-2">Order details</h2>
      <p className="text-gray-600 text-sm mb-4">
        Shipping and additional costs are calculated based on values you have
        entered.
      </p>

      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-4">
        <span className="font-medium">Total:</span>
        <span className="text-xl font-bold">৳ {totalAmount.toFixed(2)}</span>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={isPlacingOrder || isCartEmpty || !canPlaceOrder}
        className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isPlacingOrder ? "Placing Order..." : "Place order"}
      </button>
    </div>
  );
}
