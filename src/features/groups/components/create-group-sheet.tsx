"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createGroupSchema } from "@/contracts";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TextField } from "@/components/ui/text-field";
import { api, ApiError } from "@/lib/api";
import { TOPICS } from "@/lib/topics";

function Form() {
  const router = useRouter();
  // One key per open sheet: tapping Create twice, or retrying after a bad connection, never makes two groups.
  const key = useRef(crypto.randomUUID());
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function submit() {
    const parsed = createGroupSchema.safeParse({ title, topic, description });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message);
    setBusy(true);
    setError(undefined);
    try {
      const r = await api<{ group: { id: string } }>("/groups", { method: "POST", body: parsed.data, headers: { "idempotency-key": key.current } });
      router.push(`/groups/${r.group.id}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Could not create the group.");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <TextField label="Group name" value={title} maxLength={60} onChange={(e) => setTitle(e.target.value)} hint="What is it about? Keep it short." />
      <div className="space-y-2">
        <TextField label="Topic" value={topic} maxLength={24} onChange={(e) => setTopic(e.target.value)} hint="People who like this topic will see your group first." />
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Chip key={t.slug} selected={topic === t.slug} onClick={() => setTopic(t.slug)}>
              {t.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="group-description" className="block text-[15px] font-semibold">Description (optional)</label>
        <textarea id="group-description" value={description} maxLength={280} rows={3} onChange={(e) => setDescription(e.target.value)} className="w-full resize-none rounded-ui border-2 border-line bg-surface p-3 text-base focus:border-edge" />
      </div>
      {error ? <p role="alert" className="text-[15px] font-bold text-danger">{error}</p> : null}
      <Button size="lg" block loading={busy} onClick={submit}>Create group</Button>
    </div>
  );
}

export function CreateGroupSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Start a group" description="Anyone can join. There is no member limit.">
        <Form />
      </SheetContent>
    </Sheet>
  );
}
