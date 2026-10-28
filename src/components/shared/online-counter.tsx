"use client";

import { motion, useReducedMotion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

export interface OnlineCounterProps {
  /** Null while the first count is still loading. */
  count: number | null;
  className?: string;
}

/**
 * Live "people online" figure. It appears at its current value (no counting up from 0 on every page switch)
 * and the digits roll whenever the number changes, with a small pulse on the dot.
 */
export function OnlineCounter({ count, className }: OnlineCounterProps) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("inline-flex items-center gap-2.5 text-[15px]", className)} aria-live="polite">
      {count === null || reduce ? (
        <span aria-hidden className={cn("size-3 rounded-full border-2 border-ink transition-colors", count === null ? "bg-line" : "bg-accent")} />
      ) : (
        // A new key on every change replays the pulse: the dot swells and settles each time the count moves.
        <motion.span
          key={count}
          aria-hidden
          initial={{ scale: 1.7, opacity: 0.55 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="size-3 rounded-full border-2 border-ink bg-accent"
        />
      )}
      {count === null ? (
        <Skeleton className="h-5 w-24" />
      ) : count === 0 ? (
        <span>Be one of the first people here</span>
      ) : (
        <>
          <NumberTicker value={count} startOnView={false} animateOnMount={false} duration={0.7} stagger={0} locale blur className="font-mono font-semibold" />
          <span>{count === 1 ? "person online" : "people online"}</span>
        </>
      )}
    </div>
  );
}
