"use client";

import { Card } from "@/components/ui/card";
import { FromLocationInput } from "../ui/FlightSearchCard/FromLocationInput";
import { ToLocationInput } from "../ui/FlightSearchCard/ToLocationInput";
import { ArrowLeftRight } from "lucide-react";
import SearchFlightBtn from "../ui/Header/SearchFlightBtn";
import { TripTypeSelector } from "../ui/FlightSearchCard/TripTypeSwitcher";
import { DepartureDatePicker } from "../ui/FlightSearchCard/DepartureDatePicker";
import { ReturnDatePicker } from "../ui/FlightSearchCard/ReturnDatePicker";
import { useState } from "react";
import { LocationOption } from "@/app/types/location.types";

type FlightSearchCardProps = {
  onSearch: (params: {
    from: LocationOption;
    to: LocationOption;
    departureDate: Date;
    returnDate?: Date;
    tripType: "oneway" | "roundtrip";
  }) => void;

  fromLocation: LocationOption | null;
  toLocation: LocationOption | null;
  onFromChange: (loc: LocationOption | null) => void;
  onToChange: (loc: LocationOption | null) => void;
};

export default function FlightSearchCard({
  onSearch,
  fromLocation,
  toLocation,
  onFromChange,
  onToChange,
}: FlightSearchCardProps) {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();

  const canSearch =
    fromLocation &&
    toLocation &&
    departureDate &&
    (tripType === "oneway" || returnDate);

  return (
    <Card className="rounded-xl p-6 flex flex-col gap-4 mt-6">
      <div className="block sm:hidden">
        <TripTypeSelector value={tripType} onChange={setTripType} />
      </div>

      <div className="w-full flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-3 sm:gap-5">
          <FromLocationInput value={fromLocation} onChange={onFromChange} />
          <ArrowLeftRight  className="text-black/70 w-6 h-6 sm:w-5 sm:h-6" />
          <ToLocationInput value={toLocation} onChange={onToChange} />
        </div>

        <div className="flex gap-2 justify-between sm:justify-start">
          <DepartureDatePicker
            value={departureDate}
            onChange={(date) => {
              setDepartureDate(date);
              if (returnDate && date && returnDate < date) {
                setReturnDate(undefined);
              }
            }}
          />

          <ReturnDatePicker
            value={returnDate}
            onChange={setReturnDate}
            tripType={tripType}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="hidden sm:flex">
          <TripTypeSelector value={tripType} onChange={setTripType} />
        </div>

        <SearchFlightBtn
          disabled={!canSearch}
          onClick={() => {
            if (!canSearch) return;

            onSearch({
              from: fromLocation!,
              to: toLocation!,
              departureDate: departureDate!,
              returnDate,
              tripType,
            });
          }}
        />
      </div>
    </Card>
  );
}
