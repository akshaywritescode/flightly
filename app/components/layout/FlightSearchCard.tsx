"use client"

import { Card } from "@/components/ui/card";
import { FromLocationInput } from "../ui/FromLocationInput";
import { ToLocationInput } from "../ui/ToLocationInput";
import { ArrowLeftRight } from "lucide-react";
import SearchFlightBtn from "../ui/SearchFlightBtn";
import { TripTypeSelector } from "../ui/TripTypeSwitcher";
import { DepartureDatePicker } from "../ui/DepartureDatePicker";
import { ReturnDatePicker } from "../ui/ReturnDatePicker";
import { useState } from "react";

export default function FlightSearchCard() {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway")
  
  console.log(tripType)

  return (
    <Card className="rounded-xl p-6 flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-5">
          <FromLocationInput />
          <ArrowLeftRight size={18} className="text-black/70" />
          <ToLocationInput />
        </div>
        <div className="flex gap-2">
          <DepartureDatePicker />
          <ReturnDatePicker />
        </div>
      </div>
      <div className="flex justify-between">
        <TripTypeSelector
          value={tripType}
          onChange={setTripType}
        />
        <SearchFlightBtn />
      </div>
    </Card>
  );
}
