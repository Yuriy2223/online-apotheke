import { MedicineProduct } from "@/types/medicine-products";

interface ProductCardProps {
  product: MedicineProduct;
  onAddToCart: (productId: string) => void;
  onDetails: (productId: string) => void;
}

export const MedicineProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onDetails,
}) => {
  const handleAddToCart = () => {
    onAddToCart(product._id);
  };

  const handleDetails = () => {
    onDetails(product._id);
  };

  return (
    // <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-[335px] sm:max-w-[226px] lg:max-w-[280px]">
    <div className="bg-green-soft rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square bg-gray-50 p-6 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.photo || "/images/default-medicine.webp"}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/default-medicine.webp";
          }}
          className="w-full h-full object-contain max-w-[120px] max-h-[120px]"
        />
      </div>

      <div className="p-4 border-t border-gray-100">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{product.suppliers}</p>
        <p className="text-xl font-bold text-gray-900 mb-4">₴{product.price}</p>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Add to cart
          </button>
          <button
            onClick={handleDetails}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
