"use client";

import Image from "next/image";
import { Container } from "@/shared/Container";
import { useRouter } from "next/navigation";

export const AddPharmacyPromo = () => {
  const router = useRouter();

  const handleBuyMedicineClick = () => {
    router.push("/pharmacies");
  };

  return (
    <section className="bg-gray-light">
      <Container className="p-10 max-tablet:p-5">
        <div className="bg-green-light rounded-3xl p-8 tablet:p-12 desktop:flex desktop:items-center desktop:gap-12">
          <div className="desktop:flex-1">
            <h2 className="text-white-true text-2xl tablet:text-3xl desktop:text-4xl font-bold mb-4 leading-tight">
              Add your local pharmacy online now
            </h2>

            <p className="text-white-true/90 text-base tablet:text-lg mb-8 leading-relaxed">
              Enjoy the convenience of having your prescriptions filled from
              home by connecting with your community pharmacy through our online
              platform.
            </p>

            <button
              onClick={handleBuyMedicineClick}
              className="bg-white-true/20 hover:bg-white-true/30 text-white-true px-8 py-3 rounded-full font-medium
               transition-colors border border-white-true/20"
            >
              Buy medicine
            </button>
          </div>

          <div className="mt-8 desktop:mt-0 desktop:flex-shrink-0 desktop:flex-1 relative">
            <Image
              src="/images/add-pharmacy-promo.webp"
              alt="Woman using pharmacy app on tablet"
              width={608}
              height={406}
              className="object-cover h-[294px] w-[334px] rounded-[24px] tablet:rounded-[0_24px_24px_0] tablet:h-[406px]
               tablet:w-full  desktop:w-[608px] desktop:h-[406px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
