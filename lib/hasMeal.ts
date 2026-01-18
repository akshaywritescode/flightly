import type { FlightOffer } from "@/app/types/flights.types";

export function getMealInfo(flight: FlightOffer) {
  const traveler = flight.travelerPricings?.[0];
  if (!traveler) return { hasMeal: false, isFree: false };

  for (const fare of traveler.fareDetailsBySegment ?? []) {
    const mealAmenity = fare.amenities?.find(
      (a) => a.amenityType === "MEAL"
    );

    if (mealAmenity) {
      return {
        hasMeal: true,
        isFree: !mealAmenity.isChargeable,
      };
    }
  }

  return { hasMeal: false, isFree: false };
}