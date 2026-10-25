import { cn } from "@/lib/cn";

export interface MessageBubbleProps {
  text: string;
  /** Your own messages sit on the right in cobalt. */
  own?: boolean;
  /** The quoted message, when this is a reply. Rendered at the top of the bubble. */
  quote?: React.ReactNode;
  timestamp?: number;
  className?: string;
}

export function formatBubbleTime(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatBubbleDate(ms: number): string {
  const d = new Date(ms);
  const now = new Date();
  const isSameYear = d.getFullYear() === now.getFullYear();
  return d.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    ...(isSameYear ? {} : { year: "numeric" }),
  });
}

export function formatDateDivider(ms: number): string {
  const d = new Date(ms);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }
  return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

/** One chat message: an outlined bubble. Plain text only, never HTML. Long words wrap so nothing overflows at 360px. */
export function MessageBubble({ text, own = false, quote, timestamp, className }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "w-fit max-w-full space-y-1.5 border-2 border-edge px-4 py-2.5 text-base leading-snug",
        own ? "ml-auto rounded-[1.25rem] rounded-br-md bg-brand text-brand-fg" : "mr-auto rounded-[1.25rem] rounded-bl-md bg-surface text-fg",
        className,
      )}
    >
      {quote}
      <p className="whitespace-pre-wrap break-words">{text}</p>
      {timestamp ? (
        <div
          title={new Date(timestamp).toLocaleString()}
          className={cn(
            "flex select-none items-center justify-end gap-1 pt-0.5 font-mono text-[11px] leading-none",
            own ? "text-brand-fg/75" : "text-muted",
          )}
        >
          <span>{formatBubbleDate(timestamp)}</span>
          <span className="opacity-60">•</span>
          <span>{formatBubbleTime(timestamp)}</span>
        </div>
      ) : null}
    </div>
  );
}
