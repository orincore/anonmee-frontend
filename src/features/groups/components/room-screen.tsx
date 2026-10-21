"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorState } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api";
import { api, ApiError } from "@/lib/api";
import { RoomView } from "./room-view";

interface GroupInfo { group: { id: string; title: string; topic: string; memberCount: number } }

/** A group: look it up, join it (safe to repeat), then show the room. Leaving takes you back to the list. */
function GroupRoom({ id }: { id: string }) {
  const router = useRouter();
  const info = useApi<GroupInfo>(`/groups/${id}`);
  const [joined, setJoined] = useState(false);
  const [joinError, setJoinError] = useState<string>();
  const found = !!info.data;

  useEffect(() => {
    if (!found) return;
    api(`/groups/${id}/join`, { method: "POST", body: {} })
      .then(() => setJoined(true))
      .catch((e) => setJoinError(e instanceof ApiError ? e.message : "Could not join this group."));
  }, [found, id]);

  if (info.error || joinError) return <div className="mx-auto max-w-xl px-4 pt-16"><ErrorState message={joinError ?? info.error} onRetry={info.reload} /></div>;
  if (!info.data) return <div className="mx-auto max-w-xl space-y-4 px-4 pt-16"><Skeleton className="h-12 w-2/3" /><Skeleton className="h-64" /></div>;
  const g = info.data.group;
  return (
    <RoomView
      roomId={id}
      title={g.title}
      subtitle={`${g.topic}, ${g.memberCount.toLocaleString()} ${g.memberCount === 1 ? "person" : "people"}`}
      enabled={joined}
      showMembers
      onLeave={async () => {
        await api(`/groups/${id}/leave`, { method: "POST", body: {} }).catch(() => {});
        router.replace("/groups");
      }}
    />
  );
}

/** The route for /groups/[id]. The id "global" is the room open to everyone. */
export function RoomScreen({ id }: { id: string }) {
  if (id === "global") return <RoomView roomId="global" title="Everyone" subtitle="Open to all of Anonmee" enabled showMembers={false} />;
  return <GroupRoom key={id} id={id} />;
}
