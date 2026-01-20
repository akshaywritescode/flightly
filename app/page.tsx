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

  function applyDepartureTimeFilter(
    flights: FlightOffer[],
    filter: DepartureTimeFilter,
  ) {
    if (filter === "all") return flights;

    return flights.filter((flight) => {
      const hour = getDepartureHour(flight);
      if (hour === null) return false;

      switch (filter) {
        case "before6am":
          return hour < 6;
        case "6to12":
          return hour >= 6 && hour < 12;
        case "12to6":
          return hour >= 12 && hour < 18;
        case "after6pm":
          return hour >= 18;
        default:
          return true;
      }
    });
  }

  function applyArrivalTimeFilter(
    flights: FlightOffer[],
    filter: ArrivalTimeFilter,
  ) {
    if (filter === "all") return flights;

    return flights.filter((flight) => {
      const hour = getArrivalHour(flight);
      if (hour === null) return false;

      switch (filter) {
        case "before6am":
          return hour < 6;
        case "6to12":
          return hour >= 6 && hour < 12;
        case "12to6":
          return hour >= 12 && hour < 18;
        case "after6pm":
          return hour >= 18;
        default:
          return true;
      }
    });
  }

  function applyAirlineFilter(flights: FlightOffer[], airlines: string[]) {
    if (!airlines.length) return flights;

    return flights.filter((flight) => {
      const carrierCode = flight.itineraries?.[0]?.segments?.[0]?.carrierCode;
      return airlines.includes(carrierCode);
    });
  }

  useEffect(() => {
    if (!hasSearched) return;

    let filtered = allFlights;

    filtered = applyStopsFilter(allFlights, stopsFilter);
    filtered = applyAirlineFilter(filtered, airlines);
    filtered = applyDepartureTimeFilter(filtered, departureTime);
    filtered = applyArrivalTimeFilter(filtered, arrivalTime);

    setFlights(filtered);
    setPage(1);
  }, [
    stopsFilter,
    airlines,
    departureTime,
    arrivalTime,
    allFlights,
    hasSearched,
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
        />
      </main>
    </div>
  );
}
