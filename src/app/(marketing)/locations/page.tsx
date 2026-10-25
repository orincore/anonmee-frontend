import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared";
import { LOCATIONS } from "@/lib/locations";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Global Anonymous Dating & Stranger Chat Locations — Anonmee",
  description:
    "Explore Anonmee across cities and countries worldwide. Connect with adults 18+ in the US, UK, India, Canada, Australia, and beyond for anonymous dating and friendship.",
  keywords: ["anonymous dating locations", "talk to strangers by country", "global stranger chat", "dating app cities"],
  alternates: { canonical: `${SITE.url}/locations` },
};

export default function LocationsDirectoryPage() {
  const countries = LOCATIONS.filter((l) => l.type === "country");
  const cities = LOCATIONS.filter((l) => l.type === "city");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-fg">Home</Link>
        <span>/</span>
        <span className="text-fg">Locations</span>
      </nav>

      <section className="mb-14 space-y-4">
        <SectionHeading
          as="h1"
          title="Connect Anonymously Around the World."
          body="Whether you want to meet people in your country or talk to strangers across the globe, Anonmee pairs adults (18+) by mutual intent with zero photo bias."
        />
      </section>

      {/* Countries */}
      <section className="mb-16 space-y-6">
        <h2 className="display text-3xl">Countries</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <Link
              key={c.slug}
              href={`/locations/${c.slug}`}
              className="flex flex-col justify-between rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted">{c.countryCode}</span>
                <h3 className="display mt-1 text-2xl">{c.name}</h3>
                <p className="mt-2 text-sm text-muted">{c.description}</p>
              </div>
              <span className="mt-4 font-bold text-sm text-accent-text underline">Explore {c.name} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section className="space-y-6">
        <h2 className="display text-3xl">Major Metro Hubs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="flex flex-col justify-between rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted">{city.country}</span>
                <h3 className="display mt-1 text-2xl">{city.name}</h3>
                <p className="mt-2 text-sm text-muted">{city.description}</p>
              </div>
              <span className="mt-4 font-bold text-sm text-accent-text underline">Chat in {city.name} →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
