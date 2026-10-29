"use client";

import { ChatsCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { EmptyState, ErrorState, GENDER_LABEL } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import { INTENT_LABELS, type Gender, type Intent } from "@/contracts";
import { formatDateTime } from "@/lib/format";
import { usePaged } from "../hooks/use-paged";

interface RoomMessage { id: string; text: string; alias: string; at: number; roomId: string; place: "global" | "group"; roomName: string }
interface ChatRow {
  id: string; intent: Intent; startedAt: number; endedAt: number | null; endedReason: string | null;
  partner: { gender: Gender; age: number; ai: boolean };
  reports: { reason: string; evidence: string | null }[];
}

function duration(from: number, to: number | null): string {
  if (!to) return "still open or not recorded";
  const s = Math.max(Math.round((to - from) / 1000), 0);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function RoomMessages({ userId }: { userId: string }) {
  const { items, loading, error, hasMore, loadMore } = usePaged<RoomMessage>(`/admin/users/${userId}/activity?kind=rooms`, (r) => r.messages as RoomMessage[]);
  if (error && items.length === 0) return <ErrorState message={error} />;
  if (loading && items.length === 0) return <Skeleton className="h-48" />;
  if (items.length === 0) return <EmptyState icon={ChatsCircle} title="No room messages" body="Nothing in global chat or groups inside the retention window (7 days)." />;
  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {items.map((m) => (
          <li key={m.id} className="rounded-ui border-2 border-line p-3">
            <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
              <span className="font-bold text-fg">{m.place === "global" ? "Global chat" : `Group: ${m.roomName}`}</span>
              <span>as {m.alias}</span>
              <span className="font-mono">{formatDateTime(m.at)}</span>
            </p>
            <p className="mt-1 whitespace-pre-wrap break-words">{m.text}</p>
          </li>
        ))}
      </ul>
      {hasMore ? <Button variant="secondary" loading={loading} onClick={loadMore}>Show more</Button> : null}
    </div>
  );
}

function Chats({ userId }: { userId: string }) {
  const { items, loading, error, hasMore, loadMore } = usePaged<ChatRow>(`/admin/users/${userId}/activity?kind=chats`, (r) => r.chats as ChatRow[]);
  if (error && items.length === 0) return <ErrorState message={error} />;
  if (loading && items.length === 0) return <Skeleton className="h-48" />;
  if (items.length === 0) return <EmptyState icon={ChatsCircle} title="No 1:1 chats" body="This person has not been matched yet." />;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">1:1 chats are deleted when they end. Only messages saved with a report are shown.</p>
      <ul className="space-y-2">
        {items.map((c) => (
          <li key={c.id} className="rounded-ui border-2 border-line p-3">
            <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
              <span className="font-bold text-fg">{c.partner.ai ? "AI user" : "Real person"}, {GENDER_LABEL[c.partner.gender]}, {c.partner.age}</span>
              <span>{INTENT_LABELS[c.intent] ?? c.intent}</span>
              <span className="font-mono">{formatDateTime(c.startedAt)}</span>
            </p>
            <p className="text-sm">Lasted {duration(c.startedAt, c.endedAt)}{c.endedReason ? `, ended: ${c.endedReason}` : ""}</p>
            {c.reports.map((r, i) => (
              <div key={i} className="mt-2 rounded-ui bg-elevated p-2 text-sm">
                <p className="font-bold">Report: {r.reason}</p>
                {r.evidence ? <p className="mt-1 whitespace-pre-wrap break-words">{r.evidence}</p> : <p className="text-muted">Evidence cleared after review.</p>}
              </div>
            ))}
          </li>
        ))}
      </ul>
      {hasMore ? <Button variant="secondary" loading={loading} onClick={loadMore}>Show more</Button> : null}
    </div>
  );
}

/** Where this person has been talking, so a report can be judged in context. Opening it is written to the audit log. */
export function UserActivity({ userId }: { userId: string }) {
  const [tab, setTab] = useState<"rooms" | "chats">("rooms");
  return (
    <section className="space-y-4" aria-label="Messages and chats">
      <h2 className="display text-2xl">Where they chat</h2>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Kind">
        <Chip selected={tab === "rooms"} onClick={() => setTab("rooms")}>Global and groups</Chip>
        <Chip selected={tab === "chats"} onClick={() => setTab("chats")}>1:1 chats</Chip>
      </div>
      {tab === "rooms" ? <RoomMessages key="rooms" userId={userId} /> : <Chats key="chats" userId={userId} />}
    </section>
  );
}
