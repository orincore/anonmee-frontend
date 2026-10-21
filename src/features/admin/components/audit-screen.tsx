"use client";

import { EmptyState, ErrorState, SimpleTable } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ListChecks } from "@phosphor-icons/react";
import { formatDateTime } from "@/lib/format";
import { usePaged } from "../hooks/use-paged";

interface Entry { id: string; adminId: string; action: string; targetUserId: string | null; meta: string | null; at: number }

/** Every time staff opened a person's record or took an action. It can be read but never changed. */
export function AuditScreen() {
  const { items, loading, error, hasMore, loadMore } = usePaged<Entry>("/admin/audit", (r) => r.entries as Entry[]);
  return (
    <div className="space-y-6">
      <h1 className="display text-4xl">Audit log</h1>
      {error && items.length === 0 ? <ErrorState message={error} /> : loading && items.length === 0 ? <Skeleton className="h-64" /> : items.length === 0 ? <EmptyState icon={ListChecks} title="Nothing logged yet" body="Actions appear here as staff use the console." /> : (
        <div className="space-y-4">
          <SimpleTable rows={items} rowKey={(e) => e.id} columns={[
            { key: "t", label: "When", render: (e) => formatDateTime(e.at) },
            { key: "a", label: "Action", render: (e) => <strong>{e.action}</strong> },
            { key: "u", label: "Account", render: (e) => e.targetUserId ? <a className="underline underline-offset-2" href={`/admin/users/${e.targetUserId}`}>{e.targetUserId.slice(0, 8)}</a> : "none" },
            { key: "m", label: "Detail", render: (e) => <span className="font-mono text-xs text-muted">{e.meta ?? ""}</span> },
          ]} />
          {hasMore ? <Button variant="secondary" loading={loading} onClick={loadMore}>Show more</Button> : null}
        </div>
      )}
    </div>
  );
}
