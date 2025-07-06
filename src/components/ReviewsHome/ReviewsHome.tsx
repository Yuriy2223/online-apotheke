"use client";

import { useAppSelector } from "@/redux/store";
import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Container } from "@/shared/Container";
import { NavigationButton } from "./NavigationButton";
import { ReviewsHomeCard } from "./ReviewsHomeCard";
import { selectReviewsHome } from "@/redux/home/selectors";

export const ReviewsHome = () => {
  const reviews = useAppSelector(selectReviewsHome);
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
                <ReviewsHomeCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination flex justify-center mt-8 gap-1" />
        </div>
      </Container>
    </section>
  );
};
