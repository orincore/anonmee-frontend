"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { PreferencesSheet } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { intentGroupSummary } from "@/contracts";
import { usePreferences } from "@/hooks/use-preferences";

/** The main thing to do on Home: start matching. Shows what you are looking for, and lets you change it. */
export function StartCard() {
  const { preferences, loading, save } = usePreferences();
  const [editing, setEditing] = useState(false);
  return (
    <section className="rounded-card border-2 border-edge bg-brand p-6 text-brand-fg shadow-sticker md:p-8">
      <h2 className="display text-4xl md:text-5xl">Ready for someone new?</h2>
      <div className="mt-4 min-h-12">
        {loading || !preferences ? (
          <Skeleton className="h-6 w-2/3" />
        ) : (
          <p className="text-lg">
            Looking for <strong>{intentGroupSummary(preferences.intents).join(", ")}</strong>, ages {preferences.minAge} to {preferences.maxAge}.{" "}
            <button type="button" onClick={() => setEditing(true)} className="inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-4">
              Change
            </button>
          </p>
        )}
      </div>
      <Button asChild size="lg" className="mt-4 w-full border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] sm:w-auto">
        <Link href="/chat?go=1">
          Start matching
          <ArrowRight aria-hidden weight="bold" className="size-5" />
        </Link>
      </Button>
      {preferences ? <PreferencesSheet open={editing} onOpenChange={setEditing} value={preferences} onSave={save} /> : null}
    </section>
  );
}
