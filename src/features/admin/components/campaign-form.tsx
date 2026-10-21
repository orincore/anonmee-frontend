"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { api, ApiError } from "@/lib/api";

const EMPTY = { name: "", source: "", medium: "", campaign: "", content: "", targetPath: "/" };

/** Make a tracked link. Names are lowercased so "Reddit" and "reddit" never count as two different sources. */
export function CampaignForm({ onCreated }: { onCreated: () => void }) {
  const [f, setF] = useState(EMPTY);
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(undefined);
    try {
      await api("/admin/campaigns", { method: "POST", body: { ...f, content: f.content || undefined } });
      setF(EMPTY);
      onCreated();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create the link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-card border-2 border-edge bg-surface p-5 shadow-sticker">
      <h2 className="display text-2xl">New tracked link</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Name" hint="For you only, for example Reddit launch." value={f.name} onChange={set("name")} />
        <TextField label="Source" hint="Where you post it: reddit, instagram, newsletter." value={f.source} onChange={set("source")} />
        <TextField label="Medium" hint="What kind: post, story, email, paid." value={f.medium} onChange={set("medium")} />
        <TextField label="Campaign" hint="The push it belongs to: launch, spring." value={f.campaign} onChange={set("campaign")} />
        <TextField label="Variant (optional)" hint="To compare two posts." value={f.content} onChange={set("content")} />
        <TextField label="Lands on" hint="A page on the site, like / or /safety." value={f.targetPath} onChange={set("targetPath")} />
      </div>
      {error ? <p role="alert" className="font-bold text-danger">{error}</p> : null}
      <Button type="submit" loading={busy}>Create link</Button>
    </form>
  );
}
