"use client";

import { Flag } from "@phosphor-icons/react";
import { useState } from "react";
import { EmptyState, ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaged } from "../hooks/use-paged";
import { EscalationCard, type Escalation } from "./escalation-card";

const STATUSES = ["open", "reviewed", "actioned", "dismissed"] as const;

/** `severity` splits the queue: the AI-flagged threats are pinned above the rest while the rest stays oldest first. */
function List({ status, severity = "all" }: { status: string; severity?: "all" | "severe" | "normal" }) {
  const { items, loading, error, hasMore, loadMore, remove } = usePaged<Escalation>(`/admin/escalations?status=${status}&severity=${severity}`, (r) => r.escalations as Escalation[]);
  if (error && items.length === 0) return <ErrorState message={error} />;
  if (loading && items.length === 0) return <Skeleton className="h-48" />;
  if (items.length === 0) return severity === "severe" ? null : <EmptyState icon={Flag} title="All clear" body={`No ${status} reports.`} />;
  return (
    <div className="space-y-4">
      {items.map((i) => <EscalationCard key={i.id} item={i} onDone={(id) => remove((r) => r.id === id)} />)}
      {hasMore ? <Button variant="secondary" loading={loading} onClick={loadMore}>Show more</Button> : null}
    </div>
  );
}

/** The report queue, oldest first so nothing waits forever, with serious threats pinned above it. */
export function EscalationsScreen() {
  const [status, setStatus] = useState<string>("open");
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="display text-4xl">Escalations</h1>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Status">
        {STATUSES.map((s) => <Chip key={s} selected={status === s} onClick={() => setStatus(s)}>{s[0]!.toUpperCase() + s.slice(1)}</Chip>)}
      </div>
      {status === "open" ? (
        <>
          <section aria-label="Severe threats" className="space-y-4 empty:hidden">
            <List key="severe" status={status} severity="severe" />
          </section>
          <List key="normal" status={status} severity="normal" />
        </>
      ) : (
        <List key={status} status={status} />
      )}
    </div>
  );
}
