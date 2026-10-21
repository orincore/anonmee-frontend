"use client";

import { Plus } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { GlobalCard } from "@/features/home/components/global-card";
import { TOPICS } from "@/lib/topics";
import { CreateGroupSheet } from "./create-group-sheet";
import { GroupBrowser } from "./group-browser";

/** The Groups tab: the room for everyone, a topic filter, every open group, and a button to start your own. */
export function GroupsScreen() {
  const [creating, setCreating] = useState(useSearchParams().get("new") === "1");
  const [topic, setTopic] = useState<string>();
  return (
    <PageShell title="Groups" subtitle="Talk about what you love. Anyone can join." width="wide">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button size="lg" onClick={() => setCreating(true)} className="w-full sm:w-auto">
            <Plus aria-hidden weight="bold" className="size-5" />
            Start a group
          </Button>
        </div>
        <GlobalCard />
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            <Chip selected={!topic} onClick={() => setTopic(undefined)}>All</Chip>
            {TOPICS.map((t) => (
              <Chip key={t.slug} selected={topic === t.slug} onClick={() => setTopic(t.slug)}>{t.label}</Chip>
            ))}
          </div>
          <GroupBrowser key={topic ?? "all"} topic={topic} />
        </div>
      </div>
      <CreateGroupSheet open={creating} onOpenChange={setCreating} />
    </PageShell>
  );
}
