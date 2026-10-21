"use client";

import { Lightning } from "@phosphor-icons/react";
import { usePulse } from "../pulse-provider";
import { pulseLines } from "../pulse-lines";

/**
 * The strip across the page: who is online, who just matched, which group just started.
 * Every live line comes from real events; the rest are plain facts about the app. Pauses on hover.
 */
export function LiveTicker() {
  const { online, chatsToday, events } = usePulse();
  const lines = pulseLines(online, chatsToday, events);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 py-3.5 pr-6">
      {[...lines, ...lines].map((l, i) => (
        <li key={`${l}-${i}`} className="flex items-center gap-6 whitespace-nowrap text-lg font-bold">
          {l}
          <Lightning aria-hidden weight="fill" className="size-5" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden py-5" role="region" aria-label="Live activity">
      <div className="ticker -mx-4 -rotate-1 overflow-hidden border-y-2 border-edge bg-accent text-accent-fg">
        <div className="ticker-track flex w-max motion-reduce:animate-none">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
