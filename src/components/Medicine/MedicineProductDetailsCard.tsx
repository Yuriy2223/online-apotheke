// import { MedicineProduct } from "@/types/medicine-products";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useState } from "react";
// import { StarRating } from "./StarRating";

// interface MedicineProductCardProps {
//   product: MedicineProduct;
//   onAddToCart: (productId: string, quantity?: number) => void;
//   onDetails?: (productId: string) => void;
// }

// export function MedicineProductDetailsCard({
//   product,
//   onAddToCart,
// }: MedicineProductCardProps) {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);
//   const [imageLoading, setImageLoading] = useState(true);

//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity >= 1) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleDetailsClick = () => {
//     router.push(`/medicine/${product._id}`);
//   };

//   const handleAddToCartClick = () => {
//     onAddToCart(product._id, quantity);
//   };

//   const mockRating = 4;
//   const mockReviewsCount = 12;

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//       <div className="aspect-square bg-gray-50 overflow-hidden relative">
//         {imageLoading && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         )}
//         <Image
//           src={product.photo}
//           alt={product.name}
//           width={300}
//           height={300}
//           className="w-full h-full object-cover cursor-pointer"
//           onLoad={() => setImageLoading(false)}
//           onClick={handleDetailsClick}
//         />
//       </div>

//       <div className="p-4 space-y-3">
//         <div>
//           <h3
//             className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
//             onClick={handleDetailsClick}
//           >
//             {product.name}
//           </h3>
//           <p className="text-sm text-gray-600">Brand: {product.suppliers}</p>
//         </div>

//         <div className="text-xl font-bold text-gray-900">₴{product.price}</div>

//         <div className="flex items-center gap-2">
//           <StarRating rating={mockRating} size="small" />
//           <span className="text-sm text-gray-600">
//             {mockRating} ({mockReviewsCount})
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="flex items-center border border-gray-300 rounded-md">
//             <button
//               onClick={() => handleQuantityChange(quantity - 1)}
//               disabled={quantity <= 1}
//               className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
//             >
//               −
//             </button>
//             <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center text-sm">
//               {quantity}
//             </span>
//             <button
//               onClick={() => handleQuantityChange(quantity + 1)}
//               className="px-2 py-1 text-gray-600 hover:text-gray-800"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <button
//             onClick={handleAddToCartClick}
//             className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
//           >
//             Add to cart
//           </button>

//           <div className="flex gap-2">
//             <button
//               onClick={handleDetailsClick}
//               className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm"
//             >
//               Description
//             </button>
//             <button
//               onClick={handleDetailsClick}
//               className="flex-1 bg-white text-green-500 border border-green-500 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors text-sm"
//             >
//               Reviews
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
/**************************** */

import { MedicineProduct } from "@/types/medicine-products";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { StarRating } from "./StarRating";
import { useAddToCart } from "@/hooks/useAddToCart";

interface MedicineProductCardProps {
  product: MedicineProduct;
}

export function MedicineProductDetailsCard({
  product,
}: MedicineProductCardProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  const { handleAddToCart, isUpdatingItem } = useAddToCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleDetailsClick = () => {
    router.push(`/medicine/${product._id}`);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(product._id, quantity);
  };

  const mockRating = 4;
  const mockReviewsCount = 12;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={product.photo}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover cursor-pointer"
          onLoad={() => setImageLoading(false)}
          onClick={handleDetailsClick}
        />
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3
            className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
            onClick={handleDetailsClick}
          >
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">Brand: {product.suppliers}</p>
        </div>

        <div className="text-xl font-bold text-gray-900">₴{product.price}</div>

        <div className="flex items-center gap-2">
          <StarRating rating={mockRating} size="small" />
          <span className="text-sm text-gray-600">
            {mockRating} ({mockReviewsCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdatingItem}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="px-3 py-1 border-x border-gray-300 min-w-[40px] text-center text-sm">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdatingItem}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleAddToCartClick}
            disabled={isUpdatingItem}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUpdatingItem ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              "Add to cart"
            )}
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleDetailsClick}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              Description
            </button>
            <button
              onClick={handleDetailsClick}
              className="flex-1 bg-white text-green-500 border border-green-500 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors text-sm"
            >
              Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
