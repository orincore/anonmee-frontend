"use client";

import { ArrowBendUpLeft, PaperPlaneRight, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ComposerProps {
  onSend: (text: string) => void;
  /** Called while typing, at most as often as the caller throttles it. */
  onTyping?: () => void;
  disabled?: boolean;
  placeholder?: string;
  /** Set while replying to a message: shows who and what, with a way to cancel. */
  replyingTo?: { alias: string; text: string };
  onCancelReply?: () => void;
  /** Change this number to put the cursor in the box, for example each time Reply is chosen. */
  focusSignal?: number;
}

const MAX = 2000;

/** The message box. Grows to four lines, sends with Enter on a computer (a phone keeps Enter for new lines), and sits above the home indicator. */
export function Composer({ onSend, onTyping, disabled, placeholder = "Say something", replyingTo, onCancelReply, focusSignal }: ComposerProps) {
  const [text, setText] = useState("");
  const area = useRef<HTMLTextAreaElement>(null);

  // Choosing Reply puts the cursor straight in the box, so you can just start typing (and on a phone, the keyboard opens).
  useEffect(() => {
    if (focusSignal) area.current?.focus();
  }, [focusSignal]);

  const grow = () => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  };
  const send = () => {
    const t = text.trim();
    if (!t || disabled) return;
    onSend(t);
    setText("");
    requestAnimationFrame(grow);
    area.current?.focus();
  };

  return (
    <div className="border-t-2 border-edge bg-bg">
      {replyingTo ? (
        <div className="flex items-center gap-3 border-b-2 border-line px-4 py-2">
          <ArrowBendUpLeft aria-hidden weight="bold" className="size-5 shrink-0 text-accent-text" />
          <p className="min-w-0 flex-1 truncate text-sm">
            Replying to <strong>{replyingTo.alias}</strong>: <span className="text-muted">{replyingTo.text}</span>
          </p>
          <button type="button" onClick={onCancelReply} aria-label="Cancel reply" className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-line">
            <X aria-hidden weight="bold" className="size-5" />
          </button>
        </div>
      ) : null}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      className="flex items-end gap-2 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <label htmlFor="composer" className="sr-only">
        Message
      </label>
      <textarea
        id="composer"
        ref={area}
        value={text}
        rows={1}
        maxLength={MAX}
        disabled={disabled}
        placeholder={placeholder}
        enterKeyHint="send"
        onChange={(e) => {
          setText(e.target.value);
          grow();
          onTyping?.();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && window.matchMedia("(pointer: fine)").matches) {
            e.preventDefault();
            send();
          }
        }}
        className="min-h-12 flex-1 resize-none rounded-[1.5rem] border-2 border-line bg-surface px-5 py-3 text-base leading-snug focus:border-edge disabled:opacity-60"
      />
      <button
        type="submit"
        aria-label="Send"
        disabled={disabled || !text.trim()}
        className={cn("grid size-12 shrink-0 place-items-center rounded-full border-2 border-edge bg-accent text-accent-fg shadow-sticker-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40 motion-reduce:transition-none")}
      >
        <PaperPlaneRight aria-hidden weight="fill" className="size-5" />
      </button>
    </form>
    </div>
  );
}
