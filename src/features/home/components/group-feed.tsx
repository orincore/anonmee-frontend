"use client";

import { UsersThree } from "@phosphor-icons/react";
import Link from "next/link";
import { EmptyState, ErrorState, GroupCard, type GroupCardData } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api";

/** Groups picked for you: the ones that match your topics and are busy right now come first. */
export function GroupFeed() {
  const { data, error, loading, reload } = useApi<{ groups: GroupCardData[] }>("/groups/feed");
  if (loading && !data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>
    );
  }
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (!data || data.groups.length === 0) {
    return (
      <EmptyState
        icon={UsersThree}
        title="No groups yet"
        body="Be the first. Start one about something you love and everyone can find it."
        action={
          <Button asChild size="sm">
            <Link href="/groups?new=1">Start a group</Link>
          </Button>
        }
      />
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {data.groups.map((g) => (
        <li key={g.id}>
          <GroupCard group={g} />
        </li>
      ))}
    </ul>
  );
}
