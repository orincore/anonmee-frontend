import { cn } from "@/lib/cn";

export interface MessageBubbleProps {
  text: string;
  /** Your own messages sit on the right in cobalt. */
  own?: boolean;
  /** The quoted message, when this is a reply. Rendered at the top of the bubble. */
  quote?: React.ReactNode;
  className?: string;
}

/** One chat message: an outlined bubble. Plain text only, never HTML. Long words wrap so nothing overflows at 360px. */
export function MessageBubble({ text, own = false, quote, className }: MessageBubbleProps) {
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
    </div>
  );
}
