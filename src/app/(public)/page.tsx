"use client";

import { Hero } from "@/components/Hero/Hero";
import { NearestPharmacies } from "@/components/NearestMedicine/NearestMedicine";
import { PromoBanners } from "@/components/PromoBanners/PromoBanners";
import { AddPharmacyPromo } from "@/components/AddPharmacyPromo/AddPharmacyPromo";
import { FeaturesCarousel } from "@/components/FeaturesCarousel/FeaturesCarousel";

const HomePage = () => {
  return (
    <>
      <Hero />
      <PromoBanners />
      <NearestPharmacies />
      <AddPharmacyPromo />
      <FeaturesCarousel />
    </>
  );
};

export default HomePage;
