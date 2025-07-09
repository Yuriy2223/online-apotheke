import { MedicineProduct } from "@/types/medicine-products";
import { useAddToCart } from "@/hooks/useAddToCart";

interface ProductCardProps {
  product: MedicineProduct;
  onDetails: (productId: string) => void;
}

export const MedicineProductCard: React.FC<ProductCardProps> = ({
  product,
  onDetails,
}) => {
  const { handleAddToCart, isUpdatingItem } = useAddToCart();

  const handleAddToCartClick = () => {
    handleAddToCart(product._id, 1);
  };

  const handleDetails = () => {
    onDetails(product._id);
  };

  return (
    <div className="bg-green-soft rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
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
        <p className="text-xl font-bold text-black-true mb-4">
          $ {product.price}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCartClick}
            disabled={isUpdatingItem}
            className="flex-1 bg-green-light text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-green-dark focus:ring-offset-2 transition-colors disabled:bg-gray-dark disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUpdatingItem ? (
              <>
                <div className="w-4 h-4 border-2 border-white-true border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              "Add to cart"
            )}
          </button>
          <button
            onClick={handleDetails}
            className="px-4 py-2.5 border border-gray-dark text-gray-dark rounded-lg text-sm font-medium hover:bg-gray-light focus:outline-none focus:ring-2 focus:ring-gray-dark focus:ring-offset-2 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
