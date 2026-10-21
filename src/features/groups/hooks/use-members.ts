"use client";

import { useCallback, useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { PeerView } from "@/contracts";

/** The people inside a group: random name, gender and age, fifty at a time. Call `load` when the list is opened. */
export function useMembers(groupId: string) {
  const [members, setMembers] = useState<PeerView[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchMore = useCallback(
    async (after: string | null) => {
      setLoading(true);
      setError(undefined);
      try {
        const r = await api<{ members: PeerView[]; nextCursor: string | null }>(`/groups/${groupId}/members?limit=50${after ? `&cursor=${after}` : ""}`);
        setMembers((p) => (after ? [...p, ...r.members] : r.members));
        setCursor(r.nextCursor);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : "Could not load members.");
      } finally {
        setLoading(false);
      }
    },
    [groupId],
  );

  return { members, loading, error, hasMore: !!cursor, load: () => fetchMore(null), loadMore: () => fetchMore(cursor) };
}
