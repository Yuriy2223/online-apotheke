import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { MedicineProductDetails } from "@/types/medicine-products";
import { StarRating } from "./StarRating";

interface ProductOverviewProps {
  product: MedicineProductDetails;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  isAddingToCart?: boolean;
}

export function ProductOverview({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  isAddingToCart = false,
}: ProductOverviewProps) {
  return (
    <div className="bg-white-true rounded-lg shadow-sm border border-gray-light p-6 mb-8">
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="w-full max-w-sm aspect-square bg-gray-light rounded-lg overflow-hidden">
            <Image
              src={product.photo}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl tablet:text-3xl font-bold text-black-true mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-dark">Brand: {product.suppliers}</p>
          </div>

          <div className="text-2xl tablet:text-3xl font-bold text-black-true">
            $ {product.price}
          </div>

          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewsCount} reviews)
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-green-light rounded-lg">
                <button
                  onClick={() => onQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isAddingToCart}
                  className="px-3 py-2 text-green-light hover:text-green-dark disabled:text-gray-dark disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-4 py-1 text-lg text-black-true border-x border-green-light min-w-[60px] text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => onQuantityChange(quantity + 1)}
                  disabled={isAddingToCart || quantity >= product.stock}
                  className="px-3 py-2 text-green-light hover:text-green-dark disabled:text-gray-dark disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={onAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-green-light text-white-true px-6 py-2 rounded-lg hover:bg-green-dark transition-colors font-medium disabled:bg-gray-dark disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white-true border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-light rounded-full"></div>
            <span className="text-sm text-gray-dark">
              In Stock ({product.stock})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
