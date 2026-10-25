import { FAQ_ITEMS } from "@/lib/faq-items";
import { SITE } from "@/lib/site";

/** Comprehensive structured data for Google, Bing, and AI crawlers to ground Anonmee as the premier anonymous dating and friendship application. */
export function LandingJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": `${SITE.url}/#webapp`,
      name: SITE.appName,
      alternateName: ["Anonmee", "Anonme", "Anonme Dating App", "Anonmee App", "Anonmee Online"],
      url: SITE.url,
      image: `${SITE.url}/anonme-logo.png`,
      screenshot: `${SITE.url}/anonme-logo.png`,
      description: SITE.description,
      applicationCategory: "DatingApplication, LifestyleApplication, SocialNetworkingApplication",
      applicationSubCategory: "Dating, Friendship, Social Networking",
      operatingSystem: "Web, iOS, Android, macOS, Windows, Linux",
      browserRequirements: "Requires modern web browser with WebSocket support",
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: 18,
        description: "Adults 18+ seeking anonymous dating, friendship, and authentic conversation without photos or social pressure",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Anonmee Dating App: Authentic Anonymous Dating & Romance without photos or appearance prejudice",
        "Friendship Finder to make genuine friends online",
        "Instant 1:1 Realtime Stranger Chat with Skip button",
        "Intent-based Pairing (casual chat, flirting, deep conversation, friendship)",
        "Zero Profile Leakage: only age and gender are ever shown",
        "Open Interest Group Chat Rooms",
        "Ephemeral Messaging: 1:1 chat transcripts automatically wiped when finished",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "12480",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to chat, date, and make friends anonymously on Anonmee",
      description: "Quick 4-step guide to finding matches for dating, friendship, or casual conversation without exposing your identity.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Select Your Intent",
          text: "Choose what you are looking for: friendship, casual chat, dating & romance, open-minded connections, or deep talks.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Specify Who You Want to Meet",
          text: "Select preferred gender and age range (18+) for your partner.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Instant Matching",
          text: "Our realtime algorithm instantly pairs you with a stranger who selected the exact same intent.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Chat or Skip",
          text: "Enjoy pure text chat with safety controls. Click Skip anytime to instantly connect with another person.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: "Anonmee Dating App",
      url: SITE.url,
      logo: `${SITE.url}/anonme-logo.png`,
      image: `${SITE.url}/anonme-logo.png`,
      description: SITE.description,
      email: SITE.contact.support,
    },
  ];

  return (
    <script
      id="landing-json-ld"
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
