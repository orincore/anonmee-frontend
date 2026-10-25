import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { LOCATIONS, locationBySlug } from "@/lib/locations";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const loc = locationBySlug((await params).slug);
  if (!loc) return {};

  const title = `${loc.name} Anonymous Dating & Stranger Chat — Anonmee (18+)`;
  const url = `${SITE.url}/locations/${loc.slug}`;

  return {
    title,
    description: loc.description,
    keywords: [...loc.keywords, "anonymous dating", "talk to strangers", "dating app", "friendship app"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: loc.description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
    },
    other: {
      "geo.placename": loc.name,
      "geo.position": `${loc.geo.lat};${loc.geo.lng}`,
      ICBM: `${loc.geo.lat}, ${loc.geo.lng}`,
      ...(loc.region ? { "geo.region": `${loc.countryCode}-${loc.region}` } : { "geo.region": loc.countryCode }),
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const loc = locationBySlug((await params).slug);
  if (!loc) notFound();

  const nearbyLocations = LOCATIONS.filter((l) => l.slug !== loc.slug && (l.countryCode === loc.countryCode || l.type === "country")).slice(0, 6);

  const localFaqs = [
    {
      q: `Can I match with people in ${loc.name}?`,
      a: `Yes. Anonmee connects adults (18+) locally and globally. Your exact location is never exposed: you connect safely using only your chosen gender and age.`,
    },
    {
      q: `Is Anonmee free for people in ${loc.name}?`,
      a: "Yes! Matching, 1:1 chat, skip controls, and interest groups are 100% free with no subscriptions or paywalls.",
    },
    {
      q: `Do I need to upload photos to date or chat in ${loc.name}?`,
      a: "No. Anonmee is text-only with zero profile photos. You are matched based on personality, humor, and shared intent, not superficial swipe culture.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE.url}/locations` },
        { "@type": "ListItem", position: 3, name: loc.name, item: `${SITE.url}/locations/${loc.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": loc.type === "city" ? "City" : "Country",
      name: loc.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.geo.lat,
        longitude: loc.geo.lng,
      },
      description: loc.headline,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: localFaqs.map((f) => ({
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
        <Link href="/locations" className="hover:text-fg">Locations</Link>
        <span>/</span>
        <span className="text-fg">{loc.name}</span>
      </nav>

      <section className="mb-14 space-y-6">
        <span className="inline-block rounded-full border-2 border-edge bg-accent px-4 py-1 text-sm font-bold shadow-sticker-sm">
          {loc.country}
        </span>
        <SectionHeading as="h1" title={loc.headline} body={loc.description} className="mb-4" />
        <p className="max-w-2xl text-lg text-muted">
          Whether you are looking for casual dating, romantic relationships, new friends, or someone to chat with late at night in {loc.name}, Anonmee pairs you in seconds with adults sharing your exact intent.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/signup">
              Start chatting in {loc.name}
              <ArrowRight aria-hidden weight="bold" className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="mb-16 grid gap-5 sm:grid-cols-3">
        <div className="rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
          <h2 className="display text-2xl">Location Privacy</h2>
          <p className="mt-2 text-sm text-muted">Your city, IP address, and physical location are never disclosed to peers. Only your age and gender appear in chat.</p>
        </div>
        <div className="rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
          <h2 className="display text-2xl">Skip & Rematch</h2>
          <p className="mt-2 text-sm text-muted">Not feeling the vibe? Tap Skip anytime to instantly match with another person in seconds.</p>
        </div>
        <div className="rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
          <h2 className="display text-2xl">Adults 18+ Only</h2>
          <p className="mt-2 text-sm text-muted">A verified adult community where mature conversations thrive without fake profiles or automated bots.</p>
        </div>
      </section>

      {/* Local FAQ */}
      <section className="mb-16 space-y-6">
        <h2 className="display text-3xl">Questions about chatting in {loc.name}</h2>
        <div className="space-y-4">
          {localFaqs.map((faq, i) => (
            <div key={i} className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
              <h3 className="font-bold text-lg">{faq.q}</h3>
              <p className="mt-2 text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Locations */}
      <section className="space-y-4 border-t-2 border-line pt-10">
        <h2 className="display text-2xl">More Cities & Countries</h2>
        <div className="flex flex-wrap gap-2.5">
          {nearbyLocations.map((l) => (
            <Link
              key={l.slug}
              href={`/locations/${l.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border-2 border-edge bg-surface px-4 py-1 text-sm font-bold shadow-sticker-sm hover:bg-line transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </section>

      <script
        id="location-json-ld"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
