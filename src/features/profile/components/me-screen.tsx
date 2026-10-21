"use client";

import { SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/layout";
import { PreferencesSheet, ThemeToggle } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { intentGroupSummary } from "@/contracts";
import { usePreferences } from "@/hooks/use-preferences";
import { useAuth } from "@/providers/auth-provider";
import { BlockedList } from "./blocked-list";
import { DeleteAccountSheet } from "./delete-account-sheet";
import { ProfileCard } from "./profile-card";

/** The Me tab: your details, what you are looking for, who you have blocked, theme and log out. */
export function MeScreen() {
  const { state, logout } = useAuth();
  const { preferences, save } = usePreferences();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  if (state.status !== "authed") return null;

  return (
    <PageShell title="Me" width="wide">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <ProfileCard me={state.me} />
          <section className="space-y-3" aria-labelledby="looking">
            <h2 id="looking" className="display text-3xl">What I am looking for</h2>
            <p className="text-lg text-muted">
              {preferences ? `${intentGroupSummary(preferences.intents).join(", ")}, ages ${preferences.minAge} to ${preferences.maxAge}.` : "Loading"}
            </p>
            <Button variant="secondary" onClick={() => setEditing(true)} disabled={!preferences}>Change</Button>
          </section>
        </div>
        <div className="space-y-8">
          <section className="space-y-3" aria-labelledby="blocked">
            <h2 id="blocked" className="display text-3xl">Blocked</h2>
            <BlockedList />
          </section>
          <section className="flex items-center justify-between gap-4 border-t-2 border-line pt-6">
            <span className="font-bold">Theme</span>
            <ThemeToggle />
          </section>
          <Button variant="danger" size="lg" block onClick={async () => { await logout(); router.replace("/"); }}>
            <SignOut aria-hidden weight="bold" className="size-5" />
            Log out
          </Button>
          <section className="space-y-2 border-t-2 border-line pt-6" aria-labelledby="legal">
            <h2 id="legal" className="display text-2xl">Your data</h2>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-4">
              {[["/privacy", "Privacy"], ["/terms", "Terms"], ["/your-data", "Your data rights"]].map(([href, label]) => (
                <Link key={href} href={href} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">{label}</Link>
              ))}
            </nav>
            <button type="button" onClick={() => setDeleting(true)} className="inline-flex min-h-11 items-center font-bold text-danger underline underline-offset-4">Delete my account</button>
          </section>
        </div>
      </div>
      <DeleteAccountSheet open={deleting} onOpenChange={setDeleting} />
      {preferences ? <PreferencesSheet open={editing} onOpenChange={setEditing} value={preferences} onSave={save} /> : null}
    </PageShell>
  );
}
