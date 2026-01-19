import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type TripType = "oneway" | "roundtrip"

type TripTypeSelectorProps = {
  value: TripType
  onChange: (value: TripType) => void
}

export function TripTypeSelector({
  value,
  onChange,
}: TripTypeSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onChange(v as TripType)}
      className="flex gap-6 ml-2"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="oneway" id="oneway" />
        <Label htmlFor="oneway" className="text-xs">One way</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem value="roundtrip" id="roundtrip" />
        <Label htmlFor="roundtrip" className="text-xs">Round Trip</Label>
      </div>
    </RadioGroup>
  )
}

