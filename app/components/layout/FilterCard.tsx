import { Card, CardContent } from "@/components/ui/card";
import StopsFilter from "../ui/FilterCard/StopsFilter";
import DepartureTimingFilter from "../ui/FilterCard/DepartureTimingFilter";
import ArrivalTimingFilter from "../ui/FilterCard/ArrivalTimingFilter";
import {
  ArrivalTimeFilter,
  DepartureTimeFilter,
  StopsFilterType,
} from "@/app/types/filters.types";

type FilterCardsProps = {
  fromCity?: string;
  toCity?: string;
  stops: StopsFilterType;
  onStopsChange: (value: StopsFilterType) => void;
  departureTime: DepartureTimeFilter;
  onDepartureTimeChange: (value: DepartureTimeFilter) => void;
  arrivalTime: ArrivalTimeFilter;
  onArrivalTimeChange: (value: ArrivalTimeFilter) => void;
  variant?: "sidebar" | "sheet";
};

export default function FilterCard({
  fromCity,
  toCity,
  stops,
  onStopsChange,
  departureTime,
  onDepartureTimeChange,
  arrivalTime,
  onArrivalTimeChange,
  variant,
}: FilterCardsProps) {
  return (
    <Card
  className={`
    flex flex-col
    ${variant === "sidebar"
      ? "hidden lg:flex w-[25%] p-4 items-center"
      : "w-full p-3 items-stretch rounded-none shadow-none"}
  `}
>
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-lg">Filters</h1>
        <p className="text-xs text-black/70">Reset</p>
      </div>

      {/* Content */}
      <CardContent className="p-0 flex flex-col gap-4">
        {/* Stops Filter */}
        <StopsFilter value={stops} onChange={onStopsChange} />

        {/* Departure Time Filter */}
        <DepartureTimingFilter
          fromCity={fromCity}
          value={departureTime}
          onChange={onDepartureTimeChange}
        />

        {/* Arrival Filter */}
        <ArrivalTimingFilter
          toCity={toCity}
          value={arrivalTime}
          onChange={onArrivalTimeChange}
        />
      </CardContent>
    </Card>
  );
}
