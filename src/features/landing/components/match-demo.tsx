"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PeerBadge } from "@/components/shared";

/** Plays the real matching moment once when it scrolls into view: waiting, then connected. */
export function MatchDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (!seen) return;
    const t = setTimeout(() => setMatched(true), reduce ? 0 : 1800);
    return () => clearTimeout(t);
  }, [seen, reduce]);

  return (
    <div ref={ref} className="min-h-28 space-y-4" role="status">
      {matched ? (
        <>
          <p className="display text-3xl text-accent-text">Connected!</p>
          <PeerBadge peer={{ alias: "Golden Heron 62", gender: "non_binary", age: 29 }} />
        </>
      ) : (
        <p className="flex items-center gap-3 text-xl font-bold">
          <span aria-hidden className="cursor-blink size-3.5 rounded-full border-2 border-edge bg-accent motion-reduce:animate-none" />
          Waiting, finding a match for you
        </p>
      )}
    </div>
  );
}
