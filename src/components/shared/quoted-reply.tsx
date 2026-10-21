import type { ReplyPreview } from "@/contracts";
import { cn } from "@/lib/cn";

export interface QuotedReplyProps {
  reply: ReplyPreview;
  /** True when it sits inside your own cobalt bubble. */
  onOwn?: boolean;
  onJump?: (id: string) => void;
}

/** The little quote at the top of a reply. Tap it to scroll to the original, if it is still loaded. */
export function QuotedReply({ reply, onOwn, onJump }: QuotedReplyProps) {
  return (
    <button
      type="button"
      onClick={() => onJump?.(reply.id)}
      className={cn("block w-full rounded-lg border-l-4 px-2.5 py-1 text-left text-sm", onOwn ? "border-brand-fg/70 bg-brand-fg/15" : "border-accent-text bg-elevated")}
    >
      <span className="block font-bold">{reply.alias}</span>
      <span className="line-clamp-2 break-words opacity-80">{reply.text}</span>
    </button>
  );
}
