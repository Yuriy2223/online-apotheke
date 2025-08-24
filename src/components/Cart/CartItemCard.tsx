import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CartItemCardProps {
  item: CartItem;
  isUpdatingItem: boolean;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartItemCard = ({
  item,
  isUpdatingItem,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemCardProps) => {
  return (
    <article
      className="flex flex-col tablet:flex-row tablet:justify-between 
    tablet:space-x-3 p-4 border border-gray-light bg-gray-light rounded-lg"
    >
      <div className="flex flex-1 space-x-4">
        <div className="w-[130px] h-[130px] relative flex-shrink-0">
          <Image
            src={item.photo || "/api/placeholder/130/130"}
            alt={item.name}
            fill
            className="object-cover rounded-lg"
            sizes="130px"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <header>
            <h3 className="font-medium text-black-true text-sm">{item.name}</h3>
            <p className="text-xs text-gray-dark mt-1">{item.category}</p>
            <p className="text-xs text-gray-dark">Stock: {item.stock}</p>
            <p className="text-sm font-medium text-black-true mt-1">
              $ {item.price.toFixed(2)}
            </p>
          </header>

          <div className="flex items-center justify-between mt-2">
            <div
              className="flex items-center justify-between bg-green-soft rounded-full
               w-[120px] h-[40px] px-3 text-white-true"
              role="group"
              aria-label="Quantity controls"
            >
              <button
                onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                disabled={item.quantity >= item.stock || isUpdatingItem}
                className="text-green-light disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus size={26} />
              </button>
              <span
                className="text-black-true text-lg font-medium mx-2"
                aria-label="Current quantity"
              >
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdatingItem}
                className="text-green-light disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus size={26} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer
        className="flex flex-col tablet:flex-col tablet:items-end tablet:justify-between 
      mt-4 tablet:mt-0 max-tablet:flex-row max-tablet:justify-between max-tablet:items-center"
      >
        <button
          onClick={() => onRemoveItem(item._id)}
          disabled={isUpdatingItem}
          className="bg-red-light hover:bg-red-dark text-red-dark hover:text-white-true 
          text-sm px-4 py-2 rounded-full transition-colors duration-300 ease-in-out"
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
        <p className="text-sm font-medium text-black-true mt-2 max-tablet:mt-0">
          Total: $ {item.totalPrice.toFixed(2)}
        </p>
      </footer>
    </article>
  );
};
