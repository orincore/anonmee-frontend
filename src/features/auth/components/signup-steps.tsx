import { MIN_AGE } from "@/contracts";
import { AgeRangeField, GenderWantPicker, IntentPicker, TopicPicker } from "@/components/shared";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { TextField } from "@/components/ui/text-field";
import type { SignupDraft, StepId } from "../hooks/use-signup-wizard";
import { latestAdultBirthday } from "../latest-adult-birthday";
import { GenderPicker } from "./gender-picker";
import { PasswordField } from "./password-field";

export interface StepProps {
  draft: SignupDraft;
  errors: Record<string, string>;
  set: <K extends keyof SignupDraft>(key: K, value: SignupDraft[K]) => void;
  /** Marks a field as visited, so its problem (if any) starts showing. */
  touch: (key: string) => void;
}

export const STEP_TEXT: Record<StepId, { title: string; body: string }> = {
  account: { title: "Let us get you in.", body: "Nobody ever sees your email or username." },
  about: { title: "A little about you.", body: "Only your gender and age are ever shown to others." },
  looking: { title: "What are you here for?", body: "Pick as many as you like. You will meet people who chose the same." },
  meet: { title: "Who do you want to meet?", body: "Pick any mix, and the ages you are happy with." },
  topics: { title: "What do you like talking about?", body: "Optional. Groups and chats on these show up first." },
};

function Error({ text }: { text?: string }) {
  return text ? <p role="alert" className="text-sm font-bold text-danger">{text}</p> : null;
}

export function SignupStep({ step, draft, errors, set, touch }: StepProps & { step: StepId }) {
  switch (step) {
    case "account":
      return (
        <div className="space-y-5">
          <TextField label="Email" type="email" inputMode="email" autoComplete="email" hint="Only used to log in. Never shown to anyone." error={errors.email} value={draft.email} onChange={(e) => set("email", e.target.value)} onBlur={() => touch("email")} />
          <PasswordField label="Password" autoComplete="new-password" hint="At least 8 characters." error={errors.password} value={draft.password} onChange={(e) => set("password", e.target.value)} onBlur={() => touch("password")} />
          <TextField label="Username" autoComplete="username" autoCapitalize="none" hint="Private. Other people see a random name instead." error={errors.username} value={draft.username} onChange={(e) => set("username", e.target.value)} onBlur={() => touch("username")} />
        </div>
      );
    case "about":
      return (
        <div className="space-y-5">
          <GenderPicker value={draft.gender} onChange={(g) => set("gender", g)} error={errors.gender ? "Choose one" : undefined} />
          <DatePickerField label="Date of birth" max={latestAdultBirthday()} hint={`You must be ${MIN_AGE} or older. Others see only your age.`} error={errors.dateOfBirth} value={draft.dateOfBirth} onChange={(iso) => set("dateOfBirth", iso)} onTouched={() => touch("dateOfBirth")} />
          <CheckboxField label={`I am ${MIN_AGE} or older.`} error={errors.confirmAdult} checked={draft.confirmAdult} onChange={(e) => set("confirmAdult", e.target.checked)} />
        </div>
      );
    case "looking":
      return (
        <div className="space-y-3">
          <IntentPicker value={draft.intents} onChange={(v) => set("intents", v)} />
          <Error text={errors.intents} />
        </div>
      );
    case "meet":
      return (
        <div className="space-y-5">
          <GenderWantPicker value={draft.wantGenders} onChange={(v) => set("wantGenders", v)} />
          <Error text={errors.wantGenders} />
          <AgeRangeField min={draft.minAge} max={draft.maxAge} onChange={(a, b) => { set("minAge", a); set("maxAge", b); }} error={errors.minAge ?? errors.maxAge} />
        </div>
      );
    case "topics":
      return <TopicPicker value={draft.interests} onChange={(v) => set("interests", v)} />;
  }
}
