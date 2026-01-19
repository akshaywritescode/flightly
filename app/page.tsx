"use client";

import { useEffect, useState } from "react";
import Header from "./components/layout/header";
import FlightSearchCard from "./components/layout/FlightSearchCard";
import FlightsResultSection from "./components/layout/FlightsResultSection";

import type { LocationOption } from "@/app/types/location.types";
import type { FlightOffer, Dictionaries } from "@/app/types/flights.types";

type FlightResponse = {
  data: FlightOffer[];
  dictionaries?: Dictionaries;
  meta?: {
    count: number;
  };
};

export default function Home() {
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [dictionaries, setDictionaries] = useState<Dictionaries | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromLocation, setFromLocation] = useState<LocationOption | null>(null);
  const [toLocation, setToLocation] = useState<LocationOption | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalFlights, setTotalFlights] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

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

      const query = new URLSearchParams({
        origin: params.from.iataCode,
        destination: params.to.iataCode,
        date: params.departureDate.toISOString().split("T")[0],
        currencyCode: "USD",
        max: "20",
      });

      const res = await fetch(`/api/flights?${query}`);
      if (!res.ok) throw new Error("Failed to fetch flights");

      const data: FlightResponse = await res.json();

      setFlights(data.data);
      setDictionaries(data.dictionaries);
      setTotalFlights(data.meta?.count ?? data.data.length);
    } catch (err) {
      setError(`Something went wrong while fetching flights ${err}`);
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
        />
      </main>
    </div>
  );
}
