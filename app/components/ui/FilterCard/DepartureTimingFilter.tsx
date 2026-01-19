import { Sun, SunDim, SunMoon, Sunrise } from "lucide-react";
import type { DepartureTimeFilter } from "@/app/types/filters.types";

type DepartureTimingFilterProps = {
  fromCity?: string;
  value: DepartureTimeFilter;
  onChange: (value: DepartureTimeFilter) => void;
};

export default function DepartureTimingFilter({
  fromCity,
  value,
  onChange,
}: DepartureTimingFilterProps) {
  const base =
    "flex flex-col justify-center items-center gap-1 border w-20 h-20 rounded-lg cursor-pointer transition";

  const active = "border-blue-600 bg-blue-50 text-blue-700";
  const inactive = "border-black/30 hover:border-black/60";

  return (
    <div className="mt-5">
      <h2 className="text-[0.8rem] mb-2 font-medium -ml-2">
        Departure from {fromCity}
      </h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <div
          className={`${base} ${
            value === "before6am" ? active : inactive
          }`}
          onClick={() => onChange("before6am")}
        >
          <Sunrise className="w-5 h-5" />
          <span className="text-[0.65rem]">Before 6AM</span>
        </div>

        <div
          className={`${base} ${value === "6to12" ? active : inactive}`}
          onClick={() => onChange("6to12")}
        >
          <Sun className="w-5 h-5" />
          <span className="text-[0.65rem]">6AM – 12PM</span>
        </div>

        <div
          className={`${base} ${value === "12to6" ? active : inactive}`}
          onClick={() => onChange("12to6")}
        >
          <SunDim className="w-5 h-5" />
          <span className="text-[0.65rem]">12PM – 6PM</span>
        </div>

        <div
          className={`${base} ${value === "after6pm" ? active : inactive}`}
          onClick={() => onChange("after6pm")}
        >
          <SunMoon className="w-5 h-5" />
          <span className="text-[0.65rem]">After 6PM</span>
        </div>
      </div>
    </div>
  );
}
