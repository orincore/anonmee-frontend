"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useSignupWizard } from "../hooks/use-signup-wizard";
import { SignupStep, STEP_TEXT } from "./signup-steps";

/** Sign-up, one short screen at a time. Each step is checked before you move on; the account is created at the end. */
export function SignupWizard() {
  const w = useSignupWizard();
  const reduce = useReducedMotion();
  const { title, body } = STEP_TEXT[w.step];
  const last = w.index === w.total - 1;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        w.next();
      }}
      className="space-y-6"
    >
      <div>
        <p className="font-mono text-sm font-bold uppercase tracking-wide">Step {w.index + 1} of {w.total}</p>
        <div aria-hidden className="mt-2 flex gap-1.5">
          {Array.from({ length: w.total }, (_, i) => (
            <span key={i} className={cn("h-2.5 flex-1 rounded-full border-2 border-edge transition-colors duration-300", i <= w.index ? "bg-accent" : "bg-transparent")} />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={w.step} initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="space-y-5">
          <div className="space-y-1.5">
            <h2 className="display text-3xl">{title}</h2>
            <p className="text-base text-muted">{body}</p>
          </div>
          <SignupStep step={w.step} draft={w.draft} errors={w.errors} set={w.set} touch={w.touch} />
        </motion.div>
      </AnimatePresence>
      {last ? (
        <p className="text-sm text-muted">
          By creating an account you agree to our{" "}
          <Link href="/terms" target="_blank" rel="noopener" className="font-bold underline underline-offset-2">Terms</Link>, <Link href="/privacy" target="_blank" rel="noopener" className="font-bold underline underline-offset-2">Privacy Policy</Link> and <Link href="/community-guidelines" target="_blank" rel="noopener" className="font-bold underline underline-offset-2">Community guidelines</Link>.
        </p>
      ) : null}
      {w.formError ? <p role="alert" className="rounded-ui border-2 border-danger px-4 py-3 text-[15px] font-bold text-danger">{w.formError}</p> : null}
      <div className="flex gap-3">
        {w.index > 0 ? (
          <Button type="button" variant="secondary" size="lg" onClick={w.back} aria-label="Back" className="px-5">
            <ArrowLeft aria-hidden weight="bold" className="size-5" />
          </Button>
        ) : null}
        <Button type="submit" size="lg" block loading={w.busy} disabled={!w.valid} aria-describedby={w.valid ? undefined : "step-hint"}>
          {last ? "Create account" : "Next"}
        </Button>
      </div>
      {w.valid ? null : <p id="step-hint" className="-mt-2 text-center text-sm text-muted">Fill in everything above to continue.</p>}
      <p className="text-center text-[15px] text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-accent-text underline-offset-4 hover:underline">Log in</Link>
      </p>
    </form>
  );
}
