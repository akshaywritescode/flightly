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

const currencies = [
  { value: "USD", symbol: "$" },
  { value: "EUR", symbol: "€" },
  { value: "GBP", symbol: "£" },
  { value: "INR", symbol: "₹" },
  { value: "JPY", symbol: "¥" },
  { value: "CNY", symbol: "¥" },
  { value: "AUD", symbol: "A$" },
  { value: "CAD", symbol: "C$" },
  { value: "CHF", symbol: "CHF" },
  { value: "SGD", symbol: "S$" },
  { value: "HKD", symbol: "HK$" },
  { value: "NZD", symbol: "NZ$" },
  { value: "SEK", symbol: "kr" },
  { value: "NOK", symbol: "kr" },
  { value: "DKK", symbol: "kr" },
  { value: "ZAR", symbol: "R" },
  { value: "BRL", symbol: "R$" },
  { value: "MXN", symbol: "MX$" },
  { value: "RUB", symbol: "₽" },
  { value: "TRY", symbol: "₺" },
  { value: "KRW", symbol: "₩" },
  { value: "THB", symbol: "฿" },
  { value: "MYR", symbol: "RM" },
  { value: "IDR", symbol: "Rp" },
  { value: "PHP", symbol: "₱" },
  { value: "AED", symbol: "د.إ" },
  { value: "SAR", symbol: "﷼" },
  { value: "ILS", symbol: "₪" },
  { value: "PLN", symbol: "zł" },
  { value: "CZK", symbol: "Kč" },
];

export function CurrencySwitcher() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("USD"); // default

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[120px] justify-between"
        >
          {value
            ? (() => {
                const c = currencies.find((c) => c.value === value);
                return `${c?.symbol} ${c?.value}`;
              })()
            : "Select currency"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.value}
                  value={currency.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {currency.symbol} {currency.value}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === currency.value ? "opacity-100" : "opacity-0"
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
