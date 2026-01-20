"use client";

import { useEffect, useState } from "react";
import Header from "./components/layout/header";
import FlightSearchCard from "./components/layout/FlightSearchCard";
import FlightsResultSection from "./components/layout/FlightsResultSection";

import type { LocationOption } from "@/app/types/location.types";
import type { FlightOffer, Dictionaries } from "@/app/types/flights.types";
import type {
  AirlineFilterType,
  ArrivalTimeFilter,
  DepartureTimeFilter,
  StopsFilterType,
} from "@/app/types/filters.types";
import { getDepartureHour } from "@/lib/getDepartureHour";
import { getArrivalHour } from "@/lib/getArrivalHour";
import { applyAllFilters } from "@/lib/filters";

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

  const [totalFlights, setTotalFlights] = useState<number | null>(null);

  const [departureTime, setDepartureTime] =
    useState<DepartureTimeFilter>("all");

  const [arrivalTime, setArrivalTime] = useState<ArrivalTimeFilter>("all");

  const [airlines, setAirlines] = useState<AirlineFilterType>([]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [priceBounds, setPriceBounds] = useState<[number, number]>([0, 0]);

  

  useEffect(() => {
    if (!hasSearched) return;

    const filtered = applyAllFilters(allFlights, {
    stops: stopsFilter,
    departureTime,
    arrivalTime,
    airlines,
    priceRange,
  });

    setFlights(filtered);
    setPage(1);
  }, [
    allFlights,
    hasSearched,
    stopsFilter,
    departureTime,
    arrivalTime,
    priceRange,
    airlines
  ]);

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
      setArrivalTime("all");
      setDepartureTime("all");
      setAirlines([]);

      const query = new URLSearchParams({
        origin: params.from.iataCode,
        destination: params.to.iataCode,
        date: params.departureDate.toISOString().split("T")[0],
        currencyCode: "USD",
      });

      const res = await fetch(`/api/flights?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch flights");

      const data: FlightResponse = await res.json();

      const prices = data.data
        .map((f) => Number(f.price?.total))
        .filter((p) => !Number.isNaN(p));

      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setPriceBounds([min, max]);
      setPriceRange([min, max]);

      setAllFlights(data.data);
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

      <main className="m-auto max-w-[1200px] bg-[#edebeb] px-3 pt-16 sm:pt-24">
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
          departureTime={departureTime}
          onDepartureTimeChange={setDepartureTime}
          arrivalTime={arrivalTime}
          onArrivalTimeChange={setArrivalTime}
          airlines={airlines}
          onAirlinesChange={setAirlines}
          priceRange={priceRange}
          priceBounds={priceBounds}
          onPriceRangeChange={setPriceRange}
        />
      </main>
    </div>
  );
}
