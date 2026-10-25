"use client";

import { ChartBar, Clock, Flag, ListChecks, Megaphone, SignOut, TrendUp, UsersThree } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo, ThemeToggle } from "@/components/shared";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";

export type AdminRole = "owner" | "moderator" | "analyst";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: ChartBar, roles: ["owner", "moderator", "analyst"] },
  { href: "/admin/escalations", label: "Escalations", icon: Flag, roles: ["owner", "moderator"] },
  { href: "/admin/users", label: "Users", icon: UsersThree, roles: ["owner", "moderator"] },
  { href: "/admin/activity", label: "Screen Time", icon: Clock, roles: ["owner", "moderator", "analyst"] },
  { href: "/admin/analytics", label: "Traffic", icon: TrendUp, roles: ["owner", "moderator", "analyst"] },
  { href: "/admin/campaigns", label: "Campaigns", icon: Megaphone, roles: ["owner", "moderator", "analyst"] },
  { href: "/admin/audit", label: "Audit log", icon: ListChecks, roles: ["owner"] },
] as const;

/** The admin frame: a rail on wide screens and a scrolling strip on narrow ones, showing only what your role may open. */
export function AdminShell({ role, email, children }: { role: AdminRole; email: string; children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const items = ITEMS.filter((i) => (i.roles as readonly string[]).includes(role));
  const active = (href: string) => (href === "/admin" ? path === href : path.startsWith(href));

  return (
    <div className="min-h-[100dvh] md:flex">
      <aside className="border-b-2 border-edge md:sticky md:top-0 md:h-[100dvh] md:w-60 md:shrink-0 md:border-b-0 md:border-r-2">
        <div className="flex items-center justify-between px-4 py-3 md:flex-col md:items-start md:gap-6 md:px-4 md:py-5">
          <div className="space-y-1">
            <Logo href="/admin" />
            <p className="hidden font-mono text-xs uppercase text-muted md:block">Staff console, {role}</p>
          </div>
          <div className="flex items-center gap-1 md:hidden"><ThemeToggle /></div>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:pb-0">
          {items.map(({ href, label, icon: IconComponent }) => (
            <Link key={href} href={href} aria-current={active(href) ? "page" : undefined} className={cn("flex min-h-11 shrink-0 items-center gap-3 rounded-full border-2 px-4 font-bold", active(href) ? "border-edge bg-accent text-accent-fg shadow-sticker-sm" : "border-transparent text-muted hover:bg-line hover:text-fg")}>
              <IconComponent aria-hidden weight="bold" className="size-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 hidden space-y-3 border-t-2 border-line p-4 md:absolute md:bottom-0 md:block md:w-60">
          <p className="truncate text-sm text-muted">{email}</p>
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <button type="button" onClick={async () => { await api("/admin/auth/logout", { method: "POST", body: {} }).catch(() => {}); router.replace("/admin/login"); }} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-bold hover:bg-line">
              <SignOut aria-hidden weight="bold" className="size-5" />
              Log out
            </button>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
