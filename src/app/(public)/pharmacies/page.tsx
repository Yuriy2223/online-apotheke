"use client";

import { useState, useEffect } from "react";
import { PharmacieCard } from "@/components/PharmacieCard/PharmacieCard";
import { Container } from "@/shared/Container";
import { Pharmacie } from "@/types/pharmacies";
import { constPharmacies } from "@/потімВидали/constPharmacies";

const PharmaciesPage = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacie[]>([]);

  useEffect(() => {
    setPharmacies(constPharmacies);
  }, []);

  return (
    <Container className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black-true mb-8 text-center">
          Pharmacies
        </h1>

        {pharmacies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-dark text-lg">No pharmacies found.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
            {pharmacies.map((pharmacie) => (
              <li key={pharmacie._id}>
                <PharmacieCard pharmacie={pharmacie} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default PharmaciesPage;
