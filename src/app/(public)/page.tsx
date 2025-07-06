"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { Hero } from "@/components/Hero/Hero";
import { PharmaciesNearest } from "@/components/PharmacieNearest/PharmacieNearest";
import { PromoBanners } from "@/components/PromoBanners/PromoBanners";
import { AddPharmacyPromo } from "@/components/AddPharmacyPromo/AddPharmacyPromo";
import { FeaturesCarousel } from "@/components/FeaturesCarousel/FeaturesCarousel";
import { ReviewsHome } from "@/components/ReviewsHome/ReviewsHome";
import {
  fetchPharmacieNearest,
  fetchReviewsHome,
} from "@/redux/home/operations";

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewsHome());
    dispatch(fetchPharmacieNearest());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <PromoBanners />
      <PharmaciesNearest />
      <AddPharmacyPromo />
      <FeaturesCarousel />
      <ReviewsHome />
    </>
  );
};

export default HomePage;
