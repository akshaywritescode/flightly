import { FlightOffer } from "@/app/types/flights.types";

export function getDepartureHour(flight: FlightOffer) {
  const segment = flight.itineraries?.[0]?.segments?.[0];
  if (!segment) return null;

  return new Date(segment.departure.at).getHours();
}
