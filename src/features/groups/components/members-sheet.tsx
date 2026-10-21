"use client";

import { useEffect } from "react";
import { ErrorState, PeerBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembers } from "../hooks/use-members";

function List({ groupId }: { groupId: string }) {
  const { members, loading, error, hasMore, load, loadMore } = useMembers(groupId);
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once when the sheet opens
  }, []);
  if (error) return <ErrorState message={error} onRetry={load} />;
  return (
    <div className="space-y-4">
      <ul className="max-h-[50dvh] space-y-3 overflow-y-auto pr-1">
        {members.map((m) => (
          <li key={m.alias}>
            <PeerBadge peer={m} />
          </li>
        ))}
      </ul>
      {loading ? <Skeleton className="h-12" /> : null}
      {hasMore && !loading ? <Button variant="secondary" block onClick={loadMore}>Show more</Button> : null}
    </div>
  );
}

/** Who is in the group. Only random names, gender and age, as everywhere. */
export function MembersSheet({ open, onOpenChange, groupId }: { open: boolean; onOpenChange: (o: boolean) => void; groupId: string }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Who is here" description="Everyone is anonymous. Names change in every group.">
        <List groupId={groupId} />
      </SheetContent>
    </Sheet>
  );
}
