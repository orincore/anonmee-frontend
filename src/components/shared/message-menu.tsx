"use client";

import { ArrowBendUpLeft } from "@phosphor-icons/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { REACTIONS } from "@/contracts";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";
import type { PressPoint } from "@/hooks/use-long-press";
import type { ChatLine } from "./chat-line";

export interface MessageMenuProps {
  line: ChatLine;
  at: PressPoint;
  onClose: () => void;
  onReply: (line: ChatLine) => void;
  onReact: (line: ChatLine, emoji: string) => void;
}

function Actions({ line, onReply, onReact, done }: Omit<MessageMenuProps, "at" | "onClose"> & { done: () => void }) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => first.current?.focus(), []);
  return (
    <div className="space-y-2">
      <div className="flex gap-1" role="group" aria-label="React">
        {REACTIONS.map((emoji, i) => (
          <button key={emoji} ref={i === 0 ? first : undefined} type="button" aria-label={`React ${emoji}`} aria-pressed={line.mine?.includes(emoji)}
            onClick={() => { onReact(line, emoji); done(); }}
            className={cn("grid size-11 place-items-center rounded-full border-2 text-2xl transition-transform hover:scale-110 active:scale-95", line.mine?.includes(emoji) ? "border-edge bg-accent" : "border-transparent hover:bg-line")}>
            {emoji}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => { onReply(line); done(); }} className="flex min-h-11 w-full items-center gap-3 rounded-ui px-3 font-bold hover:bg-line">
        <ArrowBendUpLeft aria-hidden weight="bold" className="size-5" />
        Reply
      </button>
    </div>
  );
}

/**
 * What you can do to a message: react with an emoji, or reply. On a computer it opens as a small menu right
 * at the cursor; from a phone's press and hold it rises from the bottom. Escape or a tap outside closes it.
 */
export function MessageMenu({ line, at, onClose, onReply, onReact }: MessageMenuProps) {
  if (at.source === "mouse" || at.source === "key") return <Floating line={line} at={at} onClose={onClose} onReply={onReply} onReact={onReact} />;
  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent title="Message" description={line.text.length > 90 ? `${line.text.slice(0, 90)}...` : line.text}>
        <Actions line={line} onReply={onReply} onReact={onReact} done={onClose} />
      </SheetContent>
    </Sheet>
  );
}

function Floating({ line, at, onClose, onReply, onReact }: MessageMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: at.x, top: at.y });

  // Keep the menu fully on screen: flip it up or left when it would run off the edge.
  useLayoutEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ left: Math.max(8, Math.min(at.x, window.innerWidth - r.width - 8)), top: Math.max(8, at.y + r.height + 8 > window.innerHeight ? at.y - r.height - 8 : at.y) });
  }, [at.x, at.y]);

  useEffect(() => {
    const away = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && onClose();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div ref={ref} role="menu" aria-label="Message options" style={pos} className="fixed z-50 w-[19.5rem] max-w-[calc(100vw-1rem)] rounded-card border-2 border-edge bg-surface p-2 shadow-sticker">
      <Actions line={line} onReply={onReply} onReact={onReact} done={onClose} />
    </div>
  );
}
