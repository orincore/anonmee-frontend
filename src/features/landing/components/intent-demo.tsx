"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/chip";
import { INTENT_GROUPS, type IntentGroupId } from "@/contracts";

/** A working copy of the first step of the real picker, at the level of the main choices. Pick as many as you like. */
export function IntentDemo() {
  const [picked, setPicked] = useState<IntentGroupId[]>(["casual", "friendship"]);
  const toggle = (id: IntentGroupId) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const labels = INTENT_GROUPS.filter((g) => picked.includes(g.id)).map((g) => g.label.toLowerCase());
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2.5">
        {INTENT_GROUPS.map((g) => (
          <Chip key={g.id} selected={picked.includes(g.id)} onClick={() => toggle(g.id)}>
            {g.label}
          </Chip>
        ))}
      </div>
      <p className="text-[15px] text-muted" aria-live="polite">
        {labels.length === 0 ? "Pick at least one." : `You will meet people who also picked ${labels.join(" or ")}. Some choices open up more options.`}
      </p>
    </div>
  );
}
