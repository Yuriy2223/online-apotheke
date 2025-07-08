import { CartItem } from "@/types/cart";
import { CartItemCard } from "./CartItemCard";

interface OrderSidebarProps {
  cartItems: CartItem[];
  totalItems: number;
  isCartEmpty: boolean;
  isUpdatingItem: boolean;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const OrderSidebar = ({
  cartItems,
  totalItems,
  isCartEmpty,
  isUpdatingItem,
  onUpdateQuantity,
  onRemoveItem,
}: OrderSidebarProps) => {
  return (
    <aside className="bg-white-true rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Your Order</h2>

      {isCartEmpty ? (
        <p className="text-gray-dark text-center py-8">Your cart is empty</p>
      ) : (
        <div>
          <ul className="space-y-4" role="list">
            {cartItems.map((item) => (
              <li key={item._id}>
                <CartItemCard
                  item={item}
                  isUpdatingItem={isUpdatingItem}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              </li>
            ))}
          </ul>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-base text-gray-dark">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
