"use client";

import { useCallback } from "react";
import type { ReportReason } from "@/contracts";
import { api } from "@/lib/api";

/** Report and block people in a chat or group, by the random name everyone sees. The server works out who it is. */
export function useModeration(roomId: string) {
  const report = useCallback(
    async (alias: string, reason: ReportReason, details: string) => {
      await api("/moderation/report", { method: "POST", body: { roomId, alias, reason, details, alsoBlock: true } });
    },
    [roomId],
  );
  const block = useCallback(async (alias: string) => {
    await api("/moderation/block", { method: "POST", body: { roomId, alias } });
  }, [roomId]);
  return { report, block };
}
