"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GroupCardData } from "@/components/shared";
import { api, ApiError } from "@/lib/api";

interface Page { groups: GroupCardData[]; nextCursor: string | null }

const fetchPage = (topic: string | undefined, after?: string | null) =>
  api<Page>(`/groups?${new URLSearchParams({ limit: "20", ...(topic ? { topic } : {}), ...(after ? { cursor: after } : {}) })}`);

/** Browse open groups newest first, optionally one topic, a page at a time with the server's cursor. Give it a `key` per topic. */
export function useGroupBrowse(topic: string | undefined) {
  const [groups, setGroups] = useState<GroupCardData[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const busy = useRef(false);

  const apply = useCallback((r: Page) => {
    setGroups((p) => [...p, ...r.groups.filter((g) => !p.some((x) => x.id === g.id))]);
    setCursor(r.nextCursor);
  }, []);
  const fail = (e: unknown) => setError(e instanceof ApiError ? e.message : "Could not load groups.");

  // First page: a plain promise chain, so state is only set once the answer arrives.
  useEffect(() => {
    let live = true;
    fetchPage(topic)
      .then((r) => live && apply(r))
      .catch((e) => live && fail(e))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [topic, apply]);

  const more = useCallback(
    async (after: string | null) => {
      if (busy.current) return;
      busy.current = true;
      setLoading(true);
      setError(undefined);
      try {
        apply(await fetchPage(topic, after));
      } catch (e) {
        fail(e);
      } finally {
        busy.current = false;
        setLoading(false);
      }
    },
    [topic, apply],
  );

  return { groups, loading, error, hasMore: !!cursor, loadMore: () => more(cursor), retry: () => more(cursor) };
}
