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
import {
  ArrivalTimeFilter,
  DepartureTimeFilter,
  StopsFilterType,
} from "@/app/types/filters.types";
import { Settings2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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
  departureTime: DepartureTimeFilter;
  onDepartureTimeChange: (v: DepartureTimeFilter) => void;
  arrivalTime: ArrivalTimeFilter;
  onArrivalTimeChange: (v: ArrivalTimeFilter) => void;
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
  departureTime,
  onDepartureTimeChange,
  arrivalTime,
  onArrivalTimeChange,
}: FlightsResultSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <>
      <section className="mt-20 w-full">
        <div className="ml-1 mb-3 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-semibold text-base sm:text-lg">
              All Available Flights
            </h1>

            <p className="text-xs text-black/60">
              {isFiltered ? (
                <>
                  <span className="font-medium text-black">
                    {filteredCount}
                  </span>{" "}
                  of{" "}
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
          {/* when 1024px hits appears */}
          {/* Mobile / Tablet filter button */}
          <Badge
            variant="outline"
            className="border border-black cursor-pointer lg:hidden mr-3"
            onClick={() => setIsFilterOpen(true)}
          >
            <Settings2Icon size={13} />
            <span className="text-[0.7rem] font-medium ml-1">Filter</span>
          </Badge>
        </div>
        <div className="flex gap-3 w-full">
          {/* take full width when 1024 hits */}
          <div className="w-full lg:w-[75%]">
            {flights.length === 0 ? (
              <NothingHere />
            ) : (
              <>
                <ul className="space-y-4 max-h-[calc(100vh-12rem)] lg:h-screen overflow-y-auto thin-scrollbar">
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
                        departureDateTime={formatFlightDateTime(
                          dep.departure.at
                        )}
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
          {/* made filter card disappear when 1024hits */}
          <FilterCard
            fromCity={fromCity}
            toCity={toCity}
            stops={stops}
            onStopsChange={onStopsChange}
            departureTime={departureTime}
            onDepartureTimeChange={onDepartureTimeChange}
            arrivalTime={arrivalTime}
            onArrivalTimeChange={onArrivalTimeChange}
          />
        </div>
      </section>
      {/* Mobile Filter Overlay */}
{isFilterOpen && (
  <div className="fixed inset-0 z-50 lg:hidden">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setIsFilterOpen(false)}
    />

    {/* Bottom Sheet */}
    <div
  className="
    fixed bottom-0 left-0 right-0
    bg-white rounded-t-2xl
    max-h-[85vh] overflow-y-auto
    p-4
    z-50
    animate-slide-up
  "
>
      {/* Handle */}
      <div className="flex justify-center mb-3">
        <div className="h-1.5 w-12 rounded-full bg-black/20" />
      </div>

      <FilterCard
        fromCity={fromCity}
        toCity={toCity}
        stops={stops}
        onStopsChange={(v) => {
          onStopsChange(v);
          setIsFilterOpen(false);
        }}
        departureTime={departureTime}
        onDepartureTimeChange={(v) => {
          onDepartureTimeChange(v);
          setIsFilterOpen(false);
        }}
        arrivalTime={arrivalTime}
        onArrivalTimeChange={(v) => {
          onArrivalTimeChange(v);
          setIsFilterOpen(false);
        }}
      />
    </div>
  </div>
)}
    </>
  );
}
