"use client";

import { useState } from "react";
import { ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api";
import { api, ApiError } from "@/lib/api";
import { useAdmin } from "./admin-gate";

interface SwitchState { on: boolean; lockedByEnv: boolean }

/** Master switch for every AI user (1:1 partners, global chat and group chatter). Only the owner can flip it; each flip is audited. */
export function AiSwitch() {
  const { role } = useAdmin();
  const { data, error, loading, reload } = useApi<SwitchState>("/admin/bots/switch");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string>();
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (loading && !data) return <Skeleton className="h-24" />;
  if (!data) return null;

  async function flip() {
    setBusy(true);
    setProblem(undefined);
    try {
      await api("/admin/bots/switch", { method: "POST", body: { on: !data!.on } });
      reload();
    } catch (e) {
      setProblem(e instanceof ApiError ? e.message : "Could not change it.");
    } finally {
      setBusy(false);
    }
  }

  const live = data.on && !data.lockedByEnv;
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-card border-2 border-edge bg-surface p-5 shadow-sticker" aria-label="AI users">
      <div className="max-w-xl">
        <h2 className="display text-2xl">AI users: {live ? "on" : "off"}</h2>
        <p className="text-sm text-muted">
          {data.lockedByEnv
            ? "Turned off in the server settings. Change BOTS_ENABLED to bring them back."
            : live
              ? "They chat in global and groups, and step in when nobody is waiting to match. Turning them off ends new AI chats at once; chats already running finish on their own."
              : "No AI chatter and no AI matches. People wait for a real match."}
        </p>
        {problem ? <p role="alert" className="mt-2 text-sm font-bold text-danger">{problem}</p> : null}
      </div>
      {role === "owner" && !data.lockedByEnv ? (
        <Button variant={live ? "danger" : "primary"} loading={busy} onClick={flip}>{live ? "Turn off" : "Turn on"}</Button>
      ) : (
        <p className="text-sm text-muted">{data.lockedByEnv ? "" : "Owner only"}</p>
      )}
    </section>
  );
}
