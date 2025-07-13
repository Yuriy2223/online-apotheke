// import {
//   MedicineProductDetails,
//   MedicineProductDetailsReview,
// } from "@/types/medicine-products";
// import { DescriptionTab } from "./DescriptionTab";
// import { ReviewsTab } from "./ReviewsTab";

// interface TabsContainerProps {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
//   product: MedicineProductDetails;
//   reviews: MedicineProductDetailsReview[];
//   reviewsLoading: boolean;
// }

// export function TabsContainer({
//   activeTab,
//   onTabChange,
//   product,
//   reviews,
//   reviewsLoading,
// }: TabsContainerProps) {
//   const tabs = [
//     { id: "description", label: "Description" },
//     { id: "reviews", label: "Reviews" },
//   ];

//   return (
//     <div className="bg-white-true rounded-lg shadow-sm border border-gray-light">
//       <div className="border-b border-gray-200">
//         <nav className="flex">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => onTabChange(tab.id)}
//               className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === tab.id
//                   ? "border-green-light text-green-light bg-green-soft"
//                   : "border-transparent text-gray-dark hover:text-gray-dark hover:border-gray-dark"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       <div className="p-6">
//         {activeTab === "description" && <DescriptionTab product={product} />}
//         {activeTab === "reviews" && (
//           <ReviewsTab reviews={reviews} loading={reviewsLoading} />
//         )}
//       </div>
//     </div>
//   );
// }

/******************** */

import {
  MedicineProductDetails,
  MedicineProductDetailsReview,
} from "@/types/medicine-products";
import { DescriptionTab } from "./DescriptionTab";
import { ReviewsTab } from "./ReviewsTab";

interface TabsContainerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  product: MedicineProductDetails;
  reviews: MedicineProductDetailsReview[];
  reviewsLoading: boolean;
  productId: string;
}

export function TabsContainer({
  activeTab,
  onTabChange,
  product,
  reviews,
  reviewsLoading,
  productId,
}: TabsContainerProps) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="bg-white-true rounded-lg shadow-sm border border-gray-light">
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-green-light text-green-light bg-green-soft"
                  : "border-transparent text-gray-dark hover:text-gray-dark hover:border-gray-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "description" && <DescriptionTab product={product} />}
        {activeTab === "reviews" && (
          <ReviewsTab
            reviews={reviews}
            loading={reviewsLoading}
            productId={productId}
          />
        )}
      </div>
    </div>
  );
}
