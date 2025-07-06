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
}

export function TabsContainer({
  activeTab,
  onTabChange,
  product,
  reviews,
  reviewsLoading,
}: TabsContainerProps) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600 bg-green-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
          <ReviewsTab reviews={reviews} loading={reviewsLoading} />
        )}
      </div>
    </div>
  );
}
