import { Spinner } from "@/shared/Spinner";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination/Pagination";
import { StarRating } from "./StarRating";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchMedicineProductReviews } from "@/redux/medicine-product/operations";
import { selectMedicineProductReviewsPagination } from "@/redux/medicine-product/selectors";
import { MedicineProductDetailsReviewWithUser } from "@/types/medicine-products";

interface ReviewsTabProps {
  reviews: MedicineProductDetailsReviewWithUser[];
  loading: boolean;
  productId: string;
}

export function ReviewsTab({ reviews, loading, productId }: ReviewsTabProps) {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectMedicineProductReviewsPagination);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (productId) {
      dispatch(
        fetchMedicineProductReviews({ productId, page: currentPage, limit: 5 })
      );
    }
  }, [currentPage, productId, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
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
                        {review.commentDate}
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

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
