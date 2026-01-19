type StopsFilterValue = "all" | "nonstop" | "1stop" | "2plus";

type StopsFilterProps = {
  value: StopsFilterValue;
  onChange: (value: StopsFilterValue) => void;
};

export default function StopsFilter({ value, onChange }: StopsFilterProps) {
  const base =
    "w-16 h-16 flex justify-center items-center rounded-lg p-1 text-[0.65rem] cursor-pointer transition";

  const active = "border-blue-600 bg-blue-50 text-blue-700";
  const inactive = "border border-black/30 hover:border-black/60";

  return (
    <div className="mt-5">
      <h2 className="text-[0.8rem] mb-2 font-medium -ml-2">Stops</h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        {/* ALL */}
        <div
          className={`${base} ${value === "all" ? active : inactive}`}
          onClick={() => onChange("all")}
        >
          All
        </div>

        {/* NON STOP */}
        <div
          className={`${base} ${value === "nonstop" ? active : inactive}`}
          onClick={() => onChange("nonstop")}
        >
          Non-Stop
        </div>

        {/* 1 STOP */}
        <div
          className={`${base} ${value === "1stop" ? active : inactive}`}
          onClick={() => onChange("1stop")}
        >
          1 Stop
        </div>

        {/* 2+ STOP */}
        <div
          className={`${base} ${value === "2plus" ? active : inactive}`}
          onClick={() => onChange("2plus")}
        >
          2+ Stop
        </div>
      </div>
    </div>
  );
}
