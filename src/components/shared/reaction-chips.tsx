import { cn } from "@/lib/cn";

export interface ReactionChipsProps {
  reactions: Record<string, number> | undefined;
  mine: string[] | undefined;
  onToggle: (emoji: string) => void;
  alignEnd?: boolean;
}

/** The emoji people left on a message, with counts. Tap one to add or take back your own. */
export function ReactionChips({ reactions, mine, onToggle, alignEnd }: ReactionChipsProps) {
  const entries = Object.entries(reactions ?? {});
  if (entries.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", alignEnd && "justify-end")}>
      {entries.map(([emoji, n]) => {
        const on = mine?.includes(emoji);
        return (
          // The invisible ::before grows the tap area to 44px while the chip itself stays compact.
          <button
            key={emoji}
            type="button"
            aria-pressed={on}
            aria-label={`${emoji} ${n}`}
            onClick={() => onToggle(emoji)}
            className={cn("relative inline-flex h-8 items-center gap-1 rounded-full border-2 px-2.5 text-sm font-bold before:absolute before:-inset-1.5 before:content-['']", on ? "border-edge bg-accent text-accent-fg" : "border-line bg-surface")}
          >
            <span aria-hidden className="text-base leading-none">{emoji}</span>
            {n}
          </button>
        );
      })}
    </div>
  );
}
