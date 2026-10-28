import { cn } from "@/lib/cn";

/** "They are typing": three dots that blink in turn with optional typist info. */
export function TypingDots({ label, className }: { label?: string; className?: string }) {
  return (
    <div className="flex items-center gap-2.5 py-0.5">
      <div
        role="status"
        aria-label={label || "Typing"}
        className={cn(
          "flex w-fit items-center gap-1.5 rounded-[1.25rem] rounded-bl-md border-2 border-edge bg-surface px-3.5 py-2.5 text-fg shadow-sticker-sm",
          className
        )}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} aria-hidden className="typing-dot size-2 rounded-full bg-current motion-reduce:animate-none" />
        ))}
      </div>
      {label && label !== "Typing" && (
        <span className="text-xs font-medium text-muted">{label}</span>
      )}
    </div>
  );
}
