"use client";

import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/providers/auth-provider";

/** Asks the user to confirm before signing them out. */
export function LogoutSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { logout } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  // Reset spinner every time the sheet opens so a re-open after dismissal works cleanly.
  useEffect(() => {
    if (open) setBusy(false);
  }, [open]);

  async function handleLogout() {
    setBusy(true);
    try {
      await logout();
      router.replace("/");
    } catch {
      setBusy(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Log out?" description="You can always log back in with your email and password.">
        <div className="space-y-4">
          <div className="flex justify-center py-2">
            <span className="grid size-16 place-items-center rounded-full border-2 border-edge bg-surface shadow-sticker">
              <SignOut aria-hidden weight="bold" className="size-8 text-danger" />
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <Button variant="danger" size="lg" block loading={busy} onClick={handleLogout}>
              <SignOut aria-hidden weight="bold" className="size-5" />
              Yes, log me out
            </Button>
            <SheetClose asChild>
              <Button variant="secondary" size="lg" block disabled={busy}>
                Stay signed in
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
