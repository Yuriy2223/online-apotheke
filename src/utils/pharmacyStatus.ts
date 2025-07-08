import { Pharmacie } from "@/types/pharmacies";

export const getPharmacyStatus = (pharmacie: Pharmacie): "OPEN" | "CLOSE" => {
  if (!pharmacie) return "CLOSE";

  const openTime = pharmacie.openTime?.toString().trim();
  const closeTime = pharmacie.closeTime?.toString().trim();

  if (!openTime || !closeTime) return "CLOSE";

  const parseTime = (
    time: string
  ): { hours: number; minutes: number } | null => {
    const cleaned = time.replace(/[^\d]/g, "");

    if (cleaned.length === 4) {
      const hours = parseInt(cleaned.slice(0, 2), 10);
      const minutes = parseInt(cleaned.slice(2), 10);
      if (hours < 24 && minutes < 60) return { hours, minutes };
    } else if (cleaned.length === 3) {
      const hours = parseInt(cleaned[0], 10);
      const minutes = parseInt(cleaned.slice(1), 10);
      if (hours < 24 && minutes < 60) return { hours, minutes };
    } else if (cleaned.length <= 2) {
      const hours = parseInt(cleaned, 10);
      if (hours < 24) return { hours, minutes: 0 };
    }

    return null;
  };

  const parsedOpen = parseTime(openTime);
  const parsedClose = parseTime(closeTime);

  if (!parsedOpen || !parsedClose) return "CLOSE";

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = parsedOpen.hours * 60 + parsedOpen.minutes;
  const closeMinutes = parsedClose.hours * 60 + parsedClose.minutes;

  if (openMinutes === closeMinutes) return "CLOSE";

  const isOpen =
    openMinutes < closeMinutes
      ? currentMinutes >= openMinutes && currentMinutes < closeMinutes
      : currentMinutes >= openMinutes || currentMinutes < closeMinutes;

  return isOpen ? "OPEN" : "CLOSE";
};

export const getPharmacyStatusText = (
  pharmacie: Pharmacie
): { status: "OPEN" | "CLOSE"; text: string; color: string } => {
  const status = getPharmacyStatus(pharmacie);

  const statusMap = {
    OPEN: { text: "Відкрито", color: "text-green-500" },
    CLOSE: { text: "Закрито", color: "text-red-500" },
  };

  return {
    status,
    ...statusMap[status],
  };
};
