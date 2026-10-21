"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { monthNames, parseIso, toIso } from "@/lib/calendar";
import { cn } from "@/lib/cn";
import { DayView, MonthView, YearView } from "./calendar-views";

export interface CalendarPanelProps {
  /** Current value as YYYY-MM-DD, if any. */
  value?: string;
  /** The latest date that can be chosen, as YYYY-MM-DD. */
  max: string;
  /** The earliest year that can be chosen. */
  minYear?: number;
  onSelect: (iso: string) => void;
}

const PAGE = 12;

function Nav({ children, onClick, disabled, label }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="grid size-11 place-items-center rounded-full border-2 border-line hover:border-edge disabled:pointer-events-none disabled:opacity-30">
      {children}
    </button>
  );
}

/**
 * A date picker built for birth dates: choose the year (twelve at a time), then the month, then the day.
 * No endless scrolling back through the decades, big touch targets, and it works the same with a finger, a mouse or a keyboard.
 */
export function CalendarPanel({ value, max, minYear = 1920, onSelect }: CalendarPanelProps) {
  const limit = parseIso(max)!;
  const current = parseIso(value);
  const [view, setView] = useState<"year" | "month" | "day">(current ? "day" : "year");
  const [y, setY] = useState(current?.y);
  const [m, setM] = useState(current?.m);
  const [page, setPage] = useState(current ? Math.floor((limit.y - current.y) / PAGE) : 0);
  const reduce = useReducedMotion();

  const top = limit.y - PAGE * page;
  const years = Array.from({ length: PAGE }, (_, i) => top - PAGE + 1 + i).filter((v) => v >= minYear);
  const stepMonth = (by: number) => {
    const t = (y! * 12 + (m! - 1)) + by;
    setY(Math.floor(t / 12));
    setM((t % 12) + 1);
  };
  const atLatest = y === limit.y && m === limit.m;
  const atEarliest = y === minYear && m === 1;

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        {view === "year" ? (
          <>
            <Nav label="Older years" disabled={years[0]! <= minYear} onClick={() => setPage(page + 1)}><CaretLeft aria-hidden weight="bold" className="size-5" /></Nav>
            <p className="display text-2xl">{years[0]} to {years[years.length - 1]}</p>
            <Nav label="Newer years" disabled={page === 0} onClick={() => setPage(page - 1)}><CaretRight aria-hidden weight="bold" className="size-5" /></Nav>
          </>
        ) : view === "month" ? (
          <button type="button" onClick={() => setView("year")} className="display min-h-11 rounded-full border-2 border-line px-5 text-2xl hover:border-edge">{y} <span className="text-base text-muted">change</span></button>
        ) : (
          <>
            <Nav label="Previous month" disabled={atEarliest} onClick={() => stepMonth(-1)}><CaretLeft aria-hidden weight="bold" className="size-5" /></Nav>
            <div className="flex gap-2">
              <button type="button" onClick={() => setView("month")} className={cn("display min-h-11 rounded-full border-2 border-line px-4 text-xl hover:border-edge")}>{monthNames("long")[m! - 1]}</button>
              <button type="button" onClick={() => setView("year")} className="display min-h-11 rounded-full border-2 border-line px-4 text-xl hover:border-edge">{y}</button>
            </div>
            <Nav label="Next month" disabled={atLatest} onClick={() => stepMonth(1)}><CaretRight aria-hidden weight="bold" className="size-5" /></Nav>
          </>
        )}
      </header>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={view} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.12 }}>
          {view === "year" ? <YearView years={years} selected={y} onPick={(v) => { setY(v); setView("month"); }} /> : null}
          {view === "month" ? <MonthView year={y!} selected={m} max={limit} onPick={(v) => { setM(v); setView("day"); }} /> : null}
          {view === "day" ? (
            <DayView year={y!} month={m!} selected={current && current.y === y && current.m === m ? current.d : undefined} lastAllowed={atLatest ? limit.d : undefined} onPick={(d) => onSelect(toIso({ y: y!, m: m!, d }))} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
