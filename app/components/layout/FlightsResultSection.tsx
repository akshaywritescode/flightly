"use client";

import FlightResultCard from "./FlightResultCard";
import formatFlightDateTime from "@/lib/formatFlightDateTime";
import type { FlightOffer, Dictionaries } from "@/app/types/flights.types";
import { getMealInfo } from "@/lib/hasMeal";
import { parseISODuration } from "@/lib/parseDuration";
import NothingHere from "../ui/NothingHere";
import WelcomeState from "../ui/WelcomeIllustration";
import FlightLoading from "../ui/FlightLoading";
import FilterCard from "./FilterCard";
import { PaginationComponent } from "../ui/FlightsResultSection/Pagination";
import { StopsFilterType } from "@/app/types/filters.types";

type FlightsResultSectionProps = {
  flights: FlightOffer[];
  dictionaries?: Dictionaries;
  loading: boolean;
  error: string | null;
  fromCity?: string;
  toCity?: string;
  hasSearched: boolean;
  totalFlights: number | null;
  page: number;
  onPageChange: (page: number) => void;
  stops: StopsFilterType;
  onStopsChange: (value: StopsFilterType) => void;
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
  page,
  onPageChange,
  stops,
  onStopsChange,
}: FlightsResultSectionProps) {
  if (!hasSearched) {
    return <WelcomeState />;
  }

  if (loading) return <FlightLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(flights.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedFlights = flights.slice(startIndex, endIndex);
  const filteredCount = flights.length;
  const totalCount = totalFlights ?? filteredCount;
  const isFiltered = filteredCount !== totalCount;

  return (
    <section className="mt-20 w-full">
      <div className="ml-1 mb-3">
        <h1 className="font-semibold">All Available Flights</h1>

        <p className="text-xs text-black/60">
          {isFiltered ? (
            <>
              <span className="font-medium text-black">{filteredCount}</span> of{" "}
              <span className="font-medium text-black">{totalCount}</span>{" "}
              flights shown
            </>
          ) : (
            <>
              <span className="font-medium text-black">{totalCount}</span>{" "}
              flights found
            </>
          )}
        </p>
      </div>
      <div className="flex gap-3 w-full">
        <div className="w-[75%]">
          {flights.length === 0 ? (
            <NothingHere />
          ) : (
            <>
              <ul className="space-y-4 h-screen overflow-y-scroll thin-scrollbar">
                {paginatedFlights.map((flight, index) => {
                  const segments = flight.itineraries?.[0]?.segments ?? [];
                  if (!segments.length) return null;

                  const dep = segments[0];
                  const arr = segments[segments.length - 1];

                  const mealInfo = getMealInfo(flight);
                  const firstSegment = segments[0];
                  const carrierCode = firstSegment.carrierCode;
                  const carrierName =
                    dictionaries?.carriers?.[carrierCode] ?? carrierCode;
                  const flightNumber = `${carrierCode}${firstSegment.number}`;
                  const itineraryDuration = flight.itineraries?.[0]?.duration;

                  const { hours, minutes } =
                    parseISODuration(itineraryDuration);

                  const stopsCount = segments.length - 1;
                  const viaCities =
                    stopsCount > 0
                      ? segments
                          .slice(0, -1)
                          .map(
                            (seg) =>
                              dictionaries?.locations?.[seg.arrival.iataCode]
                                ?.cityCode ?? seg.arrival.iataCode
                          )
                      : [];

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
                      stops={{
                        count: stopsCount,
                        via: viaCities,
                      }}
                    />
                  );
                })}
              </ul>

              <div className="py-6">
                <PaginationComponent
                  page={page}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </>
          )}
        </div>
        <FilterCard
          fromCity={fromCity}
          toCity={toCity}
          stops={stops}
          onStopsChange={onStopsChange}
        />
      </div>
    </section>
  );
}
