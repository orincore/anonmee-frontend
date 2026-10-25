import { useEffect, useRef, useState } from "react";
import { ArrowClockwise, CheckCircle, EnvelopeSimple } from "@phosphor-icons/react";
import { MIN_AGE } from "@/contracts";
import { AgeRangeField, GenderWantPicker, IntentPicker, TopicPicker } from "@/components/shared";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { TextField } from "@/components/ui/text-field";
import { api } from "@/lib/api";
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
  resendCode?: () => Promise<void>;
  cooldown?: number;
  resending?: boolean;
  resendNotice?: string | null;
}

export const STEP_TEXT: Record<StepId, { title: string; body: string }> = {
  account: { title: "Let us get you in.", body: "Nobody ever sees your email or username." },
  verify: { title: "Verify your email.", body: "Enter the 6-digit code we sent to your email to confirm it is you." },
  about: { title: "A little about you.", body: "Only your gender and age are ever shown to others." },
  looking: { title: "What are you here for?", body: "Pick as many as you like. You will meet people who chose the same." },
  meet: { title: "Who do you want to meet?", body: "Pick any mix, and the ages you are happy with." },
  topics: { title: "What do you like talking about?", body: "Optional. Groups and chats on these show up first." },
};

function Error({ text }: { text?: string }) {
  return text ? <p role="alert" className="text-sm font-bold text-danger">{text}</p> : null;
}

type AvailState = "idle" | "checking" | "available" | "taken";

/** Username field with a debounced server-side availability check. */
function UsernameField({
  value,
  error,
  onChange,
  onBlur,
}: {
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const [avail, setAvail] = useState<AvailState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!USERNAME_RE.test(value)) {
      setAvail("idle");
      return;
    }
    setAvail("checking");
    timer.current = setTimeout(() => {
      api<{ available: boolean }>(`/auth/check-username?username=${encodeURIComponent(value)}`)
        .then((r) => setAvail(r.available ? "available" : "taken"))
        .catch(() => setAvail("idle"));
    }, 450);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const showTaken = error?.toLowerCase().includes("taken") || avail === "taken";
  const hint = showTaken
    ? undefined
    : avail === "checking"
    ? "Checking…"
    : avail === "available"
    ? "✓ Available"
    : "Private. Other people see a random name instead.";

  const hintClass =
    avail === "available" && !showTaken
      ? "text-sm font-medium text-[var(--color-accent)]"
      : "text-sm text-muted";

  const resolvedError = showTaken ? (error ?? "That username is taken. Try another.") : error;

  return (
    <div className="space-y-2">
      <label className="block text-[15px] font-semibold" htmlFor="signup-username">
        Username
      </label>
      <input
        id="signup-username"
        type="text"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        aria-invalid={resolvedError ? true : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`min-h-12 w-full rounded-ui border-2 bg-surface px-4 text-base text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] focus:shadow-sticker-sm ${
          resolvedError ? "border-danger" : "border-line hover:border-edge focus:border-edge"
        }`}
      />
      {resolvedError ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {resolvedError}
        </p>
      ) : hint ? (
        <p className={hintClass}>{hint}</p>
      ) : null}
    </div>
  );
}

/** 6-digit OTP code input component for Step 2. */
function CodeInput({
  value,
  error,
  onChange,
  onTouched,
}: {
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onTouched: () => void;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, "");
    if (!clean) {
      const next = [...digits];
      next[index] = "";
      onChange(next.join(""));
      return;
    }
    const char = clean[clean.length - 1]!;
    const next = [...digits];
    next[index] = char;
    const full = next.join("");
    onChange(full);

    if (index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (full.length === 6) {
      onTouched();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!paste) return;
    onChange(paste);
    if (paste.length === 6) {
      inputs.current[5]?.focus();
      onTouched();
    } else {
      inputs.current[Math.min(paste.length, 5)]?.focus();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            autoComplete="one-time-code"
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onBlur={onTouched}
            className={`size-12 rounded-ui border-2 bg-surface text-center font-mono text-2xl font-bold text-fg transition-[border-color,box-shadow] focus:shadow-sticker-sm sm:size-14 sm:text-3xl ${
              error ? "border-danger" : "border-line hover:border-edge focus:border-edge"
            }`}
          />
        ))}
      </div>
      {error ? <p role="alert" className="text-center text-sm font-medium text-danger">{error}</p> : null}
    </div>
  );
}

export function SignupStep({
  step,
  draft,
  errors,
  set,
  touch,
  resendCode,
  cooldown = 0,
  resending = false,
  resendNotice,
}: StepProps & { step: StepId }) {
  switch (step) {
    case "account":
      return (
        <div className="space-y-5">
          <TextField
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            hint="Only used to log in. Never shown to anyone."
            error={errors.email}
            value={draft.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => touch("email")}
          />
          <PasswordField
            label="Password"
            autoComplete="new-password"
            hint="At least 8 characters."
            error={errors.password}
            value={draft.password}
            onChange={(e) => set("password", e.target.value)}
            onBlur={() => touch("password")}
          />
          <UsernameField
            value={draft.username}
            error={errors.username}
            onChange={(v) => set("username", v)}
            onBlur={() => touch("username")}
          />
        </div>
      );

    case "verify":
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-edge bg-surface/60 p-4 text-center">
            <div className="mx-auto mb-2 flex size-11 items-center justify-center rounded-full bg-accent/20 text-accent-text">
              <EnvelopeSimple aria-hidden weight="bold" className="size-5" />
            </div>
            <p className="text-sm text-muted">We sent a 6-digit verification code to</p>
            <p className="mt-0.5 font-semibold text-fg">{draft.email}</p>
          </div>

          <CodeInput
            value={draft.code}
            error={errors.code}
            onChange={(v) => set("code", v)}
            onTouched={() => touch("code")}
          />

          {draft.verificationToken ? (
            <div className="flex items-center justify-center gap-2 rounded-ui border-2 border-accent bg-accent/15 p-3 text-sm font-bold text-accent-text">
              <CheckCircle weight="fill" className="size-5" />
              <span>Email verified! You can proceed to the next step.</span>
            </div>
          ) : null}

          {resendNotice ? (
            <p role="status" className="rounded-ui border-2 border-accent bg-accent/10 p-2.5 text-center text-sm font-semibold text-accent-text">
              {resendNotice}
            </p>
          ) : null}

          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={resendCode}
              disabled={cooldown > 0 || resending}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text transition-opacity hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowClockwise weight="bold" className={`size-4 ${resending ? "animate-spin" : ""}`} />
              <span>{cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend verification code"}</span>
            </button>
          </div>
        </div>
      );

    case "about":
      return (
        <div className="space-y-5">
          <GenderPicker
            value={draft.gender}
            onChange={(g) => set("gender", g)}
            error={errors.gender ? "Choose one" : undefined}
          />
          <DatePickerField
            label="Date of birth"
            max={latestAdultBirthday()}
            hint={`You must be ${MIN_AGE} or older. Others see only your age.`}
            error={errors.dateOfBirth}
            value={draft.dateOfBirth}
            onChange={(iso) => set("dateOfBirth", iso)}
            onTouched={() => touch("dateOfBirth")}
          />
          <CheckboxField
            label={`I am ${MIN_AGE} or older.`}
            error={errors.confirmAdult}
            checked={draft.confirmAdult}
            onChange={(e) => set("confirmAdult", e.target.checked)}
          />
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
          <AgeRangeField
            min={draft.minAge}
            max={draft.maxAge}
            onChange={(a, b) => {
              set("minAge", a);
              set("maxAge", b);
            }}
            error={errors.minAge ?? errors.maxAge}
          />
        </div>
      );

    case "topics":
      return <TopicPicker value={draft.interests} onChange={(v) => set("interests", v)} />;
  }
}
