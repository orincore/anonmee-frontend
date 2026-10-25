import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared";
import { AUDIENCES } from "@/lib/audiences";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who Anonmee is Built For — Dating, Friendship & Community Hubs",
  description:
    "Explore how Anonmee is tailored for introverts, college students (18+), night owls, LGBTQ+ adults, and people seeking authentic connection without photo swiping.",
  keywords: ["dating for introverts", "college chat app", "late night talks", "lgbtq dating anonymous", "mature dating over 30"],
  alternates: { canonical: `${SITE.url}/for` },
};

export default function AudiencesDirectoryPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-fg">Home</Link>
        <span>/</span>
        <span className="text-fg">Who It Is For</span>
      </nav>

      <section className="mb-14 space-y-4">
        <SectionHeading
          as="h1"
          title="Designed for Real People. Tailored for Your Vibe."
          body="Whatever your lifestyle, schedule, or personality, Anonmee removes the performative pressure of modern social apps so you can connect honestly."
        />
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AUDIENCES.map((a) => (
          <Link
            key={a.slug}
            href={`/for/${a.slug}`}
            className="flex flex-col justify-between rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
          >
            <div>
              <span className="inline-block rounded-full border border-edge bg-accent px-3 py-0.5 text-xs font-bold text-accent-fg">
                {a.badge}
              </span>
              <h2 className="display mt-3 text-2xl">{a.title}</h2>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
            </div>
            <span className="mt-6 font-bold text-sm text-accent-text underline">Learn more & chat →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
