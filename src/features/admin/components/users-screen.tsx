"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState, ErrorState, GENDER_LABEL, SimpleTable } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import { TextField } from "@/components/ui/text-field";
import type { Gender } from "@/contracts";
import { formatDateTime } from "@/lib/format";
import { usePaged } from "../hooks/use-paged";

interface UserRow { id: string; email: string; username: string; gender: Gender; age: number; createdAt: number; lastSeenAt: number | null; banned: boolean; channel: string | null }

function Results({ query }: { query: string }) {
  const { items, loading, error, hasMore, loadMore } = usePaged<UserRow>(`/admin/users?${query}`, (r) => r.users as UserRow[]);
  if (error && items.length === 0) return <ErrorState message={error} />;
  if (loading && items.length === 0) return <Skeleton className="h-64" />;
  if (items.length === 0) return <EmptyState icon={MagnifyingGlass} title="No one found" body="Try a different search or filter." />;
  return (
    <div className="space-y-4">
      <SimpleTable
        rows={items}
        rowKey={(u) => u.id}
        columns={[
          { key: "u", label: "User", render: (u) => <Link href={`/admin/users/${u.id}`} className="font-bold underline underline-offset-2">{u.username}</Link> },
          { key: "e", label: "Email", render: (u) => u.email },
          { key: "g", label: "Gender, age", render: (u) => `${GENDER_LABEL[u.gender]}, ${u.age}` },
          { key: "c", label: "Came from", render: (u) => u.channel ?? "unknown" },
          { key: "j", label: "Joined", render: (u) => formatDateTime(u.createdAt) },
          { key: "s", label: "Status", render: (u) => (u.banned ? <span className="font-bold text-danger">Banned</span> : "Active") },
        ]}
      />
      {hasMore ? <Button variant="secondary" loading={loading} onClick={loadMore}>Show more</Button> : null}
    </div>
  );
}

const CHANNELS = ["seo", "llm", "utm", "social", "referral", "direct"];

/** Find any account. Search by the start of an email or username; filter by status and where they came from. */
export function UsersScreen() {
  const [text, setText] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>();
  const [channel, setChannel] = useState<string>();
  useEffect(() => {
    const t = setTimeout(() => setQ(text.trim()), 300); // wait for a pause in typing
    return () => clearTimeout(t);
  }, [text]);
  const query = new URLSearchParams({ ...(q ? { q } : {}), ...(status ? { status } : {}), ...(channel ? { channel } : {}) }).toString();
  return (
    <div className="space-y-6">
      <h1 className="display text-4xl">Users</h1>
      <div className="max-w-md"><TextField label="Search" placeholder="Start of an email or username" value={text} onChange={(e) => setText(e.target.value)} /></div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
        <Chip selected={status === "active"} onClick={() => setStatus(status === "active" ? undefined : "active")}>Active</Chip>
        <Chip selected={status === "banned"} onClick={() => setStatus(status === "banned" ? undefined : "banned")}>Banned</Chip>
        {CHANNELS.map((c) => <Chip key={c} selected={channel === c} onClick={() => setChannel(channel === c ? undefined : c)}>{c}</Chip>)}
      </div>
      <Results key={query} query={query} />
    </div>
  );
}
