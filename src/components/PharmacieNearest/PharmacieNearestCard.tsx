"use client";

import Image from "next/image";
import { PharmacieNearest } from "@/types/pharmacies";
import { MapPin, Phone, Star, Building2 } from "lucide-react";

interface StoreCardProps {
  nearest: PharmacieNearest;
  onClick: (url: string) => void;
}

export const PharmacieNearestCard = ({ nearest, onClick }: StoreCardProps) => {
  const handleClick = () => {
    if (nearest.url) {
      onClick(nearest.url);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="bg-green-soft rounded-xl p-6 shadow-sm border border-green-soft hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black-true overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0">
          {nearest.name}
        </h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < nearest.rating
                  ? "fill-yellow-dark text-yellow-dark"
                  : "fill-green-soft text-yellow-dark"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium">{nearest.rating}</span>
        </div>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <Building2 className="w-4 h-4 text-green-light mt-0.5" />
        <span className="text-gray-dark text-sm font-medium">
          {nearest.city}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <MapPin className="w-4 h-4 text-green-light mt-0.5" />
        <span className="text-gray-dark text-sm overflow:hidden text-overflow:ellipsis white-space: nowrap">
          {nearest.address}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Phone className="w-4 h-4 text-green-600" />
        <span className="text-gray-dark text-sm flex-1">{nearest.phone}</span>
        <Image
          src="/images/logo-green.webp"
          alt="Pharmacy logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
  );
};
