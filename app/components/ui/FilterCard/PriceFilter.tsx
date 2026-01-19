import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
type SliderProps = React.ComponentProps<typeof Slider>;
type PriceSliderProps = {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
};

export function PriceSlider({value, onValueChange, className, ...props }: PriceSliderProps & SliderProps) {
  return (
    <div>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[100%]", className)}
        {...props}
        value={value}
        onValueChange={onValueChange}
      />
    </div>
  );
}
