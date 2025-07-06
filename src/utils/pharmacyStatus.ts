import { Pharmacie } from "@/types/pharmacies";

export const getPharmacyStatus = (
  pharmacie: Pharmacie
): "OPEN" | "CLOSE" | "DESTROYED" => {
  if (!pharmacie) {
    return "DESTROYED";
  }

  if (
    !pharmacie.openTime ||
    !pharmacie.closeTime ||
    pharmacie.openTime.trim() === "" ||
    pharmacie.closeTime.trim() === ""
  ) {
    return "DESTROYED";
  }

  try {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const openTimeParts = pharmacie.openTime.split(":");
    const closeTimeParts = pharmacie.closeTime.split(":");

    if (openTimeParts.length !== 2 || closeTimeParts.length !== 2) {
      return "DESTROYED";
    }

    const openHours = parseInt(openTimeParts[0], 10);
    const openMinutes = parseInt(openTimeParts[1], 10);
    const closeHours = parseInt(closeTimeParts[0], 10);
    const closeMinutes = parseInt(closeTimeParts[1], 10);

    if (
      isNaN(openHours) ||
      isNaN(openMinutes) ||
      isNaN(closeHours) ||
      isNaN(closeMinutes)
    ) {
      return "DESTROYED";
    }

    if (
      openHours < 0 ||
      openHours > 23 ||
      closeHours < 0 ||
      closeHours > 23 ||
      openMinutes < 0 ||
      openMinutes > 59 ||
      closeMinutes < 0 ||
      closeMinutes > 59
    ) {
      return "DESTROYED";
    }

    const openTime = openHours * 60 + openMinutes;
    const closeTime = closeHours * 60 + closeMinutes;

    if (openTime <= closeTime) {
      return currentMinutes >= openTime && currentMinutes <= closeTime
        ? "OPEN"
        : "CLOSE";
    } else {
      return currentMinutes >= openTime || currentMinutes <= closeTime
        ? "OPEN"
        : "CLOSE";
    }
  } catch (error) {
    console.error("Error calculating pharmacy status:", error);
    return "DESTROYED";
  }
};
