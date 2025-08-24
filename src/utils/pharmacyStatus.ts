import { Pharmacie } from "@/types/pharmacies";

export const getPharmacyStatus = (
  pharmacie: Pharmacie
): "OPEN" | "CLOSE" | "OFFLINE" => {
  if (!pharmacie) {
    return "OFFLINE";
  }

  const openTime = pharmacie.openTime?.toString().trim();
  const closeTime = pharmacie.closeTime?.toString().trim();

  if (!openTime || !closeTime || openTime === "" || closeTime === "") {
    return "CLOSE";
  }

  try {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const parseTime = (
      timeString: string
    ): { hours: number; minutes: number } | null => {
      const cleaned = timeString.replace(/[^\d:]/g, "");

      const formats = [
        /^(\d{1,2}):(\d{2})$/,
        /^(\d{1,2})(\d{2})$/,
        /^(\d{1,2})$/,
      ];

      for (const format of formats) {
        const match = cleaned.match(format);
        if (match) {
          const hours = parseInt(match[1], 10);
          const minutes = match[2] ? parseInt(match[2], 10) : 0;

          if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
            return { hours, minutes };
          }
        }
      }

      return null;
    };

    const parsedOpenTime = parseTime(openTime);
    const parsedCloseTime = parseTime(closeTime);

    if (!parsedOpenTime || !parsedCloseTime) {
      return "CLOSE";
    }

    const openMinutes = parsedOpenTime.hours * 60 + parsedOpenTime.minutes;
    const closeMinutes = parsedCloseTime.hours * 60 + parsedCloseTime.minutes;

    if (openMinutes === 0 && closeMinutes === 0) {
      return "OPEN";
    }

    if (openMinutes === closeMinutes) {
      return "CLOSE";
    }

    if (openMinutes < closeMinutes) {
      return currentMinutes >= openMinutes && currentMinutes < closeMinutes
        ? "OPEN"
        : "CLOSE";
    } else {
      return currentMinutes >= openMinutes || currentMinutes < closeMinutes
        ? "OPEN"
        : "CLOSE";
    }
  } catch {
    return "CLOSE";
  }
};

export const getPharmacyStatusText = (
  pharmacie: Pharmacie
): { status: "OPEN" | "CLOSE" | "OFFLINE"; text: string; color: string } => {
  const status = getPharmacyStatus(pharmacie);

  const statusMap = {
    OPEN: { text: "Відкрито", color: "text-green-500" },
    CLOSE: { text: "Закрито", color: "text-red-500" },
    OFFLINE: { text: "Немає даних", color: "text-gray-600" },
  };

  return {
    status,
    ...statusMap[status],
  };
};
