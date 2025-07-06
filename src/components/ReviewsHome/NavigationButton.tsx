import { ChevronLeft, ChevronRight } from "lucide-react";

export const NavigationButton = ({
  direction,
}: {
  direction: "prev" | "next";
}) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const customClass = direction === "prev" ? "custom-prev" : "custom-next";

  return (
    <button
      className={`${customClass} absolute top-1/2 ${
        direction === "prev" ? "-left-4" : "-right-4"
      } -translate-y-[55%] z-10 rounded-full transition-shadow flex items-center justify-center group`}
      type="button"
    >
      <Icon className="w-16 h-16 text-green-light transition-transform duration-300 group-hover:scale-110" />
    </button>
  );
};
