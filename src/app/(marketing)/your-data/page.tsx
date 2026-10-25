import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { YOUR_DATA_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your Data Rights & Permanent Account Deletion",
  description:
    "How to view, modify, or permanently delete your Anonmee account and associated data. Complete user control and right to be forgotten.",
  keywords: ["delete account", "data rights", "privacy rights", "gdpr rights anonymous chat"],
  alternates: { canonical: `${SITE.url}/your-data` },
  openGraph: {
    title: "Your Data Rights at Anonmee",
    description: "Full control over your data: view, export, or permanently delete your account in one click.",
    url: `${SITE.url}/your-data`,
  },
};

export default function Page() {
  return <ProsePage title="Your data, your call." intro="How to see it, change it, and delete it." updated="October 2026" sections={YOUR_DATA_SECTIONS} />;
}
