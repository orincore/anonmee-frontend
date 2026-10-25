import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { VisitTracker } from "@/features/landing/components/visit-tracker";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  keywords: [...SITE.keywords],
  category: SITE.category,
  classification: "Dating, Friendship, Anonymous Social Network",
  creator: SITE.name,
  publisher: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    type: "website",
    siteName: SITE.appName,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: "en_US",
    images: [
      { url: "/anonme-logo.png", width: 1254, height: 1254, alt: "Anonmee Dating App Logo - Free Anonymous Dating & Stranger Chat" },
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Anonmee Dating App: Anonymous Dating, Friendship & Stranger Chat" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/anonme-logo.png"],
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

// Public pages: static, indexable, and light on JavaScript.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <VisitTracker />
    </>
  );
}
