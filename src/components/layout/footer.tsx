import Link from "next/link";
import { Logo } from "@/components/shared";

const GROUPS = [
  {
    title: "Anonmee",
    links: [
      { href: "/about", label: "About" },
      { href: "/safety", label: "Safety" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
      { href: "/community-guidelines", label: "Community guidelines" },
      { href: "/child-safety", label: "Child safety" },
      { href: "/your-data", label: "Your data" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <Logo tone="inverse" className="text-5xl" />
          <p className="max-w-xs pt-2 text-[15px] opacity-80">Anonymous chat for adults. You must be 18 or older to use Anonmee.</p>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.title} aria-label={g.title} className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-wide opacity-60">{g.title}</p>
            <ul>
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center rounded-full pr-4 text-[15px] font-semibold hover:underline hover:underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
