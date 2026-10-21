"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { PasswordField } from "@/features/auth/components/password-field";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";

function Form() {
  const { logout } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(undefined);
    try {
      await api("/auth/delete-account", { method: "POST", body: { password } });
      await logout(); // the account is gone; this just clears the screen state
      router.replace("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete the account. Try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <ul className="list-disc space-y-1.5 pl-5 text-[15px] text-muted">
        <li>Your account, preferences and blocks are erased.</li>
        <li>Your messages in groups are deleted.</li>
        <li>Groups you started and nobody else is in disappear.</li>
        <li>This cannot be undone.</li>
      </ul>
      <PasswordField label="Your password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} />
      <Button type="submit" variant="danger" size="lg" block loading={busy} disabled={!password}>
        Delete my account for good
      </Button>
    </form>
  );
}

/** Confirms with the password before erasing everything. Nothing happens without it. */
export function DeleteAccountSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Delete your account?" description="Enter your password to confirm.">
        <Form />
      </SheetContent>
    </Sheet>
  );
}
