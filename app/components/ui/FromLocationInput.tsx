"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { PlaneTakeoff } from "lucide-react";

const suggestedAirports = [
  { value: "DEL - New Delhi, India" },
  { value: "BOM - Mumbai, India" },
  { value: "BLR - Bengaluru, India" },
  { value: "HYD - Hyderabad, India" },
  { value: "MAA - Chennai, India" },
  { value: "CCU - Kolkata, India" },
  { value: "DXB - Dubai, UAE" },
  { value: "LHR - London Heathrow, UK" },
  { value: "JFK - New York JFK, USA" },
  { value: "SIN - Singapore Changi, Singapore" },
];

export function FromLocationInput() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("BOM - Mumbai, India");

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
                return <div className="flex gap-4"><PlaneTakeoff /> {c?.value}</div>
              })()
            : "From"}
          <ChevronsUpDown className="opacity-50" />
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
                 <div className="flex gap-4"><PlaneTakeoff /> {airport.value}</div> 
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
