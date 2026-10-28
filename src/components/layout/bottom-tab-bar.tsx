"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChrome } from "@/providers/chrome-provider";
import { useUnread } from "@/providers/unread-provider";
import { cn } from "@/lib/cn";
import { APP_NAV } from "./nav-items";
import { formatUnread } from "@/lib/format";

/** Phone navigation. Sits above the home indicator and every target is at least 44px. */
export function BottomTabBar() {
  const path = usePathname();
  const { globalUnread, groupsUnread } = useUnread();

  if (useChrome().immersive) return null;
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-edge bg-bg pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
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
                className={cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-bold transition-colors", active ? "text-fg" : "text-muted")}
              >
                <span className={cn("relative grid h-8 w-12 place-items-center rounded-full border-2 transition-colors", active ? "border-edge bg-accent text-accent-fg" : "border-transparent")}>
                  <IconComponent aria-hidden weight={active ? "fill" : "regular"} className="size-6" />
                  {unread > 0 && (
                    <span
                      aria-label={`${unread} unread messages`}
                      className={cn(
                        "absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-edge px-1 font-mono text-[9px] font-bold shadow-sticker-sm",
                        active ? "bg-bg text-fg" : "bg-brand text-brand-fg",
                      )}
                    >
                      {formatUnread(unread)}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
