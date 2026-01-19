"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./components/layout/header";
import FlightSearchCard from "./components/layout/FlightSearchCard";
import FlightsResultSection from "./components/layout/FlightsResultSection";

import type { LocationOption } from "@/app/types/location.types";
import type { FlightOffer, Dictionaries } from "@/app/types/flights.types";
import type { StopsFilterType } from "@/app/types/filters.types";

type FlightResponse = {
  data: FlightOffer[];
  dictionaries?: Dictionaries;
  meta?: {
    count: number;
  };
};

export default function Home() {
  const [allFlights, setAllFlights] = useState<FlightOffer[]>([]);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [dictionaries, setDictionaries] = useState<Dictionaries | undefined>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [fromLocation, setFromLocation] = useState<LocationOption | null>(null);
  const [toLocation, setToLocation] = useState<LocationOption | null>(null);

  const [stopsFilter, setStopsFilter] = useState<StopsFilterType>("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  const [totalFlights, setTotalFlights] = useState<number | null>(null);

  function applyStopsFilter(flights: FlightOffer[], filter: StopsFilterType) {
    if (!filter || filter === "all") return flights;

    return flights.filter((flight) => {
      const segments = flight.itineraries?.[0]?.segments ?? [];
      const stops = Math.max(segments.length - 1, 0);

      switch (filter) {
        case "nonstop":
          return stops === 0;
        case "1stop":
          return stops === 1;
        case "2plus":
          return stops >= 2;
        default:
          return true;
      }
    });
  }

  useEffect(() => {
    if (!hasSearched) return;

    const filtered = applyStopsFilter(allFlights, stopsFilter);
    setFlights(filtered);
    setPage(1);
  }, [stopsFilter, allFlights, hasSearched]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const list = document.querySelector(".thin-scrollbar");
    list?.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  async function handleSearch(params: {
    from: LocationOption;
    to: LocationOption;
    departureDate: Date;
    returnDate?: Date;
    tripType: "oneway" | "roundtrip";
  }) {
    try {
      setHasSearched(true);
      setLoading(true);
      setError(null);
      setPage(1);
      setStopsFilter("all");

      const query = new URLSearchParams({
        origin: params.from.iataCode,
        destination: params.to.iataCode,
        date: params.departureDate.toISOString().split("T")[0],
        currencyCode: "USD",
      });

      const res = await fetch(`/api/flights?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch flights");

      const data: FlightResponse = await res.json();

      setAllFlights(data.data);
      setFlights(data.data);
      setDictionaries(data.dictionaries);
      setTotalFlights(data.meta?.count ?? data.data.length);
    } catch (err) {
      setError("Something went wrong while fetching flights");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-auto">
      <Header />

      <main className="m-auto min-h-screen max-w-[1200px] bg-[#edebeb] px-10 pt-24">
        <FlightSearchCard
          onSearch={handleSearch}
          fromLocation={fromLocation}
          toLocation={toLocation}
          onFromChange={setFromLocation}
          onToChange={setToLocation}
        />

        <FlightsResultSection
          flights={flights}
          dictionaries={dictionaries}
          loading={loading}
          error={error}
          fromCity={fromLocation?.city}
          toCity={toLocation?.city}
          hasSearched={hasSearched}
          totalFlights={totalFlights}
          page={page}
          onPageChange={setPage}
          stops={stopsFilter}
          onStopsChange={setStopsFilter}
        />
      </main>
    </div>
  );
}
