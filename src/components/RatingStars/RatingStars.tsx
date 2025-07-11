import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  showValue?: boolean;
  className?: string;
}

export const RatingStars = ({
  rating,
  showValue = true,
  className = "",
}: RatingStarsProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-yellow-dark text-yellow-dark"
              : "fill-transparent text-yellow-dark"
          }`}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-dark">
          {rating}
        </span>
      )}
    </div>
  );
};
