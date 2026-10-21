"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, OnlineCounter, ThemeToggle } from "@/components/shared";
import { cn } from "@/lib/cn";
import { APP_NAV } from "./nav-items";
import { SidebarProfile } from "./sidebar-profile";

/** Desktop rail: the same four places as the phone tab bar, plus the live count. */
export function Sidebar({ online }: { online: number | null }) {
  const path = usePathname();
  return (
    <aside className="sticky top-0 hidden h-[100dvh] w-64 shrink-0 flex-col justify-between border-r-2 border-edge px-4 py-5 md:flex">
      <div className="space-y-8">
        <Logo href="/home" />
        <nav aria-label="Main">
          <ul className="space-y-1">
            {APP_NAV.map(({ href, label, icon: IconComponent }) => {
              const active = path === href || path.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn("flex min-h-12 items-center gap-3 rounded-full border-2 px-4 text-base font-bold transition-colors", active ? "border-edge bg-accent text-accent-fg shadow-sticker-sm" : "border-transparent text-muted hover:bg-line hover:text-fg")}
                  >
                    <IconComponent aria-hidden weight={active ? "fill" : "regular"} className="size-6" />
                    {label}
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
