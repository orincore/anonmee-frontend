"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChrome } from "@/providers/chrome-provider";
import { cn } from "@/lib/cn";
import { APP_NAV } from "./nav-items";

/** Phone navigation. Sits above the home indicator and every target is at least 44px. */
export function BottomTabBar() {
  const path = usePathname();
  if (useChrome().immersive) return null;
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-edge bg-bg pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {APP_NAV.map(({ href, label, icon: IconComponent }) => {
          const active = path === href || path.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-bold transition-colors", active ? "text-fg" : "text-muted")}
              >
                <span className={cn("grid h-8 w-14 place-items-center rounded-full border-2 transition-colors", active ? "border-edge bg-accent text-accent-fg" : "border-transparent")}>
                  <IconComponent aria-hidden weight={active ? "fill" : "regular"} className="size-6" />
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
