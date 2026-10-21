"use client";

import { useCallback } from "react";
import type { Preferences } from "@/contracts";
import { api } from "@/lib/api";
import { useApi } from "./use-api";

/** The signed-in person's matching preferences: what they want, who, and the age range. */
export function usePreferences() {
  const { data, error, loading, reload } = useApi<{ preferences: Preferences }>("/preferences");
  const save = useCallback(
    async (next: Preferences) => {
      await api("/preferences", { method: "PUT", body: next });
      reload();
    },
    [reload],
  );
  return { preferences: data?.preferences, error, loading, reload, save };
}
