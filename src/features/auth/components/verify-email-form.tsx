"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowClockwise, CheckCircle, EnvelopeSimple, SignOut } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";

export function VerifyEmailForm() {
  const { state, verifyEmail, resendVerification, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [email, setEmail] = useState<string>(searchParams.get("email") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [resending, setResending] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // If already authenticated and email is verified, go straight to home
  useEffect(() => {
    if (state.status === "authed" && state.me.emailVerified) {
      router.replace("/home");
    }
  }, [state, router]);

  // Fetch registered email if signed in and not set from URL
  useEffect(() => {
    if (state.status === "authed" && !email) {
      api<{ email: string; emailVerified: boolean }>("/auth/verification-status")
        .then((data) => {
          setEmail(data.email);
          if (data.emailVerified) router.replace("/home");
        })
        .catch(() => {});
    }
  }, [state, email, router]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Focus the first input on initial mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, val: string) => {
    setError(null);
    setInfoMessage(null);

    // Only allow numbers
    const clean = val.replace(/\D/g, "");
    if (!clean) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Handle single digit
    const digit = clean[clean.length - 1]!;
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    // Auto-advance to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are entered, submit automatically
    if (next.every((d) => d !== "")) {
      void handleSubmitCode(next.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!paste) return;

    const next = [...digits];
    for (let i = 0; i < paste.length; i++) {
      next[i] = paste[i]!;
    }
    setDigits(next);

    if (paste.length === 6) {
      inputRefs.current[5]?.focus();
      void handleSubmitCode(paste);
    } else {
      inputRefs.current[Math.min(paste.length, 5)]?.focus();
    }
  };

  const handleSubmitCode = async (codeToSubmit?: string) => {
    const fullCode = codeToSubmit ?? digits.join("");
    if (fullCode.length !== 6) {
      setError("Please enter the full 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError(null);
    setInfoMessage(null);

    try {
      await verifyEmail(fullCode, email || undefined);
      setSuccess(true);
      setTimeout(() => {
        router.replace("/home");
      }, 1000);
    } catch (err) {
      setLoading(false);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Verification failed. Please check the code and try again.");
      }
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError(null);
    setInfoMessage(null);

    try {
      const res = await resendVerification(email || undefined);
      setCooldown(res.cooldown ?? 60);
      setInfoMessage("A fresh verification code was sent to your email!");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to resend code. Please try again shortly.");
      }
    } finally {
      setResending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-2 border-edge bg-surface/50 p-4 text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-accent/20 text-accent-text">
          <EnvelopeSimple aria-hidden weight="bold" className="size-6" />
        </div>
        <p className="text-sm text-muted">
          We sent a 6-digit verification code to
        </p>
        <p className="mt-0.5 font-semibold text-fg">
          {email || "your registered email"}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmitCode();
        }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-center text-sm font-semibold text-fg">
            Enter 6-digit code
          </label>
          <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                autoComplete="one-time-code"
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                disabled={loading || success}
                className="size-12 rounded-ui border-2 border-line bg-surface text-center font-mono text-2xl font-bold text-fg transition-[border-color,box-shadow] hover:border-edge focus:border-edge focus:shadow-sticker-sm disabled:opacity-50 sm:size-14 sm:text-3xl"
              />
            ))}
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-ui border-2 border-danger bg-danger/10 p-3 text-center text-sm font-bold text-danger">
            {error}
          </p>
        )}

        {infoMessage && (
          <p role="status" className="rounded-ui border-2 border-accent bg-accent/10 p-3 text-center text-sm font-bold text-accent-text">
            {infoMessage}
          </p>
        )}

        {success ? (
          <div className="flex items-center justify-center gap-2 rounded-ui border-2 border-accent bg-accent/20 p-4 text-base font-bold text-accent-text">
            <CheckCircle weight="fill" className="size-6" />
            <span>Email verified! Redirecting to home…</span>
          </div>
        ) : (
          <Button
            type="submit"
            size="lg"
            block
            loading={loading}
            disabled={digits.some((d) => !d) || loading}
          >
            Verify Email
          </Button>
        )}
      </form>

      <div className="flex flex-col items-center gap-3 border-t border-line pt-5 text-sm text-muted">
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || resending || loading}
          className="inline-flex items-center gap-1.5 font-semibold text-accent-text transition-opacity hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowClockwise weight="bold" className={`size-4 ${resending ? "animate-spin" : ""}`} />
          <span>
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend verification code"}
          </span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-fg hover:underline"
        >
          <SignOut weight="bold" className="size-3.5" />
          <span>Log out or use another email</span>
        </button>
      </div>
    </div>
  );
}
