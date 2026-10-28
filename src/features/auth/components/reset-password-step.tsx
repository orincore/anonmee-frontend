"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowClockwise, CheckCircle } from "@phosphor-icons/react";
import { resetPasswordSchema } from "@/contracts";
import { Button } from "@/components/ui/button";
import { api, ApiError } from "@/lib/api";
import { OtpField } from "./otp-field";
import { PasswordField } from "./password-field";

export interface ResetPasswordStepProps {
  email: string;
  onChangeEmail: () => void;
}

/** Step 2 of the password reset: the emailed code plus the new password. */
export function ResetPasswordStep({ email, onChangeEmail }: ResetPasswordStepProps) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    const parsed = resetPasswordSchema.safeParse({ email, code, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the code and password.");
      return;
    }
    setBusy(true);
    try {
      await api("/auth/reset-password", { method: "POST", body: parsed.data });
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reset your password. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setError(null);
    try {
      await api("/auth/forgot-password", { method: "POST", body: { email } });
      setCooldown(60);
      setCode("");
      setInfo("If that email has an account, a fresh code is on its way.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not resend the code. Please try again.");
    }
  };

  if (done) {
    return (
      <div className="space-y-6">
        <p role="status" className="flex items-center justify-center gap-2 rounded-ui border-2 border-accent bg-accent/20 p-4 text-base font-bold text-accent-text">
          <CheckCircle aria-hidden weight="fill" className="size-6" />
          Password changed. You were logged out everywhere.
        </p>
        <Button asChild size="lg" block>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <p className="text-center text-sm text-muted">
        If <span className="font-semibold text-fg">{email}</span> has an account, we sent it a 6-digit code.{" "}
        <button type="button" onClick={onChangeEmail} className="font-semibold text-accent-text hover:underline">Wrong email?</button>
      </p>
      <OtpField label="Enter 6-digit code" value={code} onChange={setCode} disabled={busy} autoFocus />
      <PasswordField label="New password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} hint="At least 8 characters." />
      {error ? <p role="alert" className="rounded-ui border-2 border-danger bg-danger/10 p-3 text-center text-sm font-bold text-danger">{error}</p> : null}
      {info ? <p role="status" className="rounded-ui border-2 border-accent bg-accent/10 p-3 text-center text-sm font-bold text-accent-text">{info}</p> : null}
      <Button type="submit" size="lg" block loading={busy} disabled={code.length !== 6 || !password}>
        Change password
      </Button>
      <button
        type="button"
        onClick={resend}
        disabled={cooldown > 0 || busy}
        className="mx-auto flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowClockwise aria-hidden weight="bold" className="size-4" />
        {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
      </button>
    </form>
  );
}
