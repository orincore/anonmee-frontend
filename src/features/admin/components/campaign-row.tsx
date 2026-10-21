"use client";

import { Archive, Copy } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { formatDateTime } from "@/lib/format";

export interface Campaign {
  id: string; code: string; name: string; source: string; medium: string; campaign: string; archived: boolean; createdAt: number;
  shortLink: string; fullUrl: string; visits: number; visitors: number; signups: number;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <Button size="sm" variant="secondary" onClick={async () => { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); }}>
      <Copy aria-hidden weight="bold" className="size-4" />
      {done ? "Copied" : label}
    </Button>
  );
}

/** One tracked link with its numbers and quick copy buttons. */
export function CampaignRow({ c, canEdit, onArchived }: { c: Campaign; canEdit: boolean; onArchived: () => void }) {
  return (
    <article className="space-y-3 rounded-card border-2 border-edge bg-surface p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="display text-2xl">{c.name}</h3>
        <p className="font-mono text-xs text-muted">{c.source} / {c.medium} / {c.campaign}, made {formatDateTime(c.createdAt)}</p>
      </header>
      <p className="break-all font-mono text-sm text-muted">{c.shortLink}</p>
      <dl className="grid grid-cols-3 gap-3 text-center">
        {[["Visits", c.visits], ["Visitors", c.visitors], ["Sign-ups", c.signups]].map(([k, v]) => (
          <div key={k as string} className="rounded-ui bg-elevated p-3"><dt className="text-xs text-muted">{k}</dt><dd className="display text-2xl">{(v as number).toLocaleString()}</dd></div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2">
        <CopyButton text={c.shortLink} label="Copy short link" />
        <CopyButton text={c.fullUrl} label="Copy full link" />
        {canEdit && !c.archived ? (
          <Button size="sm" variant="ghost" onClick={async () => { await api(`/admin/campaigns/${c.id}/archive`, { method: "POST", body: {} }); onArchived(); }}>
            <Archive aria-hidden weight="bold" className="size-4" />
            Archive
          </Button>
        ) : null}
        {c.archived ? <span className="inline-flex min-h-11 items-center font-bold text-muted">Archived</span> : null}
      </div>
    </article>
  );
}
