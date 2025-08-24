"use client";

import { Container } from "@/shared/Container";
import { useRouter } from "next/navigation";

export const PromoBanners = () => {
  const router = useRouter();

  const handleShopNow = (discount: number) => {
    router.push(`/search?discount=${discount}`);
  };

  const handleReadMore = () => {
    router.push("/feature");
  };

  const banners = [
    {
      id: 1,
      title: "Huge Sale",
      percentage: "70%",
      action: "Shop now",
      onClick: () => handleShopNow(70),
    },
    {
      id: 2,
      title: "Secure delivery",
      percentage: "100%",
      action: "Read more",
      onClick: handleReadMore,
    },
    {
      id: 3,
      title: "Off",
      percentage: "35%",
      action: "Shop now",
      onClick: () => handleShopNow(35),
    },
  ];

  return (
    <section className=" bg-gray-light">
      <Container className="py-8 px-4">
        <ul className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <li
              key={banner.id}
              className="bg-white-true rounded-xl p-6 shadow-sm border
               border-gray-light hover:shadow-lg transition-shadow list-none"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-soft flex items-center justify-center">
                  <span className="text-green-dark font-semibold text-sm">
                    {banner.id}
                  </span>
                </div>
                <h3 className="text-lg text-black-true">{banner.title}</h3>
              </div>

              <div className="flex items-end justify-between">
                <div className="text-4xl text-black-true">
                  {banner.percentage}
                </div>
                <button
                  onClick={banner.onClick}
                  className="text-gray-dark hover:text-green-light font-medium transition-colors"
                >
                  {banner.action}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
