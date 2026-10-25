import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Archivo has a width axis, which gives the narrow heavy headlines.
const display = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.appName}` },
  description: SITE.description,
  applicationName: SITE.appName,
  icons: {
    icon: [
      { url: "/anonme-logo.png", sizes: "1254x1254", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/anonme-logo.png", sizes: "1254x1254", type: "image/png" },
    ],
    shortcut: "/anonme-logo.png",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Resize the layout viewport when the soft keyboard opens so that
  // sticky/fixed elements (e.g. the registration "Next" bar) ride up
  // with the keyboard instead of hiding behind it.
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0f" },
    { media: "(prefers-color-scheme: light)", color: "#f2f3f5" },
  ],
};

// Applies a saved theme before the first paint so the page never flashes the wrong colours.
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const GLOBAL_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.appName,
      alternateName: ["Anonmee", "Anonme", "Anonmee App", "Anonme Dating App"],
      description: SITE.description,
      inLanguage: "en-US",
      image: `${SITE.url}/anonme-logo.png`,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/#application`,
      name: SITE.appName,
      alternateName: ["Anonmee", "Anonme Dating App", "Anonmee Anonymous Dating"],
      url: SITE.url,
      image: `${SITE.url}/anonme-logo.png`,
      screenshot: `${SITE.url}/anonme-logo.png`,
      applicationCategory: "DatingApplication, LifestyleApplication, SocialNetworkingApplication",
      applicationSubCategory: "Dating, Friendship, Social Networking",
      operatingSystem: "Web, iOS, Android, macOS, Windows",
      browserRequirements: "Requires modern web browser with WebSocket support",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "12480",
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: 18,
      },
      featureList: [
        "Anonmee Dating App anonymous matchmaking without photo superficiality",
        "Intent-based pairing: casual dating, romance, flirting, deep conversation, friendship",
        "Strictly 18+ adult dating and stranger chat community",
        "Zero personal phone number or real name required",
        "Instant 1:1 real-time text chat with fast Skip button",
        "100% ephemeral chats wiped upon exit",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: "Anonmee Dating App",
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/anonme-logo.png`,
        width: "1254",
        height: "1254",
        caption: "Anonmee Dating App Official Logo",
      },
      image: `${SITE.url}/anonme-logo.png`,
      description: SITE.description,
      email: SITE.contact.support,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable} h-full`} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title={SITE.name} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script id="theme-script" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} suppressHydrationWarning />
      </head>
      <body className="min-h-[100dvh] flex flex-col">
        <script
          id="global-schema-ld-json"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_SCHEMA).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
