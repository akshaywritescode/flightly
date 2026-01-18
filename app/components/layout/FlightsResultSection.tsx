"use client";

import { useEffect, useState } from "react";
import FlightResultCard from "./FlightResultCard";
import formatFlightDateTime from "@/lib/formatFlightDateTime";
import type {
  FlightOffer,
  Dictionaries,
} from "@/app/types/flights.types";
import { getMealInfo } from "@/lib/hasMeal";


type FlightsResultSectionProps = {
  flights: FlightOffer[];
  dictionaries?: Dictionaries;
  loading: boolean;
  error: string | null;
};


export default function FlightsResultSection({
  flights,
  dictionaries,
  loading,
  error,
}: FlightsResultSectionProps) {
  if (loading) return <p>Loading flights…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!flights.length) return null;

  return (
    <section className="mt-20">
      <ul className="space-y-4">
        {flights.map((flight, index) => {
          const segments = flight.itineraries?.[0]?.segments ?? [];
          if (!segments.length) return null;

          const dep = segments[0];
          const arr = segments[segments.length - 1];
          const mealInfo = getMealInfo(flight);

          return (
            <FlightResultCard
              key={index}
              departureIataCode={dep.departure.iataCode}
              arrivalIataCode={arr.arrival.iataCode}
              departureDateTime={formatFlightDateTime(dep.departure.at)}
              arrivalDateTime={formatFlightDateTime(arr.arrival.at)}
              price={flight.price?.total}
              mealInfo={mealInfo}
            />
          );
        })}
      </ul>
    </section>
  );
}
