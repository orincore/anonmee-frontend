"use client";

import { useLongPress, type PressPoint } from "@/hooks/use-long-press";
import { cn } from "@/lib/cn";
import type { ChatLine } from "./chat-line";
import { MessageBubble } from "./message-bubble";
import { GENDER_LABEL } from "./peer-badge";
import { QuotedReply } from "./quoted-reply";
import { ReactionChips } from "./reaction-chips";

export interface MessageRowProps {
  line: ChatLine;
  prev?: ChatLine;
  showAuthor: boolean;
  onRetry?: (key: string) => void;
  onAuthorTap?: (line: ChatLine) => void;
  /** Right-click or press and hold on the bubble. Omit to turn the menu off. */
  onMenu?: (line: ChatLine, at: PressPoint) => void;
  onReact?: (line: ChatLine, emoji: string) => void;
  onJump?: (id: string) => void;
}

/** One message in a list: who wrote it (in groups), what it replies to, the bubble, its reactions, and its send state. */
export function MessageRow({ line, prev, showAuthor, onRetry, onAuthorTap, onMenu, onReact, onJump }: MessageRowProps) {
  const press = useLongPress((at) => line.id && onMenu?.(line, at));
  const newAuthor = showAuthor && !line.own && prev?.alias !== line.alias;
  const canAct = !!onMenu && !!line.id;
  return (
    <div className={cn("space-y-1", newAuthor && "pt-2")}>
      {newAuthor ? (
        <button type="button" onClick={() => onAuthorTap?.(line)} className="flex min-h-8 items-baseline gap-2 px-1 text-left text-sm" aria-label={`Options for ${line.alias}`}>
          <span className="font-bold">{line.alias}</span>
          <span className="font-mono text-[12px] uppercase text-muted">{GENDER_LABEL[line.gender]} / {line.age}</span>
        </button>
      ) : null}
      <div className={cn("flex", line.own ? "justify-end" : "justify-start")}>
        <div className={cn("min-w-0 max-w-[80%] space-y-1 md:max-w-[65ch]", line.own && "flex flex-col items-end")}>
          {/* Right-click, press and hold, or the Menu key opens reply and react. The bubble text can still be selected with the mouse. */}
          <div {...(canAct ? press : {})} tabIndex={canAct ? 0 : undefined} aria-haspopup={canAct ? "menu" : undefined} className={cn("max-w-full touch-manipulation rounded-[1.25rem]", canAct && "cursor-context-menu [-webkit-touch-callout:none] pointer-coarse:select-none")}>
            <MessageBubble
              text={line.text}
              own={line.own}
              className={line.status === "failed" ? "opacity-60" : undefined}
              quote={line.replyTo ? <QuotedReply reply={line.replyTo} onOwn={line.own} onJump={onJump} /> : undefined}
            />
          </div>
          <ReactionChips reactions={line.reactions} mine={line.mine} alignEnd={line.own} onToggle={(e) => onReact?.(line, e)} />
        </div>
      </div>
      {line.own && line.status !== "sent" ? (
        <p className="text-right text-sm text-muted">
          {line.status === "sending" ? "Sending" : (
            <button type="button" onClick={() => onRetry?.(line.key)} className="min-h-11 font-bold text-danger underline underline-offset-2">
              Not sent. Tap to retry
            </button>
          )}
        </p>
      ) : null}
    </div>
  );
}
