"use client";

import { Hero } from "@/components/Hero/Hero";
import { NearestPharmacies } from "@/components/NearestMedicine/NearestMedicine";
import { PromoBanners } from "@/components/PromoBanners/PromoBanners";
import { AddPharmacyPromo } from "@/components/AddPharmacyPromo/AddPharmacyPromo";
import { FeaturesCarousel } from "@/components/FeaturesCarousel/FeaturesCarousel";
import { Reviews } from "@/components/Reviews/Reviews";

const HomePage = () => {
  return (
    <>
      <Hero />
      <PromoBanners />
      <NearestPharmacies />
      <AddPharmacyPromo />
      <FeaturesCarousel />
      <Reviews />
    </>
  );
};

export default HomePage;
