import { Spinner } from "@/shared/Spinner";
import { useState } from "react";
import { Pagination } from "@/components/Pagination/Pagination";
import { MedicineProductDetailsReview } from "@/types/medicine-products";
import { StarRating } from "./StarRating";

interface ReviewsTabProps {
  reviews: MedicineProductDetailsReview[];
  loading: boolean;
}

export function ReviewsTab({ reviews, loading }: ReviewsTabProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const defaultReviews: MedicineProductDetailsReview[] = [
    {
      _id: "1",
      userId: "user1",
      userName: "Leroy Jenkins",
      userAvatar: "/api/placeholder/40/40",
      rating: 4,
      comment:
        "I've been using Moringa powder in my smoothies for a few weeks now. My energy levels are up, and I feel great. I followed the recommended dosage, and it seems to be a perfect addition to my daily routine. Highly recommend!",
      createdAt: "2 days ago",
    },
    {
      _id: "2",
      userId: "user2",
      userName: "Leroy Jenkins",
      userAvatar: "/api/placeholder/40/40",
      rating: 4,
      comment:
        "I tried Moringa capsules as part of my wellness regimen, and I've been pleasantly surprised by the results. My skin looks healthier, and I've noticed an improvement in my digestion. A natural and effective supplement!",
      createdAt: "1 days ago",
    },
    {
      _id: "3",
      userId: "user3",
      userName: "Leroy Jenkins",
      userAvatar: "/api/placeholder/40/40",
      rating: 4,
      comment:
        "I added Moringa oil to my skincare routine, and the results are amazing. My skin feels smoother and more nourished. I was skeptical at first, but now I'm a firm believer in its benefits.",
      createdAt: "2 days ago",
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  const totalPages = Math.ceil(displayReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = displayReviews.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {displayReviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {currentReviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                    {review.userAvatar ? (
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-gray-900">
                          {review.userName}
                        </h4>
                        <StarRating rating={review.rating} size="small" />
                        <span className="text-sm font-medium text-gray-700">
                          {review.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.createdAt}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
