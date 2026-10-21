import { NumberTicker } from "@/components/ui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

export interface OnlineCounterProps {
  /** Null while the first count is still loading. */
  count: number | null;
  className?: string;
}

/** Live "people online" figure. The square shows only when the count is real and live. */
export function OnlineCounter({ count, className }: OnlineCounterProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 text-[15px]", className)} aria-live="polite">
      <span aria-hidden className={cn("size-3 rounded-full border-2 border-ink", count === null ? "bg-line" : "bg-accent")} />
      {count === null ? (
        <Skeleton className="h-5 w-24" />
      ) : count === 0 ? (
        <span>Be one of the first people here</span>
      ) : (
        <>
          <NumberTicker value={count} startOnView={false} locale className="font-mono font-semibold" />
          <span>{count === 1 ? "person online" : "people online"}</span>
        </>
      )}
    </div>
  );
}
