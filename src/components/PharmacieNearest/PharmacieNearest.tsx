"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/shared/Container";
import { PharmacieNearestCard } from "./PharmacieNearestCard";
import { useAppSelector } from "@/redux/store";
import { selectPharmacieNearest } from "@/redux/home/selectors";

export const PharmaciesNearest = () => {
  const router = useRouter();
  const nearest = useAppSelector(selectPharmacieNearest);
  const handleStoreClick = (url: string) => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <section className="bg-gray-light">
      <Container className="pt-4 pb-6 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black-true mb-2">
            Your Nearest Medicine
          </h2>
          <p className="text-gray-dark">
            Search for Medicine, Filter by your location
          </p>
        </div>

        <ul className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
          {nearest.map((nearest) => (
            <li key={nearest._id}>
              <PharmacieNearestCard
                nearest={nearest}
                onClick={handleStoreClick}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
