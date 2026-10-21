"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { INTENT_GROUPS, INTENT_LABELS, type Intent, type IntentGroupId } from "@/contracts";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/cn";

export interface IntentPickerProps {
  value: Intent[];
  onChange: (next: Intent[]) => void;
}

const toggle = (list: Intent[], item: Intent) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

/**
 * What are you here for? Pick as many as you like. Simple choices are one tap. "Dating and relationships" and
 * "Open-minded" open up their specific options, and you can choose several in each. People are matched on the
 * exact options you pick here.
 */
export function IntentPicker({ value, onChange }: IntentPickerProps) {
  const [open, setOpen] = useState<IntentGroupId | null>(null);
  const group = INTENT_GROUPS.find((g) => g.id === open);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {INTENT_GROUPS.map((g) => {
          const picked = g.intents.filter((i) => value.includes(i)).length;
          if (g.intents.length === 1) {
            return (
              <Chip key={g.id} selected={picked > 0} onClick={() => onChange(toggle(value, g.intents[0]))}>
                {g.label}
              </Chip>
            );
          }
          return (
            <Chip key={g.id} selected={picked > 0} aria-expanded={open === g.id} onClick={() => setOpen(open === g.id ? null : g.id)}>
              {g.label}
              {picked > 0 ? <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-xs text-paper">{picked}</span> : null}
              <CaretDown aria-hidden weight="bold" className={cn("size-4 transition-transform", open === g.id && "rotate-180")} />
            </Chip>
          );
        })}
      </div>
      {group ? (
        <div className="space-y-3 rounded-ui border-2 border-line p-4" role="group" aria-label={group.label}>
          <p className="text-sm text-muted">Pick as many as you like. You will only meet people who chose at least one of the same.</p>
          <div className="flex flex-wrap gap-2">
            {group.intents.map((i) => (
              <Chip key={i} selected={value.includes(i)} onClick={() => onChange(toggle(value, i))}>
                {INTENT_LABELS[i]}
              </Chip>
            ))}
          </div>
          {group.id === "relationships" || group.id === "open_minded" ? (
            <p className="text-sm text-muted">Everyone on Anonmee is 18 or older. Keep it consensual: anyone can say stop, block or report at any time.</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
