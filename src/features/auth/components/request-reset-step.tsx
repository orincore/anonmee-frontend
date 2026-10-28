"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/contracts";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { api, ApiError } from "@/lib/api";
import { zodResolver } from "@/lib/forms";

export interface RequestResetStepProps {
  onSent: (email: string) => void;
}

/** Step 1 of the password reset: ask for the email the code should go to. */
export function RequestResetStep({ onSent }: RequestResetStepProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver<ForgotPasswordInput>(forgotPasswordSchema), defaultValues: { email: "" } });

  const submit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await api("/auth/forgot-password", { method: "POST", body: values });
      onSent(values.email.trim().toLowerCase());
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    }
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        inputMode="email"
        error={errors.email?.message}
        {...register("email")}
      />
      {formError ? (
        <p role="alert" className="rounded-2xl bg-danger/10 px-4 py-3 text-[15px] font-medium text-danger">{formError}</p>
      ) : null}
      <Button type="submit" size="lg" block loading={isSubmitting}>
        Send code
      </Button>
      <p className="text-center text-[15px] text-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-accent-text underline-offset-4 hover:underline">Log in</Link>
      </p>
    </form>
  );
}
