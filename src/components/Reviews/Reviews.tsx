"use client";

import { useRef, useCallback, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "../../потімВидали/reviews";
import { Container } from "@/shared/Container";

const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex gap-1 mt-1">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-dark fill-yellow-dark" : "text-yellow-dark"
        }`}
      />
    ))}
  </div>
));

StarRating.displayName = "StarRating";

const ReviewCard = memo(({ review }: { review: (typeof reviews)[0] }) => (
  <div className="bg-white rounded-2xl shadow-none min-h-[240px] flex flex-col">
    <div className="p-6 flex items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={review.avatar}
        alt=""
        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-green-light text-lg truncate">
          {review.name}
        </h3>
        <StarRating rating={review.rating || 0} />
      </div>
    </div>
    <div className="px-6 pb-6 flex-1">
      <p className="text-sm text-gray-dark leading-relaxed line-clamp-6">
        {review.review}
      </p>
    </div>
  </div>
));

ReviewCard.displayName = "ReviewCard";

const NavigationButton = memo(
  ({ direction }: { direction: "prev" | "next" }) => {
    const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
    const customClass = direction === "prev" ? "custom-prev" : "custom-next";

    return (
      <button
        className={`${customClass} absolute top-1/2 ${
          direction === "prev" ? "-left-4" : "-right-4"
        } -translate-y-[55%] z-10 rounded-full transition-shadow flex items-center justify-center group`}
        type="button"
      >
        <Icon className="w-16 h-16 text-green-light transition-transform duration-300 group-hover:scale-110" />
      </button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";

export const Reviews = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
  }, []);

  return (
    <section className="bg-gray-light">
      <Container className="py-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black-true mb-3">Reviews</h2>
          <p className="text-gray-dark">
            Search for Medicine, Filter by your location
          </p>
        </div>

        <div className="relative px-12">
          <NavigationButton direction="prev" />
          <NavigationButton direction="next" />

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
              bulletClass:
                "inline-block w-2 h-2 rounded-full mx-0.5 cursor-pointer transition-all bg-gray-300 hover:bg-green-light",
              bulletActiveClass: "!bg-green-light scale-125",
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
            onInit={handleSwiperInit}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination flex justify-center mt-8 gap-1" />
        </div>
      </Container>
    </section>
  );
};
