"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/contracts";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { ApiError } from "@/lib/api";
import { zodResolver } from "@/lib/forms";
import { useAuth } from "@/providers/auth-provider";
import { PasswordField } from "./password-field";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver<LoginInput>(loginSchema), defaultValues: { email: "", password: "" } });

  const submit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await login(values);
      router.replace("/home");
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    }
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <TextField label="Email" type="email" inputMode="email" autoComplete="email" error={errors.email?.message && "Enter your email address."} {...register("email")} />
      <PasswordField label="Password" autoComplete="current-password" error={errors.password?.message && "Enter your password."} {...register("password")} />
      {formError ? (
        <p role="alert" className="rounded-2xl bg-danger/10 px-4 py-3 text-[15px] font-medium text-danger">
          {formError}
        </p>
      ) : null}
      <Button type="submit" size="lg" block loading={isSubmitting}>
        Log in
      </Button>
      <p className="text-center text-[15px] text-muted">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-accent-text underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
