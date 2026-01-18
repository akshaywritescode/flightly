"use client";

import { Card } from "@/components/ui/card";
import { FromLocationInput } from "../ui/FromLocationInput";
import { ToLocationInput } from "../ui/ToLocationInput";
import { ArrowLeftRight } from "lucide-react";
import SearchFlightBtn from "../ui/SearchFlightBtn";
import { TripTypeSelector } from "../ui/TripTypeSwitcher";
import { DepartureDatePicker } from "../ui/DepartureDatePicker";
import { ReturnDatePicker } from "../ui/ReturnDatePicker";
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
    <Card className="rounded-xl p-6 flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-5">
          <FromLocationInput value={fromLocation} onChange={onFromChange} />
          <ArrowLeftRight size={18} className="text-black/70" />
          <ToLocationInput value={toLocation} onChange={onToChange} />
        </div>

        <div className="flex gap-2">
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
        <TripTypeSelector value={tripType} onChange={setTripType} />

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
