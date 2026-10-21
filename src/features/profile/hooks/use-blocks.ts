"use client";

import { useCallback } from "react";
import { useApi } from "@/hooks/use-api";
import { api } from "@/lib/api";

export interface BlockedPerson { id: string; alias: string; at: number }

/** People you have blocked, shown by the random name they had when it happened. Never a real identity. */
export function useBlocks() {
  const { data, error, loading, reload } = useApi<{ blocks: BlockedPerson[] }>("/moderation/blocks");
  const unblock = useCallback(async (id: string) => {
    await api(`/moderation/blocks/${id}`, { method: "DELETE" });
    reload();
  }, [reload]);
  return { blocks: data?.blocks ?? [], error, loading, reload, unblock };
}
