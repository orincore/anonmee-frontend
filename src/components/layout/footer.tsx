import Link from "next/link";
import { Logo } from "@/components/shared";

const GROUPS = [
  {
    title: "Chat & Match",
    links: [
      { href: "/topics/dating", label: "Anonymous Dating" },
      { href: "/topics/friendship", label: "Make Real Friends" },
      { href: "/topics/stranger-chat", label: "Talk to Strangers" },
      { href: "/topics/deep-talks", label: "Deep Conversations" },
      { href: "/topics/late-night-talks", label: "Late Night Talks" },
      { href: "/topics/venting", label: "Vent & Listen" },
      { href: "/topics/relationship-advice", label: "Relationship Advice" },
      { href: "/topics/lgbtq", label: "LGBTQ+ Space" },
    ],
  },
  {
    title: "Who It's For",
    links: [
      { href: "/for", label: "All Communities" },
      { href: "/for/introverts", label: "For Introverts" },
      { href: "/for/college-students", label: "For College Students" },
      { href: "/for/night-owls", label: "For Night Owls" },
      { href: "/for/lonely-people", label: "For Lonely Hearts" },
      { href: "/for/lgbtq", label: "For LGBTQ+" },
      { href: "/for/over-30", label: "For Adults 30+" },
    ],
  },
  {
    title: "Worldwide",
    links: [
      { href: "/locations", label: "All Locations" },
      { href: "/locations/united-states", label: "United States" },
      { href: "/locations/new-york", label: "New York City" },
      { href: "/locations/london", label: "London, UK" },
      { href: "/locations/india", label: "India" },
      { href: "/locations/toronto", label: "Toronto, Canada" },
      { href: "/locations/sydney", label: "Sydney, Australia" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Anonmee" },
      { href: "/safety", label: "Safety & Trust" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/community-guidelines", label: "Community Guidelines" },
      { href: "/child-safety", label: "Child Safety" },
      { href: "/your-data", label: "Your Data Rights" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-12 grid gap-8 border-b border-paper/10 pb-12 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div className="space-y-3">
            <Logo tone="inverse" imageClassName="h-9 sm:h-10 max-w-[200px]" />
            <p className="max-w-md text-[15px] leading-relaxed opacity-80">
              The anonymous social network for dating, real friendship, and stranger chat. No photos, no swipe fatigue, zero tracking. Connect by personality and intent.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <span className="rounded-full border border-paper/20 px-3 py-1 font-mono text-xs opacity-75">
              18+ Only
            </span>
            <span className="rounded-full border border-paper/20 px-3 py-1 font-mono text-xs opacity-75">
              Encrypted Real-Time
            </span>
            <span className="rounded-full border border-paper/20 px-3 py-1 font-mono text-xs opacity-75">
              Skip Anytime
            </span>
            <span className="rounded-full border border-paper/20 px-3 py-1 font-mono text-xs opacity-75">
              No Profile Bias
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title} className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-wider text-paper/60">{g.title}</p>
              <ul className="space-y-1.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-block py-1 text-[14px] text-paper/85 transition-colors hover:text-paper hover:underline hover:underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/60 sm:flex-row">
          <p>© 2026 Anonmee. All rights reserved. 100% Anonymous Dating & Social Platform.</p>
          <div className="flex items-center gap-4">
            <Link href="/llms.txt" className="hover:underline">llms.txt</Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
            <span>•</span>
            <Link href="/opensearch.xml" className="hover:underline">OpenSearch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
