import Link from "next/link";
import { Logo, ThemeToggle } from "@/components/shared";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/safety", label: "Safety" },
  { href: "/faq", label: "FAQ" },
];

/** Public site header. One line at every width, 64px tall. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-edge bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold hover:bg-line">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Start chatting</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
