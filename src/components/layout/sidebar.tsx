"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, OnlineCounter, ThemeToggle } from "@/components/shared";
import { useUnread } from "@/providers/unread-provider";
import { cn } from "@/lib/cn";
import { APP_NAV } from "./nav-items";
import { SidebarProfile } from "./sidebar-profile";
import { formatUnread } from "@/lib/format";

/** Desktop rail: navigation links with unread count badges, plus the live counter and profile. */
export function Sidebar({ online }: { online: number | null }) {
  const path = usePathname();
  const { globalUnread, groupsUnread } = useUnread();

  return (
    <aside className="sticky top-0 hidden h-[100dvh] w-64 shrink-0 flex-col justify-between border-r-2 border-edge px-4 py-5 md:flex">
      <div className="space-y-8">
        <Logo href="/home" />
        <nav aria-label="Main">
          <ul className="space-y-1">
            {APP_NAV.map(({ href, label, icon: IconComponent, unreadKey }) => {
              const active =
                href === "/groups/global"
                  ? path === "/groups/global"
                  : href === "/groups"
                  ? path === "/groups" || (path.startsWith("/groups/") && path !== "/groups/global")
                  : path === href || path.startsWith(`${href}/`);
              const unread = unreadKey === "global" ? globalUnread : unreadKey === "groups" ? groupsUnread : 0;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-full border-2 px-4 text-base font-bold transition-colors",
                      active
                        ? "border-edge bg-accent text-accent-fg shadow-sticker-sm"
                        : "border-transparent text-muted hover:bg-line hover:text-fg",
                    )}
                  >
                    <IconComponent aria-hidden weight={active ? "fill" : "regular"} className="size-6 shrink-0" />
                    <span className="truncate">{label}</span>
                    {unread > 0 && (
                      <span
                        aria-label={`${unread} unread messages`}
                        className={cn(
                          "ml-auto inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full border border-edge px-1.5 font-mono text-[11px] font-bold shadow-sticker-sm",
                          active ? "bg-bg text-fg" : "bg-brand text-brand-fg",
                        )}
                      >
                        {formatUnread(unread)}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="space-y-3">
        <SidebarProfile active={path.startsWith("/me")} />
        <div className="flex items-center justify-between px-2">
          <OnlineCounter count={online} />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
