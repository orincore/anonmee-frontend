"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GENDERS, MIN_AGE, preferencesSchema, registerSchema, type Gender, type Intent } from "@/contracts";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";

export interface SignupDraft {
  email: string;
  password: string;
  username: string;
  gender: Gender | undefined;
  dateOfBirth: string;
  confirmAdult: boolean;
  intents: Intent[];
  wantGenders: Gender[];
  minAge: number;
  maxAge: number;
  interests: string[];
}

export const STEPS = ["account", "about", "looking", "meet", "topics"] as const;
export type StepId = (typeof STEPS)[number];

const FIRST_DRAFT: SignupDraft = {
  email: "", password: "", username: "", gender: undefined, dateOfBirth: "", confirmAdult: false,
  intents: [], wantGenders: [...GENDERS], minAge: MIN_AGE, maxAge: 99, interests: [],
};

const FIELDS_BY_STEP: Record<StepId, string[]> = {
  account: ["email", "password", "username"],
  about: ["gender", "dateOfBirth", "confirmAdult"],
  looking: ["intents"],
  meet: ["wantGenders", "minAge", "maxAge"],
  topics: [],
};

/** Checks one step against the same rules the server uses. Returns field errors, or none. */
function check(step: StepId, d: SignupDraft): Record<string, string> {
  const result =
    step === "account" ? registerSchema.pick({ email: true, password: true, username: true }).safeParse(d)
    : step === "about" ? registerSchema.pick({ gender: true, dateOfBirth: true, confirmAdult: true }).safeParse(d)
    : step === "looking" || step === "meet" ? preferencesSchema.safeParse({ intents: d.intents, wantGenders: d.wantGenders, minAge: d.minAge, maxAge: d.maxAge, interests: d.interests })
    : { success: true as const };
  if (result.success) return {};
  const wanted = FIELDS_BY_STEP[step];
  const out: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "minAge");
    if (wanted.includes(key) || (step === "meet" && !key)) out[key] ??= issue.message;
  }
  // A preference rule that spans fields (youngest above oldest) has no single field; show it on the age fields.
  if (step === "meet" && Object.keys(out).length === 0 && result.error.issues.length) out.minAge = result.error.issues[0]!.message;
  return out;
}

/** The sign-up flow: five short steps, each checked on its own, then one account creation at the end. */
export function useSignupWizard() {
  const { register } = useAuth();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState(FIRST_DRAFT);
  // Errors from the server (an email already taken), and which fields the person has touched so far.
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string>();
  const step = STEPS[index]!;
  // Checked live, so the Next button knows at once whether the step is complete.
  const problems = check(step, draft);
  const valid = Object.keys(problems).length === 0;
  const errors: Record<string, string> = { ...Object.fromEntries(Object.entries(problems).filter(([k]) => touched.has(k))), ...serverErrors };

  const touch = (key: string) => setTouched((t) => (t.has(key) ? t : new Set(t).add(key)));

  const set = <K extends keyof SignupDraft>(key: K, value: SignupDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setServerErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
    touch(key);
  };

  async function finish() {
    setBusy(true);
    setFormError(undefined);
    try {
      await register({ email: draft.email, password: draft.password, username: draft.username, gender: draft.gender!, dateOfBirth: draft.dateOfBirth, confirmAdult: draft.confirmAdult });
      // The account exists now, so save what they are looking for. If this fails they can set it later; they still get in.
      await api("/preferences", { method: "PUT", body: { intents: draft.intents, wantGenders: draft.wantGenders, minAge: draft.minAge, maxAge: draft.maxAge, interests: draft.interests } }).catch(() => {});
      router.replace("/home");
    } catch (e) {
      setBusy(false);
      if (e instanceof ApiError && e.field) {
        // Send them back to the step that has the problem, with the message on the field.
        setServerErrors({ [e.field]: e.message });
        setIndex(STEPS.findIndex((s) => FIELDS_BY_STEP[s].includes(e.field!)));
      } else setFormError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    }
  }

  function next() {
    if (!valid) {
      setTouched((t) => new Set([...t, ...Object.keys(problems)])); // Enter pressed too early: show what is missing
      return;
    }
    if (index === STEPS.length - 1) void finish();
    else setIndex(index + 1);
  }

  return { step, index, total: STEPS.length, draft, set, touch, errors, valid, busy, formError, next, back: () => setIndex(Math.max(0, index - 1)) };
}
