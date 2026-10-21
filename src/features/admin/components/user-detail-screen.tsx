"use client";

import { useState } from "react";
import { ErrorState, GENDER_LABEL } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { INTENT_LABELS, type Gender, type Intent } from "@/contracts";
import { useApi } from "@/hooks/use-api";
import { api } from "@/lib/api";
import { formatDateTime } from "@/lib/format";

interface Detail {
  user: {
    id: string; email: string; username: string; gender: Gender; dateOfBirth: string; age: number; createdAt: number; lastSeenAt: number | null;
    emailVerified: boolean; bannedAt: number | null;
    acquisition: { channel: string | null; source: string | null; campaign: string | null };
    preferences: { intents: Intent[]; wantGenders: Gender[]; minAge: number; maxAge: number; interests: string[] } | null;
    counts: Record<string, number>;
  };
}

const COUNT_LABELS: Record<string, string> = { matches: "Matches", blocksGiven: "Blocked others", blocksReceived: "Blocked by others", reportsMade: "Reports made", reportsReceived: "Reports received", groupsOwned: "Groups started", activeSessions: "Signed-in devices" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t-2 border-line py-3 sm:grid-cols-[12rem_1fr]">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="font-bold">{children}</dd>
    </div>
  );
}

/** Everything the system holds about one account. Opening this page is itself recorded in the audit log. */
export function UserDetailScreen({ id }: { id: string }) {
  const { data, error, loading, reload } = useApi<Detail>(`/admin/users/${id}`);
  const [busy, setBusy] = useState(false);
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (loading && !data) return <Skeleton className="h-96" />;
  if (!data) return null;
  const u = data.user;
  const banned = !!u.bannedAt;

  async function toggle() {
    setBusy(true);
    await api(`/admin/users/${id}/status`, { method: "POST", body: { banned: !banned } }).catch(() => {});
    setBusy(false);
    reload();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="display text-4xl">{u.username}</h1>
          <p className="text-muted">{banned ? `Banned ${formatDateTime(u.bannedAt!)}` : "Active account"}</p>
        </div>
        <Button variant={banned ? "primary" : "danger"} loading={busy} onClick={toggle}>{banned ? "Unban" : "Ban account"}</Button>
      </header>
      <dl>
        <Field label="Email">{u.email}{u.emailVerified ? "" : " (not verified)"}</Field>
        <Field label="Gender, age">{GENDER_LABEL[u.gender]}, {u.age}</Field>
        <Field label="Date of birth">{u.dateOfBirth}</Field>
        <Field label="Joined">{formatDateTime(u.createdAt)}</Field>
        <Field label="Last seen">{u.lastSeenAt ? formatDateTime(u.lastSeenAt) : "never"}</Field>
        <Field label="Came from">{[u.acquisition.channel, u.acquisition.source, u.acquisition.campaign].filter(Boolean).join(" / ") || "unknown"}</Field>
        {u.preferences ? (
          <>
            <Field label="Here for">{u.preferences.intents.map((i) => INTENT_LABELS[i]).join(", ")}</Field>
            <Field label="Wants to meet">{u.preferences.wantGenders.map((g) => GENDER_LABEL[g]).join(", ")}, ages {u.preferences.minAge} to {u.preferences.maxAge}</Field>
            <Field label="Topics">{u.preferences.interests.join(", ") || "none"}</Field>
          </>
        ) : null}
        {Object.entries(u.counts).map(([k, v]) => <Field key={k} label={COUNT_LABELS[k] ?? k}>{v}</Field>)}
      </dl>
    </div>
  );
}
