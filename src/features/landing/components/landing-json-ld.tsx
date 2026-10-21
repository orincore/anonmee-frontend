import { SITE } from "@/lib/site";

/** Structured data so search engines and AI assistants describe Anonmee accurately. It mirrors the visible copy. */
export function LandingJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Any",
      audience: { "@type": "PeopleAudience", suggestedMinAge: 18 },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url },
  ];
  // Static, server-built JSON: no user input ever reaches this script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
