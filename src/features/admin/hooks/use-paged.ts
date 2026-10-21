"use client";

import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

interface Page<T> { nextCursor: string | null; [k: string]: unknown; items?: T[] }

/**
 * A list that loads a page at a time from an admin endpoint using the server's cursor. `pick` pulls the rows out of
 * the response. Give the component a `key` per filter so it starts fresh when the filter changes.
 */
export function usePaged<T>(path: string, pick: (r: Record<string, unknown>) => T[]) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const url = (after?: string | null) => `${path}${path.includes("?") ? "&" : "?"}limit=25${after ? `&cursor=${after}` : ""}`;

  useEffect(() => {
    let live = true;
    api<Page<T>>(url())
      .then((r) => {
        if (!live) return;
        setItems(pick(r));
        setCursor(r.nextCursor);
      })
      .catch((e) => live && setError(e instanceof ApiError ? e.message : "Could not load."))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload only when the path changes
  }, [path]);

  const more = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api<Page<T>>(url(cursor));
      setItems((p) => [...p, ...pick(r)]);
      setCursor(r.nextCursor);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Could not load.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, path]);

  const remove = (match: (row: T) => boolean) => setItems((p) => p.filter((r) => !match(r)));
  return { items, loading, error, hasMore: !!cursor, loadMore: more, remove };
}
