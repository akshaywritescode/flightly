import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function TripTypeSelector() {
  return (
    <RadioGroup
      defaultValue="oneway"
      className="flex gap-6 ml-2"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="oneway" id="oneway" />
        <Label htmlFor="oneway">One way</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem value="roundtrip" id="roundtrip" />
        <Label htmlFor="roundtrip">Round Trip</Label>
      </div>
    </RadioGroup>
  )
}
