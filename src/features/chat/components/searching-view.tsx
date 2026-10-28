"use client";

import { motion, useReducedMotion } from "motion/react";
import { OnlineCounter } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/socket-provider";

const BLOBS = [
  { tone: "bg-accent", from: -22, to: 22 },
  { tone: "bg-pop", from: 18, to: -18 },
  { tone: "bg-brand", from: -12, to: 12 },
] as const;

/** "Waiting, finding a match for you". Shown the instant you tap Start, so it never feels like nothing happened. */
export function SearchingView({ onCancel, notice }: { onCancel: () => void; notice?: string }) {
  const reduce = useReducedMotion();
  const { online } = useSocket();
  return (
    <section role="status" aria-live="polite" className="flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center gap-8 px-4 text-center md:min-h-[100dvh]">
      <div aria-hidden className="relative h-32 w-[152px]">
        {BLOBS.map((b, i) => (
          <motion.span
            key={b.tone}
            className={`absolute top-6 size-20 rounded-full border-2 border-edge ${b.tone}`}
            style={{ left: i * 36 }}
            animate={reduce ? undefined : { x: [b.from, b.to, b.from], y: [0, -14, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="space-y-3">
        {notice ? <p className="mx-auto max-w-xs rounded-ui border-2 border-edge bg-pop/20 px-4 py-3 text-base font-bold">{notice}</p> : null}
        <h1 className="display text-display">Waiting, finding a match for you</h1>
        <p className="mx-auto max-w-xs text-lg text-muted">Hang tight. We are looking for someone who fits.</p>
        <OnlineCounter count={online} />
      </div>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </section>
  );
}
