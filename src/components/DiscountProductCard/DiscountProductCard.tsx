import { PromotionProduct } from "@/types/medicine-products";
import { useAddToCart } from "@/hooks/useAddToCart";

interface DiscountProductCardProps {
  product: PromotionProduct;

  onDetails: (productId: string, discountPercent?: number) => void;
  discount: number;
}

export const DiscountProductCard: React.FC<DiscountProductCardProps> = ({
  product,
  onDetails,
  discount,
}) => {
  const { handleAddToCart, isUpdatingItem } = useAddToCart();

  const originalPrice = Number(product.price) || 0;
  const discountedPrice =
    discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
  const hasDiscount = discount > 0;

  const handleAddToCartClick = () => {
    handleAddToCart(product._id, 1, hasDiscount ? discountedPrice : undefined);
  };

  const handleDetails = () => {
    onDetails(product._id, hasDiscount ? discount : undefined);
  };

  if (originalPrice <= 0) {
    return (
      <div className="bg-green-soft rounded-2xl p-4 shadow-sm">
        <p className="text-red-dark">Invalid product price</p>
      </div>
    );
  }

  return (
    <div
      className="bg-green-soft rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow
     duration-200 relative"
    >
      {hasDiscount && (
        <div className="absolute top-4 right-3 z-10">
          <span className="text-sm bg-red-dark text-white px-3 py-2 rounded-full font-semibold">
            -{discount}%
          </span>
        </div>
      )}

      <div className="flex items-center justify-center rounded-2xl overflow-hidden">
        <img
          src={product.photo || "/images/default-medicine.webp"}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/default-medicine.webp";
          }}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="pt-2 px-2">
        <h3 className="font-semibold text-black-true text-lg mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-dark mb-3">{product.suppliers}</p>

        <div className="mb-4">
          {hasDiscount ? (
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-green-light">
                ${discountedPrice.toFixed(2)}
              </p>
              <p className="text-xl text-red-dark line-through">
                ${originalPrice.toFixed(2)}
              </p>
              <span className="text-xs text-green-light">
                Заощадь ${(originalPrice - discountedPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <p className="text-xl font-bold text-black-true">
              ${originalPrice.toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCartClick}
            disabled={isUpdatingItem}
            className="flex-1 bg-green-light text-white px-4 py-2.5 rounded-lg text-sm font-medium
             hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-green-dark
              focus:ring-offset-2 transition-colors disabled:bg-gray-dark disabled:cursor-not-allowed 
              flex items-center justify-center gap-2"
          >
            {isUpdatingItem ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white-true border-t-transparent rounded-full 
                animate-spin"
                ></div>
                Adding...
              </>
            ) : (
              "Add to cart"
            )}
          </button>
          <button
            onClick={handleDetails}
            className="px-4 py-2.5 border border-gray-dark text-gray-dark rounded-lg text-sm 
            font-medium hover:bg-gray-light focus:outline-none focus:ring-2 focus:ring-gray-dark 
            focus:ring-offset-2 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
