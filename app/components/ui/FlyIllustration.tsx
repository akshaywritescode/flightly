import { Plane } from "lucide-react";

type FlyIllustrationType = {
  durationH: number;
  durationM: number;
  stops: {
    count: number;
    via: string[];
  };
};

export default function FlyIllustration({
  durationH,
  durationM,
  stops
}: FlyIllustrationType) {
  return (
    <div className="flex flex-col items-center gap-2 w-[7.5rem]">
      <div className="flex items-center relative z-3">
        <div className="w-[0.30rem] h-[0.30rem] bg-black rounded-full"></div>

        <div className="flex gap-1">
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50 ml-1"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/50"></span>
          <span className="h-[0.10rem] w-[0.35rem] bg-black/40 mr-1"></span>
        </div>

        <div className="w-[0.30rem] h-[0.30rem] bg-black rounded-full"></div>
        <Plane
          className="rotate-45 absolute left-1/2 -translate-x-1/2 bg-white"
          fill="currentColor"
          size={"15"}
          strokeWidth={0}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-black/60 text-center">
          {durationH}h {durationM}m
        </span>
        {stops.count === 0 ? (
          <span className="text-[0.7rem] text-green-600 font-medium">
            Non-stop
          </span>
        ) : (
          <span className="text-[0.7rem]">
            {stops.count} stop{stops.count > 1 ? "s" : ""} via{" "}
            {stops.via.join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
