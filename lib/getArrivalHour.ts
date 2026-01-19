import { FlightOffer } from "@/app/types/flights.types";

export function getArrivalHour(flight: FlightOffer) {
  const segments = flight.itineraries?.[0]?.segments;
  if (!segments || !segments.length) return null;

  const lastSegment = segments[segments.length - 1];
  return new Date(lastSegment.arrival.at).getHours();
}
