"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { useAuth } from "@/providers/auth-provider";

/**
 * You, at the bottom of the rail: an initial in a sticker and your private username, linking to Me.
 * It shows a placeholder the same size while loading, so the rail never jumps or goes blank.
 */
export function SidebarProfile({ active }: { active: boolean }) {
  const { state } = useAuth();
  if (state.status !== "authed") {
    return (
      <div className="flex min-h-14 items-center gap-3 px-2" aria-busy>
        <Skeleton className="size-10 rounded-xl" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }
  const { username } = state.me;
  return (
    <Link href="/me" aria-label={`Your profile, ${username}`} className={cn("flex min-h-14 items-center gap-3 rounded-full border-2 px-2 pr-4 transition-colors", active ? "border-edge bg-accent text-accent-fg" : "border-transparent hover:bg-line")}>
      <span aria-hidden className="display grid size-10 shrink-0 -rotate-3 place-items-center rounded-xl border-2 border-edge bg-pop text-xl text-pop-fg">
        {username[0]?.toUpperCase()}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-bold leading-tight">{username}</span>
        <span className="block text-xs opacity-70">Only you see this</span>
      </span>
    </Link>
  );
}
