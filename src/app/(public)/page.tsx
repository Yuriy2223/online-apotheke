"use client";

import { Hero } from "@/components/Hero/Hero";
import { NearestPharmacies } from "@/components/NearestMedicine/NearestMedicine";
import { PromoBanners } from "@/components/PromoBanners/PromoBanners";

const HomePage = () => {
  return (
    <>
      <Hero />
      <PromoBanners />
      <NearestPharmacies />
    </>
  );
};

export default HomePage;
