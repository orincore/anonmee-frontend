"use client";

import { Megaphone } from "@phosphor-icons/react";
import { useState } from "react";
import { EmptyState, ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdmin } from "./admin-gate";
import { CampaignForm } from "./campaign-form";
import { CampaignRow, type Campaign } from "./campaign-row";
import { usePaged } from "../hooks/use-paged";

function List({ canEdit, version, onChanged }: { canEdit: boolean; version: number; onChanged: () => void }) {
  const { items, loading, error, hasMore, loadMore } = usePaged<Campaign>(`/admin/campaigns?v=${version}`, (r) => r.campaigns as Campaign[]);
  if (error && items.length === 0) return <ErrorState message={error} />;
  if (loading && items.length === 0) return <Skeleton className="h-40" />;
  if (items.length === 0) return <EmptyState icon={Megaphone} title="No tracked links yet" body="Make one, share it, and see exactly what it brings in." />;
  return (
    <div className="space-y-4">
      {items.map((c) => <CampaignRow key={c.id} c={c} canEdit={canEdit} onArchived={onChanged} />)}
      {hasMore ? <Button variant="secondary" loading={loading} onClick={loadMore}>Show more</Button> : null}
    </div>
  );
}

/** Tracked links for every place you share Anonmee, with visits and sign-ups for each. Only owners can create them. */
export function CampaignsScreen() {
  const { role } = useAdmin();
  const [version, setVersion] = useState(0);
  const canEdit = role === "owner";
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="display text-4xl">Campaigns</h1>
      {canEdit ? <CampaignForm onCreated={() => setVersion((v) => v + 1)} /> : null}
      <List key={version} canEdit={canEdit} version={version} onChanged={() => setVersion((v) => v + 1)} />
    </div>
  );
}
