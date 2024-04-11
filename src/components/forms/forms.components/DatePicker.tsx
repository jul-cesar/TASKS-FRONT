"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, formatISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { es } from "date-fns/locale";
type DatePickerProps = {
  valuef: any;
  onChangef: (...event: any[]) => void;
};
export function DatePicker({ valuef, onChangef }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !valuef && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {valuef ? format(valuef, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={es}
          fromDate={new Date()}
          mode="single"
          selected={valuef}
          onSelect={(date: any) => onChangef(formatISO(date))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
