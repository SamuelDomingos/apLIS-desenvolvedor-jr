import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export function DatePickerSimple({ value, onChange }) {
  const parseDate = (val) => {
    if (!val) return null;

    let date;
    if (typeof val === "string" && val.includes("T")) {
      date = parseISO(val);
    } else {
      date = new Date(val + "T12:00:00");
    }

    return isValid(date) ? date : null;
  };

  const selectedDate = parseDate(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !selectedDate && "text-muted-foreground",
          )}
        >
          {selectedDate ? (
            format(selectedDate, "PPP", { locale: ptBR })
          ) : (
            <span>Selecione uma data</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (!date) return;

            const offset = date.getTimezoneOffset() * 60000;
            const localISOTime = new Date(date.getTime() - offset)
              .toISOString()
              .split("T")[0];

            onChange(localISOTime);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
