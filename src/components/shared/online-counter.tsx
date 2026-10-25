import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

export interface OnlineCounterProps {
  /** Null while the first count is still loading. */
  count: number | null;
  className?: string;
}

/** Live "people online" figure. Stably displays live count without rolling back to 0 on page switches. */
export function OnlineCounter({ count, className }: OnlineCounterProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 text-[15px]", className)} aria-live="polite">
      <span
        aria-hidden
        className={cn("size-3 rounded-full border-2 border-ink transition-colors", count === null ? "bg-line" : "bg-accent")}
      />
      {count === null ? (
        <Skeleton className="h-5 w-24" />
      ) : count === 0 ? (
        <span>Be one of the first people here</span>
      ) : (
        <>
          <span className="font-mono font-semibold">{count.toLocaleString()}</span>
          <span>{count === 1 ? "person online" : "people online"}</span>
        </>
      )}
    </div>
  );
}
