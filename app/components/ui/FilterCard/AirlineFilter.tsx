import { useState } from "react";
import { Dictionaries } from "@/app/types/flights.types";
import Image from "next/image";

type AirlineFilterProps = {
  airlines: string[];
  onChange: (v: string[]) => void;
  dictionaries?: Dictionaries;
};

const VISIBLE_COUNT = 6;

export default function AirlineFilter({
  airlines,
  onChange,
  dictionaries,
}: AirlineFilterProps) {
  const [expanded, setExpanded] = useState(false);

  if (!dictionaries?.carriers) return null;

  const carrierEntries = Object.entries(dictionaries.carriers);

  const visibleCarriers = expanded
    ? carrierEntries
    : carrierEntries.slice(0, VISIBLE_COUNT);

  function toggle(code: string) {
    if (airlines.includes(code)) {
      onChange(airlines.filter((a) => a !== code));
    } else {
      onChange([...airlines, code]);
    }
  }

  return (
    <div className="mt-4">
      <h2 className="text-sm font-medium mb-2">Airlines</h2>

      <div className="space-y-3">
        {visibleCarriers.map(([code, name]) => (
          <label key={code} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={airlines.includes(code)}
              onChange={() => toggle(code)}
            />

            <Image
              src={`https://images.ixigo.com/img/common-resources/airline-new/${code}.png`}
              alt={name}
              width={27}
              height={27}
              unoptimized
              quality={100}
            />

            <span className="text-xs">{name}</span>
          </label>
        ))}
      </div>

      {/* Show more / less */}
      {carrierEntries.length > VISIBLE_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="mt-2 text-xs text-blue-600 hover:underline"
        >
          {expanded
            ? "Show less"
            : `Show ${carrierEntries.length - VISIBLE_COUNT} more`}
        </button>
      )}
    </div>
  );
}
