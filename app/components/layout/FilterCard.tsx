import { Card, CardContent} from "@/components/ui/card";
import StopsFilter from "../ui/FilterCard/StopsFilter";
import DepartureTimingFilter from "../ui/FilterCard/DepartureTimingFilter";
import ArrivalTimingFilter from "../ui/FilterCard/ArrivalTimingFilter";
import { StopsFilterType } from "@/app/types/filters.types";

type FilterCardsProps = {
  fromCity?: string;
  toCity?: string;
  stops: StopsFilterType;
  onStopsChange: (value: StopsFilterType) => void;
};

export default function FilterCard({
  fromCity,
  toCity,
  stops,
  onStopsChange,
}: FilterCardsProps) {
  return (
    <Card className="w-[25%] p-4 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-lg">Filters</h1>
        <p className="text-xs text-black/70">Reset</p>
      </div>

      {/* Content */}
      <CardContent className="p-0 flex flex-col">
        {/* Stops Filter */}
        <StopsFilter value={stops} onChange={onStopsChange} />

        {/* Departure Time Filter */}
        <DepartureTimingFilter fromCity={fromCity} />

        {/* Arrival Filter */}
        <ArrivalTimingFilter toCity={toCity} />
      </CardContent>
    </Card>
  );
}
