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

type DepartureDatePickerProps = {
  value?: Date
  onChange: (date: Date | undefined) => void
}

export function DepartureDatePicker({
  value,
  onChange,
}: DepartureDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-35 justify-between font-normal text-xs"
          >
            {value
            ? value.toLocaleDateString()
            : "Departure Date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
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
      </Popover>
    </div>
  )
}
