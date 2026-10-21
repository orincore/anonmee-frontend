"use client";

import { useState } from "react";
import { GENDER_LABEL } from "@/components/shared";
import { Button } from "@/components/ui/button";
import type { Gender } from "@/contracts";
import { api } from "@/lib/api";
import { timeAgo } from "@/lib/format";

export interface Escalation {
  id: string; reason: string; evidence: string | null; status: string; createdAt: number;
  reported: { id: string; username: string; gender: Gender; age: number; banned: boolean; distinctReporters: number };
}

const ACTIONS = [
  { action: "dismiss", label: "Dismiss", variant: "secondary" },
  { action: "warn", label: "Warn", variant: "secondary" },
  { action: "suspend", label: "Suspend", variant: "danger" },
  { action: "ban", label: "Ban", variant: "danger" },
] as const;

/** One report: who, why, the saved words, and the actions. Everything you do is written to the audit log. */
export function EscalationCard({ item, onDone }: { item: Escalation; onDone: (id: string) => void }) {
  const [busy, setBusy] = useState<string>();
  const [error, setError] = useState<string>();
  const r = item.reported;

  async function act(action: string) {
    setBusy(action);
    setError(undefined);
    try {
      await api(`/admin/escalations/${item.id}/action`, { method: "POST", body: { action } });
      onDone(item.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed.");
      setBusy(undefined);
    }
  }

  return (
    <article className="space-y-4 rounded-card border-2 border-edge bg-surface p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-bold">{item.reason}</p>
        <p className="font-mono text-xs text-muted">{timeAgo(item.createdAt)}</p>
      </header>
      <p className="text-[15px]">
        <a href={`/admin/users/${r.id}`} className="font-bold underline underline-offset-2">{r.username}</a>, {GENDER_LABEL[r.gender]}, {r.age}.{" "}
        {r.distinctReporters} {r.distinctReporters === 1 ? "person has" : "people have"} reported them.{r.banned ? " Already banned." : ""}
      </p>
      {item.evidence ? <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-ui bg-elevated p-3 text-sm">{item.evidence}</pre> : <p className="text-sm text-muted">No messages saved.</p>}
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => (
          <Button key={a.action} size="sm" variant={a.variant} loading={busy === a.action} disabled={!!busy} onClick={() => act(a.action)}>{a.label}</Button>
        ))}
        {r.banned ? <Button size="sm" variant="primary" loading={busy === "unban"} disabled={!!busy} onClick={() => act("unban")}>Unban</Button> : null}
      </div>
      {error ? <p role="alert" className="text-sm font-bold text-danger">{error}</p> : null}
    </article>
  );
}
