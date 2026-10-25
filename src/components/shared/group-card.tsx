"use client";

import Link from "next/link";
import { useUnread } from "@/providers/unread-provider";
import { cn } from "@/lib/cn";

export interface GroupCardData {
  id: string;
  title: string;
  topic: string;
  description: string;
  memberCount: number;
}

const TONES = ["bg-accent text-accent-fg", "bg-pop text-pop-fg", "bg-brand text-brand-fg"] as const;
const tone = (topic: string) => TONES[[...topic].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length];

/** One group in a list. The whole card is the link. Shows only public things: title, topic, and how many are inside. */
export function GroupCard({ group, className }: { group: GroupCardData; className?: string }) {
  const { groupUnreads } = useUnread();
  const unread = groupUnreads[group.id] ?? 0;

  return (
    <Link
      href={`/groups/${group.id}`}
      className={cn(
        "relative block rounded-card border-2 border-edge bg-surface p-5 shadow-sticker transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--edge)] active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:transition-none",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={cn("inline-block -rotate-1 rounded-full border-2 border-edge px-3 py-0.5 text-sm font-bold", tone(group.topic))}>
          {group.topic}
        </span>
        {unread > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full border border-edge bg-brand px-2.5 py-0.5 font-mono text-xs font-bold text-brand-fg shadow-sticker-sm">
            <span>{unread > 99 ? "99+" : unread}</span>
            <span className="font-sans text-[11px] font-normal">new</span>
          </span>
        )}
      </div>
      <h3 className="display mt-3 text-3xl">{group.title}</h3>
      {group.description ? <p className="mt-1.5 line-clamp-2 text-[15px] text-muted">{group.description}</p> : null}
      <p className="mt-4 font-mono text-[13px] uppercase tracking-wide text-muted">
        {group.memberCount.toLocaleString()} {group.memberCount === 1 ? "person" : "people"} inside
      </p>
    </Link>
  );
}
