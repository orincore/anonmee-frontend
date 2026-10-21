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

function List({ status }: { status: string }) {
  const { items, loading, error, hasMore, loadMore, remove } = usePaged<Escalation>(`/admin/escalations?status=${status}`, (r) => r.escalations as Escalation[]);
  if (error && items.length === 0) return <ErrorState message={error} />;
  if (loading && items.length === 0) return <Skeleton className="h-48" />;
  if (items.length === 0) return <EmptyState icon={Flag} title="All clear" body={`No ${status} reports.`} />;
  return (
    <div className="space-y-4">
      {items.map((i) => <EscalationCard key={i.id} item={i} onDone={(id) => remove((r) => r.id === id)} />)}
      {hasMore ? <Button variant="secondary" loading={loading} onClick={loadMore}>Show more</Button> : null}
    </div>
  );
}

/** The report queue, oldest first, so nothing waits forever. */
export function EscalationsScreen() {
  const [status, setStatus] = useState<string>("open");
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="display text-4xl">Escalations</h1>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Status">
        {STATUSES.map((s) => <Chip key={s} selected={status === s} onClick={() => setStatus(s)}>{s[0]!.toUpperCase() + s.slice(1)}</Chip>)}
      </div>
      <List key={status} status={status} />
    </div>
  );
}
