"use client";

import { CalendarBlank } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { ageOn, formatLong, parseIso, todayUtc } from "@/lib/calendar";
import { cn } from "@/lib/cn";
import { CalendarPanel } from "./calendar-panel";
import { Sheet, SheetContent } from "./sheet";

export interface DatePickerFieldProps {
  label: string;
  /** YYYY-MM-DD, or empty. */
  value: string;
  onChange: (iso: string) => void;
  /** The latest date allowed, YYYY-MM-DD. For a birth date this is the day someone turns 18. */
  max: string;
  hint?: string;
  error?: string;
  /** Called when the picker closes, so a form can start showing problems. */
  onTouched?: () => void;
}

/** A field that opens a proper calendar instead of the browser's own, so it looks and behaves the same on every device. */
export function DatePickerField({ label, value, onChange, max, hint, error, onTouched }: DatePickerFieldProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const parsed = parseIso(value);
  const age = parsed ? ageOn(parsed, todayUtc()) : null;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[15px] font-semibold">{label}</label>
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-describedby={`${id}-note`}
        onClick={() => setOpen(true)}
        className={cn("flex min-h-12 w-full items-center justify-between gap-3 rounded-ui border-2 bg-surface px-4 text-left text-base transition-[border-color,box-shadow] hover:border-edge focus:shadow-sticker-sm", error ? "border-danger" : "border-line")}
      >
        <span className={parsed ? "text-fg" : "text-muted"}>{parsed ? formatLong(parsed) : "Choose your date of birth"}</span>
        <CalendarBlank aria-hidden weight="bold" className="size-5 shrink-0 text-muted" />
      </button>
      <p id={`${id}-note`} className={cn("text-sm", error ? "font-bold text-danger" : "text-muted")} role={error ? "alert" : undefined}>
        {error ?? (age !== null ? `You are ${age}. ${hint ?? ""}` : hint)}
      </p>
      <Sheet open={open} onOpenChange={(o) => { setOpen(o); if (!o) onTouched?.(); }}>
        <SheetContent title={label} description="Pick the year, then the month, then the day.">
          <CalendarPanel value={value} max={max} onSelect={(iso) => { onChange(iso); setOpen(false); onTouched?.(); }} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
