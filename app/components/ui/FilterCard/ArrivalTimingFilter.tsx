import { Sun, SunDim, SunMoon, Sunrise } from "lucide-react";

type ArrivalFilterProps = {
  toCity: string | undefined;
};

export default function ArrivalTimingFilter({toCity}: ArrivalFilterProps) {
  return (
    <div className="mt-5">
      <h2 className="text-[0.8rem] mb-2 font-medium -ml-2">
        Departure from {toCity}
      </h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        <div className="flex flex-col justify-center items-center gap-1 border border-black/30 w-20 h-20 rounded-lg">
          <Sunrise className="w-5 h-5 text-black/70" />
          <span className="text-[0.65rem]">Before 6AM</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 border border-black/30 w-20 h-20 rounded-lg">
          <Sun className="w-5 h-5 text-black/70" />
          <span className="text-[0.65rem]">6AM - 12PM</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 border border-black/30 w-20 h-20 rounded-lg">
          <SunDim className="w-5 h-5 text-black/70" />
          <span className="text-[0.65rem]">12PM - 6PM</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 border border-black/30 w-20 h-20 rounded-lg">
          <SunMoon className="w-5 h-5 text-black/70" />
          <span className="text-[0.65rem]">After 6PM</span>
        </div>
      </div>
    </div>
  );
}
