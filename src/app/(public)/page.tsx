"use client";

import { AddPharmacyPromo } from "@/components/AddPharmacyPromo/AddPharmacyPromo";
import { Hero } from "@/components/Hero/Hero";
import { NearestPharmacies } from "@/components/NearestMedicine/NearestMedicine";
import { PromoBanners } from "@/components/PromoBanners/PromoBanners";

const HomePage = () => {
  return (
    <>
      <Hero />
      <PromoBanners />
      <NearestPharmacies />
      <AddPharmacyPromo />
    </>
  );
};

export default HomePage;
