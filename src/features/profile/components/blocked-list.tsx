"use client";

import { Prohibit } from "@phosphor-icons/react";
import { EmptyState, ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlocks } from "../hooks/use-blocks";

/** Everyone you have blocked, by the random name they had. Unblock puts them back in the pool. */
export function BlockedList() {
  const { blocks, error, loading, reload, unblock } = useBlocks();
  if (loading && blocks.length === 0) return <Skeleton className="h-16" />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (blocks.length === 0) return <EmptyState icon={Prohibit} title="No one blocked" body="If someone bothers you, block them from any chat. They will never be matched with you again." />;
  return (
    <ul className="divide-y-2 divide-line rounded-card border-2 border-edge bg-surface">
      {blocks.map((b) => (
        <li key={b.id} className="flex min-h-16 items-center justify-between gap-3 px-4 py-2">
          <span className="font-bold">{b.alias}</span>
          <Button variant="secondary" size="sm" onClick={() => unblock(b.id)}>Unblock</Button>
        </li>
      ))}
    </ul>
  );
}
