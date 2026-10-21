import { INTENT_GROUPS, type PulseEvent } from "@/contracts";

/** Always true, so the ticker is never empty on a quiet day. */
const FACTS = ["Only gender and age are shown", "Text only, no photos", "Adults 18 and over", "Free to use"];

export function pulseLines(online: number | null, chatsToday: number | null, events: PulseEvent[]): string[] {
  const live: string[] = [];
  if (online) live.push(`${online.toLocaleString()} online right now`);
  if (chatsToday) live.push(`${chatsToday.toLocaleString()} ${chatsToday === 1 ? "chat" : "chats"} started today`);
  for (const e of events.slice(0, 6)) {
    live.push(e.kind === "match" ? `Someone just matched for ${(INTENT_GROUPS.find((g) => g.id === e.intent)?.label ?? "a chat").toLowerCase()}` : `New group: ${e.title}`);
  }
  // Live lines first, with a fact between each so the strip keeps its rhythm.
  return live.flatMap((l, i) => [l, FACTS[i % FACTS.length]]).concat(live.length ? [] : FACTS);
}
