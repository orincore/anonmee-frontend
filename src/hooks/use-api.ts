"use client";

import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

export interface ApiState<T> {
  data: T | undefined;
  error: string | undefined;
  loading: boolean;
  reload: () => void;
}

/**
 * Loads one GET endpoint with loading and error states and a retry. Stale answers are dropped.
 * Give the component a `key` when the path changes so it starts fresh.
 */
export function useApi<T>(path: string): ApiState<T> {
  const [state, setState] = useState<{ data?: T; error?: string; loading: boolean }>({ loading: true });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let live = true;
    api<T>(path)
      .then((data) => live && setState({ data, loading: false }))
      .catch((e) => live && setState((s) => ({ data: s.data, error: e instanceof ApiError ? e.message : "Something went wrong.", loading: false })));
    return () => {
      live = false;
    };
  }, [path, tick]);

  const reload = useCallback(() => {
    setState((s) => ({ data: s.data, loading: true }));
    setTick((t) => t + 1);
  }, []);

  return { data: state.data, error: state.error, loading: state.loading, reload };
}
