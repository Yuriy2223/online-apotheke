"use client";
import { useRouter } from "next/navigation";
import { NearestMedicineCard } from "../NearestMedicineCard/NearestMedicineCard";
import { NearestPharmacie } from "@/types/pharmacies";
import { Container } from "@/shared/Container";

export const NearestPharmacies = () => {
  const router = useRouter();

  const handleStoreClick = (nearestPharmacieId: string) => {
    router.push(`/shop/${nearestPharmacieId}`);
  };

  const nearestPharmacie: NearestPharmacie[] = [
    {
      _id: "apteka12",
      name: "E-Pharmacy",
      address: "Stepana Bandery St, 56",
      city: "Uzhhorod",
      phone: "0312-61-62-63",
      rating: 3,
      url: "https://apteka.ua",
    },
    {
      _id: "apteka23",
      name: "E-Pharmacy",
      address: "Chervonoi Kalyny Ave, 76",
      city: "Lviv",
      phone: "032-245-76-88",
      rating: 2,
      url: "https://apteka.ua",
    },
    {
      _id: "apteka34",
      name: "E-Pharmacy",
      address: "Ostrozkoho St, 37",
      city: "Poltava",
      phone: "0532-60-71-82",
      rating: 5,
      url: "https://apteka.ua",
    },
    {
      _id: "apteka56",
      name: "E-Pharmacy",
      address: "Krymskoho St, 18",
      city: "Zaporizhzhia",
      phone: "0652-51-62-73",
      rating: 4,
      url: "https://apteka.ua",
    },
    {
      _id: "apteka78",
      name: "E-Pharmacy",
      address: "Hrushevskoho St, 4",
      city: "Kyiv",
      phone: "044-501-36-86",
      rating: 3,
      url: "https://apteka.ua",
    },
    {
      _id: "apteka99",
      name: "E-Pharmacy E-Pharmacy",
      address: "Studentska St, 12",
      city: "Sumy",
      phone: "0542-67-88-99",
      rating: 4,
      url: "https://apteka.ua",
    },
  ];

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
          {nearestPharmacie.map((nearestPharmacie) => (
            <li key={nearestPharmacie._id}>
              <NearestMedicineCard
                nearestPharmacie={nearestPharmacie}
                onClick={handleStoreClick}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
