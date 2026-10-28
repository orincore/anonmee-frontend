"use client";

import { ChatsCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useUnread } from "@/providers/unread-provider";
import { formatUnread } from "@/lib/format";

/** A link into the room everybody shares. */
export function GlobalCard() {
  const { globalUnread } = useUnread();

  return (
    <Link
      href="/groups/global"
      className="flex items-center gap-4 rounded-card border-2 border-edge bg-pop p-5 text-pop-fg shadow-sticker transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--edge)] active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:transition-none"
    >
      <ChatsCircle aria-hidden weight="bold" className="size-10 shrink-0" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="display block text-2xl">Everyone</span>
          {globalUnread > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-edge bg-brand px-2.5 py-0.5 font-mono text-xs font-bold text-brand-fg shadow-sticker-sm">
              <span>{formatUnread(globalUnread)}</span>
              <span className="font-sans text-[11px] font-normal">new</span>
            </span>
          )}
        </span>
        <span className="block text-[15px]">The room open to all of Anonmee. Say hi.</span>
      </span>
    </Link>
  );
}
