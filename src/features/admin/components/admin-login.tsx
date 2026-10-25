"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { api, ApiError } from "@/lib/api";
import { PasswordField } from "@/features/auth/components/password-field";

/** Staff sign-in: email and password. */
export function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(undefined);
    try {
      await api("/admin/auth/login", { method: "POST", body: form });
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center gap-8 px-4">
      <div className="space-y-3">
        <Logo />
        <h1 className="display text-display">Staff sign in.</h1>
        <p className="text-muted">For the Anonmee team only. Every action here is logged.</p>
      </div>
      <form onSubmit={submit} className="space-y-5">
        <TextField label="Email" type="email" autoComplete="username" value={form.email} onChange={set("email")} />
        <PasswordField label="Password" autoComplete="current-password" value={form.password} onChange={set("password")} />
        {error ? <p role="alert" className="rounded-ui border-2 border-danger px-4 py-3 font-bold text-danger">{error}</p> : null}
        <Button type="submit" size="lg" block loading={busy}>Sign in</Button>
      </form>
    </main>
  );
}
