"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A black bar that draws itself over hidden information as it scrolls into view. Meaning: this is withheld.
 * The wrapper carries the width and is what we watch, because a bar that starts at zero width can never be "in view".
 */
export function RedactionBar({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  return (
    <span ref={ref} aria-hidden className={cn("inline-block h-[1.1em] align-middle", className)}>
      <motion.span
        initial={false}
        animate={{ scaleX: seen || reduce ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
        className="block size-full origin-left rounded-md bg-ink"
      />
    </span>
  );
}
