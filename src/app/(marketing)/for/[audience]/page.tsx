import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { AUDIENCES, audienceBySlug } from "@/lib/audiences";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const aud = audienceBySlug((await params).audience);
  if (!aud) return {};

  const title = `${aud.title} — Anonmee (18+)`;
  const url = `${SITE.url}/for/${aud.slug}`;

  return {
    title,
    description: aud.description,
    keywords: [...aud.keywords, "dating app", "friendship app", "anonymous chat", "talk to strangers"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: aud.description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: aud.description,
    },
  };
}

export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) {
  const aud = audienceBySlug((await params).audience);
  if (!aud) notFound();

  const otherAudiences = AUDIENCES.filter((a) => a.slug !== aud.slug);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Who It Is For", item: `${SITE.url}/for` },
        { "@type": "ListItem", position: 3, name: aud.badge, item: `${SITE.url}/for/${aud.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: aud.title,
      url: `${SITE.url}/for/${aud.slug}`,
      description: aud.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: aud.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-fg">Home</Link>
        <span>/</span>
        <Link href="/for" className="hover:text-fg">Who It Is For</Link>
        <span>/</span>
        <span className="text-fg">{aud.badge}</span>
      </nav>

      <section className="mb-14 space-y-6">
        <span className="inline-block rounded-full border-2 border-edge bg-accent px-4 py-1 text-sm font-bold shadow-sticker-sm">
          {aud.badge}
        </span>
        <SectionHeading as="h1" title={aud.title} body={aud.tagline} className="mb-4" />
        <p className="max-w-2xl text-lg text-muted">
          {aud.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/signup">
              Start chatting now
              <ArrowRight aria-hidden weight="bold" className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">Log in to account</Link>
          </Button>
        </div>
      </section>

      {/* Why Anonmee Solves Your Pain Points */}
      <section className="mb-16 space-y-6">
        <h2 className="display text-3xl">Why Anonmee is Built for You</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {aud.painPoints.map((pt, i) => (
            <div key={i} className="flex flex-col justify-between rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-danger">The Problem</span>
                <h3 className="font-bold text-base mt-1 text-fg">{pt.problem}</h3>
              </div>
              <div className="mt-4 border-t-2 border-line pt-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-success uppercase tracking-wider">
                  <CheckCircle weight="bold" className="size-4" />
                  <span>The Anonmee Way</span>
                </div>
                <p className="mt-1 text-sm text-muted">{pt.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience FAQ */}
      <section className="mb-16 space-y-6">
        <h2 className="display text-3xl">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {aud.faqs.map((faq, i) => (
            <div key={i} className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
              <h3 className="font-bold text-lg">{faq.q}</h3>
              <p className="mt-2 text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore other audiences */}
      <section className="space-y-4 border-t-2 border-line pt-10">
        <h2 className="display text-2xl">Explore More Ways to Connect</h2>
        <div className="flex flex-wrap gap-2.5">
          {otherAudiences.map((a) => (
            <Link
              key={a.slug}
              href={`/for/${a.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border-2 border-edge bg-surface px-4 py-1 text-sm font-bold shadow-sticker-sm hover:bg-line transition-colors"
            >
              {a.badge}
            </Link>
          ))}
        </div>
      </section>

      <script
        id="audience-json-ld"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
