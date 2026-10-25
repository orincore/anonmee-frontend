"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GENDERS, MIN_AGE, preferencesSchema, registerSchema, type Gender, type Intent } from "@/contracts";
import { api, ApiError } from "@/lib/api";
import { getDeviceInfo } from "@/lib/fingerprint";
import { useAuth } from "@/providers/auth-provider";

export interface SignupDraft {
  email: string;
  password: string;
  username: string;
  code: string;
  verificationToken?: string;
  gender: Gender | undefined;
  dateOfBirth: string;
  confirmAdult: boolean;
  intents: Intent[];
  wantGenders: Gender[];
  minAge: number;
  maxAge: number;
  interests: string[];
}

export const STEPS = ["account", "verify", "about", "looking", "meet", "topics"] as const;
export type StepId = (typeof STEPS)[number];

const FIRST_DRAFT: SignupDraft = {
  email: "",
  password: "",
  username: "",
  code: "",
  verificationToken: undefined,
  gender: undefined,
  dateOfBirth: "",
  confirmAdult: false,
  intents: [],
  wantGenders: [...GENDERS],
  minAge: MIN_AGE,
  maxAge: 99,
  interests: [],
};

const FIELDS_BY_STEP: Record<StepId, string[]> = {
  account: ["email", "password", "username"],
  verify: ["code"],
  about: ["gender", "dateOfBirth", "confirmAdult"],
  looking: ["intents"],
  meet: ["wantGenders", "minAge", "maxAge"],
  topics: [],
};

/** Checks one step against validation rules. Returns field errors, or none. */
function check(step: StepId, d: SignupDraft): Record<string, string> {
  if (step === "account") {
    const res = registerSchema.pick({ email: true, password: true, username: true }).safeParse(d);
    if (res.success) return {};
    const out: Record<string, string> = {};
    for (const issue of res.error.issues) {
      const key = String(issue.path[0]);
      out[key] ??= issue.message;
    }
    return out;
  }

  if (step === "verify") {
    const clean = d.code.trim();
    if (clean.length !== 6 || !/^\d{6}$/.test(clean)) {
      return { code: "Enter the 6-digit verification code" };
    }
    return {};
  }

  if (step === "about") {
    const res = registerSchema.pick({ gender: true, dateOfBirth: true, confirmAdult: true }).safeParse(d);
    if (res.success) return {};
    const out: Record<string, string> = {};
    for (const issue of res.error.issues) {
      const key = String(issue.path[0]);
      out[key] ??= issue.message;
    }
    return out;
  }

  if (step === "looking" || step === "meet") {
    const res = preferencesSchema.safeParse({
      intents: d.intents,
      wantGenders: d.wantGenders,
      minAge: d.minAge,
      maxAge: d.maxAge,
      interests: d.interests,
    });
    if (res.success) return {};
    const wanted = FIELDS_BY_STEP[step];
    const out: Record<string, string> = {};
    for (const issue of res.error.issues) {
      const key = String(issue.path[0] ?? "minAge");
      if (wanted.includes(key) || (step === "meet" && !key)) out[key] ??= issue.message;
    }
    if (step === "meet" && Object.keys(out).length === 0 && res.error.issues.length) {
      out.minAge = res.error.issues[0]!.message;
    }
    return out;
  }

  return {};
}

/** The sign-up flow: six steps with mandatory email verification before account creation. */
export function useSignupWizard() {
  const { register } = useAuth();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState(FIRST_DRAFT);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [cooldown, setCooldown] = useState(60);
  const [resending, setResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  const step = STEPS[index]!;
  const problems = check(step, draft);
  const valid = Object.keys(problems).length === 0;
  const errors: Record<string, string> = {
    ...Object.fromEntries(Object.entries(problems).filter(([k]) => touched.has(k))),
    ...serverErrors,
  };

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const touch = (key: string) => setTouched((t) => (t.has(key) ? t : new Set(t).add(key)));

  const set = <K extends keyof SignupDraft>(key: K, value: SignupDraft[K]) => {
    setDraft((d) => {
      // If email changes, invalidate previous verification token and reset code
      if (key === "email" && d.email !== value) {
        return { ...d, email: value as string, verificationToken: undefined, code: "" };
      }
      return { ...d, [key]: value };
    });
    setServerErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
    setFormError(undefined);
    touch(key);
  };

  const resendCode = useCallback(async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setResendNotice(null);
    setFormError(undefined);
    try {
      const dev = await getDeviceInfo().catch(() => ({ deviceId: "", deviceFingerprint: "" }));
      const res = await api<{ ok: boolean; message: string; cooldown: number }>("/auth/send-verification", {
        method: "POST",
        body: {
          email: draft.email,
          username: draft.username,
          deviceId: dev.deviceId,
          deviceFingerprint: dev.deviceFingerprint,
        },
      });
      setCooldown(res.cooldown ?? 60);
      setResendNotice("A new verification code was sent to your email!");
    } catch (e) {
      if (e instanceof ApiError) {
        setServerErrors({ code: e.message });
      } else {
        setFormError("Failed to resend code. Please try again in a moment.");
      }
    } finally {
      setResending(false);
    }
  }, [cooldown, resending, draft.email, draft.username]);

  async function finish() {
    setBusy(true);
    setFormError(undefined);
    try {
      await register({
        email: draft.email,
        password: draft.password,
        username: draft.username,
        gender: draft.gender!,
        dateOfBirth: draft.dateOfBirth,
        confirmAdult: draft.confirmAdult,
        verificationToken: draft.verificationToken,
        code: draft.code,
      });

      // The verified account is now created in DB; save preferences
      await api("/preferences", {
        method: "PUT",
        body: {
          intents: draft.intents,
          wantGenders: draft.wantGenders,
          minAge: draft.minAge,
          maxAge: draft.maxAge,
          interests: draft.interests,
        },
      }).catch(() => {});

      router.replace("/home");
    } catch (e) {
      setBusy(false);
      if (e instanceof ApiError && e.field) {
        setServerErrors({ [e.field]: e.message });
        const stepIdx = STEPS.findIndex((s) => FIELDS_BY_STEP[s].includes(e.field!));
        if (stepIdx >= 0) setIndex(stepIdx);
      } else {
        setFormError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
      }
    }
  }

  async function next() {
    if (!valid) {
      setTouched((t) => new Set([...t, ...Object.keys(problems)]));
      return;
    }

    // Step 1 -> Step 2: Send verification code to email before advancing
    if (step === "account") {
      if (draft.verificationToken) {
        setIndex(index + 1);
        return;
      }
      setBusy(true);
      setFormError(undefined);
      try {
        const dev = await getDeviceInfo().catch(() => ({ deviceId: "", deviceFingerprint: "" }));
        const res = await api<{ ok: boolean; message: string; cooldown: number }>("/auth/send-verification", {
          method: "POST",
          body: {
            email: draft.email,
            username: draft.username,
            deviceId: dev.deviceId,
            deviceFingerprint: dev.deviceFingerprint,
          },
        });
        setCooldown(res.cooldown ?? 60);
        setBusy(false);
        setIndex(index + 1);
      } catch (e) {
        setBusy(false);
        if (e instanceof ApiError && e.field) {
          setServerErrors({ [e.field]: e.message });
        } else {
          setFormError(e instanceof ApiError ? e.message : "Failed to send verification code. Please check your email.");
        }
      }
      return;
    }

    // Step 2 -> Step 3: Verify 6-digit code with server before continuing
    if (step === "verify") {
      if (draft.verificationToken) {
        setIndex(index + 1);
        return;
      }
      setBusy(true);
      setFormError(undefined);
      try {
        const res = await api<{ ok: boolean; verificationToken: string }>("/auth/verify-code", {
          method: "POST",
          body: { email: draft.email, code: draft.code },
        });
        set("verificationToken", res.verificationToken);
        setBusy(false);
        setIndex(index + 1);
      } catch (e) {
        setBusy(false);
        if (e instanceof ApiError) {
          setServerErrors({ code: e.message });
        } else {
          setServerErrors({ code: "Incorrect verification code. Please check your email." });
        }
      }
      return;
    }

    // Final step: create verified account
    if (index === STEPS.length - 1) {
      void finish();
    } else {
      setIndex(index + 1);
    }
  }

  return {
    step,
    index,
    total: STEPS.length,
    draft,
    set,
    touch,
    errors,
    valid,
    busy,
    formError,
    next,
    back: () => setIndex(Math.max(0, index - 1)),
    resendCode,
    cooldown,
    resending,
    resendNotice,
  };
}
