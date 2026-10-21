import { cn } from "@/lib/cn";
import { daysInMonth, firstColumn, monthNames, weekdayNames } from "@/lib/calendar";

const cell = (selected: boolean) =>
  cn(
    "grid min-h-12 place-items-center rounded-ui border-2 font-bold transition-colors duration-100 disabled:pointer-events-none disabled:opacity-30",
    selected ? "border-edge bg-accent text-accent-fg shadow-sticker-sm" : "border-line hover:border-edge",
  );

/** A page of 12 years, oldest first. Years outside the allowed range are left out. */
export function YearView({ years, selected, onPick }: { years: number[]; selected?: number; onPick: (y: number) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Year">
      {years.map((y) => (
        <button key={y} type="button" className={cell(y === selected)} aria-pressed={y === selected} onClick={() => onPick(y)}>
          {y}
        </button>
      ))}
    </div>
  );
}

export function MonthView({ year, selected, max, onPick }: { year: number; selected?: number; max: { y: number; m: number }; onPick: (m: number) => void }) {
  const names = monthNames("short");
  return (
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Month">
      {names.map((n, i) => (
        <button key={n} type="button" className={cell(i + 1 === selected)} aria-pressed={i + 1 === selected} disabled={year === max.y && i + 1 > max.m} onClick={() => onPick(i + 1)}>
          {n}
        </button>
      ))}
    </div>
  );
}

export interface DayViewProps {
  year: number;
  month: number;
  selected?: number;
  /** The last allowed day if it falls in this month, so later days are switched off. */
  lastAllowed?: number;
  onPick: (d: number) => void;
}

/** The days of one month under Monday-first weekday names. Every day is a 48px target. */
export function DayView({ year, month, selected, lastAllowed, onPick }: DayViewProps) {
  const longMonth = monthNames("long")[month - 1];
  return (
    <div role="group" aria-label={`${longMonth} ${year}`}>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center font-mono text-xs uppercase text-muted" aria-hidden>
        {weekdayNames().map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstColumn(year, month) }, (_, i) => <span key={`b${i}`} aria-hidden />)}
        {Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1).map((d) => (
          <button key={d} type="button" className={cell(d === selected)} aria-label={`${d} ${longMonth} ${year}`} aria-pressed={d === selected} disabled={lastAllowed !== undefined && d > lastAllowed} onClick={() => onPick(d)}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
