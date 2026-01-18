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
import { Button } from "@/components/ui/button";

type FlightSearchCardProps = {
  onSearch: (params: {
    from: LocationOption;
    to: LocationOption;
    departureDate: Date;
    returnDate?: Date;
    tripType: "oneway" | "roundtrip";
  }) => void;
};


export default function FlightSearchCard({ onSearch }: FlightSearchCardProps) {

  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [fromLocation, setFromLocation] = useState<LocationOption | null>(null);
  const [toLocation, setToLocation] = useState<LocationOption | null>(null);

  const canSearch =
    fromLocation &&
    toLocation &&
    departureDate &&
    (tripType === "oneway" || returnDate);


  return (
    <Card className="rounded-xl p-6 flex flex-col gap-4">
      <div className="w-full flex justify-between">
        {/* Location Selection */}
        <div className="flex items-center gap-5">
          <FromLocationInput value={fromLocation} onChange={setFromLocation} />
          <ArrowLeftRight size={18} className="text-black/70" />
          <ToLocationInput value={toLocation} onChange={setToLocation} />
        </div>
        {/* Date Sleection */}
        <div className="flex gap-2">
          <DepartureDatePicker
            value={departureDate}
            onChange={(date) => {
              setDepartureDate(date);
              // if return date less than departure date
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
        {/* Tryp Type Selection */}
        <TripTypeSelector value={tripType} onChange={setTripType} />
        {/* Search flights button */}
        <SearchFlightBtn
        disabled={!canSearch}
        onClick={() => {
          if (!canSearch) return;

          onSearch({
            from: fromLocation!,
            to: toLocation!,
            departureDate,
            returnDate,
            tripType,
          });
        }}
      />
      </div>
    </Card>
  );
}
