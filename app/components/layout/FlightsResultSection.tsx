"use client";

import { useEffect, useState } from "react";
import FlightResultCard from "./FlightResultCard";
import formatFlightDateTime from "@/lib/formatFlightDateTime";
import type { FlightOffer, Dictionaries } from "@/app/types/flight-search.types";


export type FlightResponse = {
  data: FlightOffer[];
  dictionaries?: Dictionaries;
  meta?: {
    count: number;
  };
};


export default function FlightsResultSection() {
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFlights() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "/api/flights?origin=DEL&destination=BOM&date=2026-02-10&max=20&currencyCode=INR"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch flights");
        }

        const data: FlightResponse = await res.json();
        setFlights(data.data || []);
      } catch (err) {
        setError("Something went wrong while fetching flights");
      } finally {
        setLoading(false);
      }
    }

    fetchFlights();
  }, []);

  return (
    <section className="mt-6">
      {loading && <p>Loading flights…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && flights.length === 0 && <p>No flights found</p>}

      <ul className="space-y-4">
        {flights.map((flight, index) => {
          const segments = flight.itineraries?.[0]?.segments ?? [];

          const departureIataCode = segments[0]?.departure?.iataCode ?? "";

          const arrivalIataCode =
            segments[segments.length - 1]?.arrival?.iataCode ?? "";

          const departureAt = segments[0]?.departure?.at;
          const arrivalAt = segments[segments.length - 1]?.arrival?.at;

          const departureDateTime = formatFlightDateTime(departureAt);
          const arrivalDateTime = formatFlightDateTime(arrivalAt);

          return (
            <li key={index}>
              <FlightResultCard
                departureIataCode={departureIataCode}
                arrivalIataCode={arrivalIataCode}
                departureDateTime={departureDateTime}
                arrivalDateTime={arrivalDateTime}
                price={flight.price?.total}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
