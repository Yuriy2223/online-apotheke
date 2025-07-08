import { CartItem } from "@/types/cart";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

interface CartItemCardProps {
  item: CartItem;
  isUpdatingItem: boolean;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartItemCard({
  item,
  isUpdatingItem,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemCardProps) {
  return (
    <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
      <div className="w-12 h-12 relative flex-shrink-0">
        <Image
          src={item.photo || "/api/placeholder/60/60"}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
          sizes="48px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
        <p className="text-xs text-gray-500">Stock: {item.stock}</p>
        <p className="text-sm font-medium text-gray-900 mt-1">
          ৳ {item.price.toFixed(2)}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdatingItem}
              className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={12} />
            </button>
            <span className="text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
              disabled={item.quantity >= item.stock || isUpdatingItem}
              className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={12} />
            </button>
          </div>

          <button
            onClick={() => onRemoveItem(item._id)}
            disabled={isUpdatingItem}
            className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
          >
            Remove
          </button>
        </div>

        <div className="mt-2 text-right">
          <p className="text-sm font-medium text-gray-900">
            Total: ৳ {item.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
