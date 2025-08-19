"use client";

import Marquee from "react-fast-marquee";
import { Zap } from "lucide-react";
import { Container } from "@/shared/Container";

export const FeaturesCarousel = () => {
  const features = [
    "Take user orders from online",
    "Create your shop profile",
    "Manage your store",
    "Get more orders",
    "Storage shed",
  ];

  return (
    <section className="bg-gray-light">
      <Container className="py-6 overflow-hidden">
        <Marquee
          gradient={true}
          gradientColor="#f7f8fa"
          speed={40}
          pauseOnHover
          direction="right"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap flex-shrink-0 bg-green-soft
               px-8 py-3 rounded-full mx-4"
            >
              <Zap className="w-5 h-5 text-green-light flex-shrink-0" />
              <span className="text-black-true font-medium text-sm tablet:text-base">
                {feature}
              </span>
            </div>
          ))}
        </Marquee>
      </Container>
    </section>
  );
};
