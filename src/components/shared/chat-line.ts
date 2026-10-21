import type { ChatMessage, Gender, ReplyPreview } from "@/contracts";

/** One message as the screen holds it. `key` is the client message id, so retries and echoes never duplicate. */
export interface ChatLine {
  key: string;
  /** The server's id for the message, known once it has been delivered. Needed to reply to it or react to it. */
  id?: string;
  replyTo?: ReplyPreview;
  /** How many people used each emoji. */
  reactions?: Record<string, number>;
  /** The emoji you have put on it. */
  mine?: string[];
  /** Position in the room, known once the server has it. */
  seq?: number;
  alias: string;
  gender: Gender;
  age: number;
  text: string;
  at: number;
  own: boolean;
  status: "sending" | "sent" | "failed";
}

/**
 * Adds or updates lines by key. A message you sent and the server's echo of it share a key, so the echo
 * replaces your pending copy instead of appearing twice. Confirmed messages are ordered by their number;
 * messages still sending or failed stay at the end in the order you wrote them.
 */
export function mergeLines(prev: ChatLine[], incoming: ChatLine[]): ChatLine[] {
  const byKey = new Map(prev.map((l) => [l.key, l]));
  for (const l of incoming) byKey.set(l.key, { ...byKey.get(l.key), ...l });
  const all = [...byKey.values()];
  const sent = all.filter((l) => l.seq !== undefined).sort((a, b) => a.seq! - b.seq!);
  const pending = all.filter((l) => l.seq === undefined).sort((a, b) => a.at - b.at);
  return [...sent, ...pending];
}

export const lastSeq = (lines: ChatLine[]) => lines.reduce((m, l) => Math.max(m, l.seq ?? 0), 0);

/** Turns a message from the server into a line for the screen. `youAlias` decides which side it sits on. */
export function lineFromMessage(m: ChatMessage, youAlias: string): ChatLine {
  return {
    key: m.clientMsgId, id: m.id, seq: m.seq, alias: m.alias, gender: m.gender, age: m.age, text: m.text, at: m.at,
    own: m.alias === youAlias, status: "sent", replyTo: m.replyTo, reactions: m.reactions, mine: m.mine,
  };
}

/** Flips one emoji on a line, counts included. Used for an instant response before the server answers. */
export function toggleReaction(line: ChatLine, emoji: string, on: boolean): ChatLine {
  const reactions = { ...line.reactions };
  const next = (reactions[emoji] ?? 0) + (on ? 1 : -1);
  if (next > 0) reactions[emoji] = next;
  else delete reactions[emoji];
  const mine = on ? [...new Set([...(line.mine ?? []), emoji])] : (line.mine ?? []).filter((e) => e !== emoji);
  return { ...line, reactions, mine };
}

/** The short quote shown above a reply, built from the line being replied to. The server makes the real one. */
export const previewOfLine = (l: ChatLine): ReplyPreview => ({ id: l.id!, alias: l.alias, text: l.text.length > 120 ? `${l.text.slice(0, 120)}...` : l.text });
