"use client";

import { useState } from "react";
import { preferencesSchema, type Preferences } from "@/contracts";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AgeRangeField } from "./age-range-field";
import { GenderWantPicker } from "./gender-want-picker";
import { IntentPicker } from "./intent-picker";
import { TopicPicker } from "./topic-picker";

export interface PreferencesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Preferences;
  /** Resolves when saved; throw to show the message. */
  onSave: (next: Preferences) => Promise<void>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-[15px] font-bold">{title}</legend>
      {children}
    </fieldset>
  );
}

function Form({ value, onSave, onDone }: { value: Preferences; onSave: PreferencesSheetProps["onSave"]; onDone: () => void }) {
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);

  async function submit() {
    const parsed = preferencesSchema.safeParse(draft);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Check your choices.");
    setSaving(true);
    try {
      await onSave(parsed.data);
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <Section title="I am here for">
        <IntentPicker value={draft.intents} onChange={(intents) => setDraft({ ...draft, intents })} />
      </Section>
      <Section title="I want to meet">
        <GenderWantPicker value={draft.wantGenders} onChange={(wantGenders) => setDraft({ ...draft, wantGenders })} />
      </Section>
      <AgeRangeField min={draft.minAge} max={draft.maxAge} onChange={(minAge, maxAge) => setDraft({ ...draft, minAge, maxAge })} />
      <Section title="Topics I like">
        <TopicPicker value={draft.interests} onChange={(interests) => setDraft({ ...draft, interests })} />
      </Section>
      {error ? <p role="alert" className="text-[15px] font-bold text-danger">{error}</p> : null}
      <Button size="lg" block loading={saving} onClick={submit}>
        Save
      </Button>
    </div>
  );
}

/** Edit what you are looking for. The form restarts from the saved values each time it opens. */
export function PreferencesSheet({ open, onOpenChange, value, onSave }: PreferencesSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="What are you looking for?" description="Pick as many as you like. This applies to your next match.">
        <Form value={value} onSave={onSave} onDone={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
