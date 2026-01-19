"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ReturnDatePickerProps = {
  value?: Date
  onChange: (date: Date | undefined) => void
  tripType: "oneway" | "roundtrip"
}

export function ReturnDatePicker({
  value,
  onChange,
  tripType,
}: ReturnDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const disabled = tripType === "oneway"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[50%] justify-between font-normal text-xs sm:w-36"
          disabled={disabled}
        >
          {value ? value.toLocaleDateString() : "Return Date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      {!disabled && (
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      )}
    </Popover>
  )
}
