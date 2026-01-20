import { Slider } from "@/components/ui/slider";

type PriceSliderProps = {
  value: [number, number];
  min: number;
  max: number;
  onChange: (v: [number, number]) => void;
};

export function PriceSlider({
  value,
  min,
  max,
  onChange,
}: PriceSliderProps) {
  return (
    <div className="mt-4">
      <h2 className="text-sm font-medium mb-2 -ml-2">Price</h2>

      <div className="text-xs text-black/70 mb-2">
        ${value[0]} – ${value[1]}
      </div>

      <Slider
        value={value}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => onChange(v as [number, number])}
      />
    </div>
  );
}
