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
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  category: SITE.category,
  classification: "Dating, Friendship, Anonymous Social Network",
  creator: SITE.name,
  publisher: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Anonmee: Anonymous Dating, Friendship & Stranger Chat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/opengraph-image"],
    creator: `@${SITE.name.toLowerCase()}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
    languages: {
      "en-US": `${SITE.url}/`,
      "en-GB": `${SITE.url}/locations/london`,
      "en-IN": `${SITE.url}/locations/india`,
      "en-CA": `${SITE.url}/locations/toronto`,
      "en-AU": `${SITE.url}/locations/sydney`,
      "x-default": `${SITE.url}/`,
    },
  },
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
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/#application`,
      name: SITE.name,
      url: SITE.url,
      applicationCategory: "LifestyleApplication",
      applicationSubCategory: "Dating, Friendship, Social Networking",
      operatingSystem: "Any",
      browserRequirements: "Requires modern web browser with WebSocket support",
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
        "Anonymous Dating and Romance matching without photo bias",
        "Friendship and community group chat rooms",
        "Instant 1:1 real-time chat with strangers",
        "Intent-based matching (casual, romance, deep talks, friendship)",
        "Zero personal identifiable information exposed (only age and gender)",
        "Immediate skip button to find another match",
        "Ephemeral messages automatically erased when chat ends",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
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
