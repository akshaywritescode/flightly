"use client";

import FlightResultCard from "./FlightResultCard";
import formatFlightDateTime from "@/lib/formatFlightDateTime";
import type { FlightOffer, Dictionaries } from "@/app/types/flights.types";
import { getMealInfo } from "@/lib/hasMeal";
import { parseISODuration } from "@/lib/parseDuration";
import NothingHere from "../ui/NothingHere";
import WelcomeState from "../ui/WelcomeIllustration";
import FlightLoading from "../ui/FlightLoading";

type FlightsResultSectionProps = {
  flights: FlightOffer[];
  dictionaries?: Dictionaries;
  loading: boolean;
  error: string | null;
  fromCity?: string;
  toCity?: string;
  hasSearched: boolean;
  totalFlights: number | null;
};

export default function FlightsResultSection({
  flights,
  dictionaries,
  loading,
  error,
  fromCity,
  toCity,
  hasSearched,
  totalFlights,
}: FlightsResultSectionProps) {
  if (loading) return <FlightLoading />;
  if (error) return <p className="text-red-500">{error}</p>;
  //if no flights found
  if (hasSearched && !flights.length) {
    return <NothingHere />;
  }

  if (!hasSearched) {
    return <WelcomeState />;
  }

  return (
    <section className="mt-20">
      <div className="ml-1 mb-3">
        <h1 className="font-semibold">All Available Flights</h1>
        <p className="text-xs text-black/60">
          {totalFlights
            ? `${totalFlights} flights found`
            : `${flights.length} flights`}
        </p>
      </div>
      <ul className="space-y-4">
        {flights.map((flight, index) => {
          const segments = flight.itineraries?.[0]?.segments ?? [];
          if (!segments.length) return null;

          const dep = segments[0];
          const arr = segments[segments.length - 1];
          const mealInfo = getMealInfo(flight);
          const firstSegment = segments[0];
          const carrierCode = firstSegment.carrierCode; // "AI"
          const carrierName =
            dictionaries?.carriers?.[carrierCode] ?? carrierCode;
          const flightNumber = `${carrierCode}${firstSegment.number}`; // "AI2429"
          const itineraryDuration = flight.itineraries?.[0]?.duration; // "PT2H15M"

          const { hours, minutes } = parseISODuration(itineraryDuration);

          return (
            <FlightResultCard
              key={index}
              departureIataCode={dep.departure.iataCode}
              arrivalIataCode={arr.arrival.iataCode}
              departureDateTime={formatFlightDateTime(dep.departure.at)}
              arrivalDateTime={formatFlightDateTime(arr.arrival.at)}
              departureCity={fromCity ?? dep.departure.iataCode}
              arrivalCity={toCity ?? arr.arrival.iataCode}
              price={flight.price?.total}
              mealInfo={mealInfo}
              carrierCode={carrierCode}
              carrierName={carrierName}
              flightNumber={flightNumber}
              durationH={hours}
              durationM={minutes}
            />
          );
        })}
      </ul>
    </section>
  );
}
