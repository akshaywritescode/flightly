"use client";

import * as React from "react";
import { Check, PlaneLanding } from "lucide-react";

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

import { AmadeusLocation, LocationOption } from "@/app/types/location.types";

type ToLocationInputProps = {
  value: LocationOption | null;
  onChange: (location: LocationOption) => void;
};

export function ToLocationInput({
  value,
  onChange,
}: ToLocationInputProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<LocationOption[]>([]);
  const [loading, setLoading] = React.useState(false);

  // 🔹 Fetch suggestions (debounced)
  React.useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      const res = await fetch(`/api/locations?q=${query}`);
      const json = await res.json();

      const normalized: LocationOption[] = json.data.map((item: AmadeusLocation) => ({
        iataCode: item.iataCode,
        airport: item.subType === "AIRPORT" ? item.name : undefined,
        city: item.address?.cityName,
        country: item.address?.countryName,
        type: item.subType,
      }));

      setSuggestions(normalized);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[230px] justify-between overflow-hidden"
        >
          {value ? (
            <div className="flex gap-3 text-xs">
              <PlaneLanding />
              {value.iataCode} – {value.city}, {value.country}
            </div>
          ) : (
            "To"
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput
            placeholder="Search city or iata code..."
            onValueChange={(v) => {
              setQuery(v);
              setOpen(true);
            }}
          />

          <CommandList>
            {loading && (
              <div className="p-2 text-xs text-muted-foreground">
                Searching…
              </div>
            )}

            <CommandEmpty>No locations found.</CommandEmpty>

            <CommandGroup>
              {suggestions.map((s) => (
                <CommandItem
                  key={`${s.iataCode}-${s.type}`}
                  value={`${s.iataCode} ${s.city} ${s.country}`}
                  onSelect={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                >
                  <div className="flex gap-4 text-xs">
                    <div className="w-10 h-10 border rounded-md flex items-center justify-center font-semibold">
                      {s.iataCode}
                    </div>

                    <div className="flex flex-col">
                      <div className="text-sm">
                        {s.city}, {s.country}
                      </div>
                      {s.airport && (
                        <span className="text-[0.6rem]">
                          {s.airport}
                        </span>
                      )}
                    </div>
                  </div>

                  <Check
                    className={cn(
                      "ml-auto",
                      value?.iataCode === s.iataCode &&
                        value?.type === s.type
                        ? "opacity-100"
                        : "opacity-0"
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
