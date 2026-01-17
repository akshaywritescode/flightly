"use client";

import * as React from "react";
import { Check, PlaneTakeoff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const suggestedAirports = [
  { displayName: "DEL - New Delhi, India", value: "DEL" },
  { displayName: "BOM - Mumbai, India", value: "BOM" },
  { displayName: "BLR - Bengaluru, India", value: "BLR" },
  { displayName: "HYD - Hyderabad, India", value: "HYD" },
  { displayName: "MAA - Chennai, India", value: "MAA" },
  { displayName: "CCU - Kolkata, India", value: "CCU" },
  { displayName: "DXB - Dubai, UAE", value: "DXB" },
  { displayName: "LHR - London Heathrow, UK" , value: "LHR"},
  { displayName: "JFK - New York JFK, USA", value: "JFK" },
  { displayName: "SIN - Singapore Changi, Singapore", value: "SIN" },
];

export function FromLocationInput() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("BOM");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[230px] justify-between"
        >
          {value
            ? (() => {
                const c = suggestedAirports.find((c) => c.value === value);
                return <div className="flex gap-4 text-xs"><PlaneTakeoff /> {c?.displayName}</div>
              })()
            : "From"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search Airports, Location..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {suggestedAirports.map((airport) => (
                <CommandItem
                  key={airport.value}
                  value={airport.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                 <div className="flex gap-4 text-xs"><PlaneTakeoff /> {airport.displayName}</div> 
                  <Check
                    className={cn(
                      "ml-auto",
                      value === airport.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
