import { RatingStars } from "../RatingStars/RatingStars";
import { ReviewHome } from "@/types/reviews";

export const ReviewsHomeCard = ({ review }: { review: ReviewHome }) => (
  <div className="bg-white rounded-2xl shadow-none min-h-[240px] flex flex-col">
    <div className="p-6 flex items-center gap-4">
      <img
        src={review.avatar}
        alt="Avatar"
        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-green-light text-lg truncate">
          {review.name}
        </h3>
        <RatingStars rating={review.rating} />
      </div>
    </div>
    <div className="px-6 pb-6 flex-1">
      <p className="text-sm text-gray-dark leading-relaxed line-clamp-6">
        {review.review}
      </p>
    </div>
  </div>
);
