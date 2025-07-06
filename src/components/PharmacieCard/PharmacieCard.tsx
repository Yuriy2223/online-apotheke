import { Pharmacie } from "@/types/pharmacies";
import { MapPin, Phone, Building2 } from "lucide-react";
import { RatingStars } from "../RatingStars/RatingStars";
import { getPharmacyStatus } from "@/utils/pharmacyStatus";

interface PharmacieCardProps {
  pharmacie: Pharmacie;
}

export const PharmacieCard = ({ pharmacie }: PharmacieCardProps) => {
  const status = getPharmacyStatus(pharmacie);

  const handleVisitStore = () => {
    if (pharmacie.url) {
      window.open(pharmacie.url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `/pharmacy/${pharmacie._id}`;
    }
  };

  return (
    <div className="bg-green-soft rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-black-true overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            {pharmacie.name}
          </h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-green.webp"
            alt="Pharmacy logo"
            width={34}
            height={34}
            className="rounded-lg object-contain flex-shrink-0"
          />
        </div>

        <div className="flex items-center gap-2 text-gray-dark overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
          <Building2 className="w-4 h-4 flex-shrink-0 text-green-dark" />
          <span className="text-sm">{pharmacie.city}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-dark overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
          <MapPin className="w-4 h-4 flex-shrink-0 text-green-dark" />
          <span className="text-sm">{pharmacie.address}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-dark overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
          <Phone className="w-4 h-4 flex-shrink-0 text-green-dark" />
          <span className="text-sm">{pharmacie.phone}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleVisitStore}
            className="bg-green-light hover:bg-green-dark text-white-true px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Visit Store
          </button>

          <div className="flex items-center gap-3">
            <RatingStars rating={pharmacie.rating} />
            <div
              className={`px-2 py-1 rounded text-xs font-medium ${
                status === "OPEN"
                  ? "bg-green-light text-white-true"
                  : status === "CLOSE"
                  ? "bg-red-light text-red-dark"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
