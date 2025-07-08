import { CartItem } from "@/types/cart";
import CartItemCard from "./CartItemCard";

interface OrderSidebarProps {
  cartItems: CartItem[];
  totalItems: number;
  isCartEmpty: boolean;
  isUpdatingItem: boolean;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function OrderSidebar({
  cartItems,
  totalItems,
  isCartEmpty,
  isUpdatingItem,
  onUpdateQuantity,
  onRemoveItem,
}: OrderSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Your Order</h2>

      {isCartEmpty ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItemCard
              key={item._id}
              item={item}
              isUpdatingItem={isUpdatingItem}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
