import { SITE } from "./site";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly field?: string,
  ) {
    super(message);
  }
}

interface Options {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

let refreshing: Promise<boolean> | null = null;

/** One refresh at a time, shared by every request that hits an expired session together. */
function refreshSession(): Promise<boolean> {
  refreshing ??= fetch(`${SITE.api}/auth/refresh`, { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

async function send(path: string, o: Options): Promise<Response> {
  try {
    return await fetch(`${SITE.api}${path}`, {
      method: o.method ?? "GET",
      credentials: "include",
      signal: o.signal,
      headers: { ...(o.body !== undefined ? { "content-type": "application/json" } : {}), ...o.headers },
      body: o.body !== undefined ? JSON.stringify(o.body) : undefined,
    });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new ApiError(0, "network", "Cannot reach Anonmee. Check your connection and try again.");
  }
}

/** Calls the backend. A 401 triggers one silent session refresh and a single retry. */
export async function api<T>(path: string, o: Options = {}): Promise<T> {
  let res = await send(path, o);
  // The short-lived login token expires every 15 minutes; a quiet refresh keeps people signed in. "Who am I" is included on purpose.
  const refreshable = path === "/auth/me" || (!path.startsWith("/auth/") && !path.startsWith("/admin/"));
  if (res.status === 401 && refreshable && (await refreshSession())) {
    res = await send(path, o);
  }
  const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string; field?: string };
  if (!res.ok) throw new ApiError(res.status, data.error ?? "error", data.message ?? "Something went wrong. Please try again.", data.field);
  return data as T;
}
