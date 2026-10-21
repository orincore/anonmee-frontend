"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState } from "react";
import type { PressPoint } from "@/hooks/use-long-press";
import type { ChatLine } from "./chat-line";
import { MessageMenu } from "./message-menu";
import { MessageRow } from "./message-row";
import { TypingDots } from "./typing-dots";

export interface MessageListProps {
  lines: ChatLine[];
  typing?: boolean;
  /** Show who wrote each message (groups). One-to-one chats leave this off. */
  showAuthors?: boolean;
  hasMore?: boolean;
  loadingOlder?: boolean;
  onLoadOlder?: () => void;
  onRetry?: (key: string) => void;
  /** Tapping a person's name in a group, to report or block them. */
  onAuthorTap?: (line: ChatLine) => void;
  /** Passing these turns on right-click / press-and-hold for reply and react. */
  onReply?: (line: ChatLine) => void;
  onReact?: (line: ChatLine, emoji: string) => void;
  empty?: React.ReactNode;
}

const NEAR_BOTTOM = 96;

/**
 * Virtualised message list: only the rows on screen exist in the page, so a room with thousands of
 * messages stays smooth. It sticks to the bottom for new messages unless you have scrolled up, and
 * loads older ones when you reach the top without moving what you are reading.
 */
export function MessageList({ lines, typing, showAuthors, hasMore, loadingOlder, onLoadOlder, onRetry, onAuthorTap, onReply, onReact, empty }: MessageListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const atBottom = useRef(true);
  const prev = useRef({ first: "", len: 0 });
  const [unread, setUnread] = useState(0);
  const [menu, setMenu] = useState<{ line: ChatLine; at: PressPoint }>();
  const count = lines.length + (typing ? 1 : 0);

  // TanStack Virtual returns unmemoisable functions; this component does not rely on memoisation.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virt = useVirtualizer({
    count,
    getScrollElement: () => ref.current,
    estimateSize: () => 56,
    overscan: 10,
    getItemKey: (i) => (i < lines.length ? lines[i].key : "typing"),
  });

  useLayoutEffect(() => {
    const first = lines[0]?.key ?? "";
    const was = prev.current;
    const grewAtTop = was.first !== "" && first !== was.first && lines.length > was.len;
    if (grewAtTop) virt.scrollToIndex(lines.length - was.len, { align: "start" }); // keep your place after older messages load
    else if (lines.length > was.len) {
      const mine = lines[lines.length - 1]?.own;
      if (atBottom.current || mine || was.len === 0) virt.scrollToIndex(count - 1, { align: "end" });
      else setUnread((n) => n + (lines.length - was.len));
    } else if (typing && atBottom.current) virt.scrollToIndex(count - 1, { align: "end" });
    prev.current = { first, len: lines.length };
  }, [lines, typing, count, virt]);

  // Tapping a quoted reply scrolls to the original, if it is still loaded.
  const jump = (id: string) => {
    const i = lines.findIndex((l) => l.id === id);
    if (i >= 0) virt.scrollToIndex(i, { align: "center" });
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    atBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM;
    if (atBottom.current && unread) setUnread(0);
    if (el.scrollTop < 160 && hasMore && !loadingOlder) onLoadOlder?.();
  };

  return (
    <div className="relative min-h-0 flex-1">
      <div ref={ref} onScroll={onScroll} className="absolute inset-0 overflow-y-auto overscroll-contain px-4" role="log" aria-live="polite" aria-label="Messages">
        {lines.length === 0 && !typing ? (
          <div className="grid h-full place-items-center py-8">{empty}</div>
        ) : (
          // A short conversation sits at the bottom, next to the composer, like every chat app.
          <div className="flex min-h-full flex-col justify-end">
          <div className="relative w-full" style={{ height: virt.getTotalSize() }}>
            {loadingOlder ? <p className="absolute inset-x-0 top-0 py-2 text-center text-sm text-muted">Loading earlier messages</p> : null}
            {virt.getVirtualItems().map((v) => {
              const line = lines[v.index];
              const dash = "absolute left-0 top-0 w-full pb-2.5";
              return (
                <div key={v.key} data-index={v.index} ref={virt.measureElement} className={dash} style={{ transform: `translateY(${v.start}px)` }}>
                  {line ? <MessageRow line={line} prev={lines[v.index - 1]} showAuthor={!!showAuthors} onRetry={onRetry} onAuthorTap={onAuthorTap} onMenu={onReply && onReact ? (l, at) => setMenu({ line: l, at }) : undefined} onReact={onReact} onJump={jump} /> : <TypingDots />}
                </div>
              );
            })}
          </div>
          </div>
        )}
      </div>
      {menu && onReply && onReact ? <MessageMenu line={menu.line} at={menu.at} onClose={() => setMenu(undefined)} onReply={onReply} onReact={onReact} /> : null}
      {unread > 0 ? (
        <button type="button" onClick={() => { virt.scrollToIndex(count - 1, { align: "end" }); setUnread(0); }} className="absolute bottom-3 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full border-2 border-edge bg-accent px-5 text-[15px] font-bold text-accent-fg shadow-sticker">
          <ArrowDown aria-hidden weight="bold" className="size-4" />
          {unread} new
        </button>
      ) : null}
    </div>
  );
}
