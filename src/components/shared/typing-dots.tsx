import { cn } from "@/lib/cn";

/** "They are typing": three dots that blink in turn. Adapted from the Spectrum UI thinking dots; CSS only. */
export function TypingDots({ label = "Typing", className }: { label?: string; className?: string }) {
  return (
    <div role="status" aria-label={label} className={cn("flex w-fit items-center gap-1.5 rounded-[1.25rem] rounded-bl-md border-2 border-edge bg-surface px-4 py-3.5 text-fg", className)}>
      {[0, 1, 2].map((i) => (
        <span key={i} aria-hidden className="typing-dot size-2 rounded-full bg-current motion-reduce:animate-none" />
      ))}
    </div>
  );
}
