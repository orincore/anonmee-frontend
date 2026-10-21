import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { YOUR_DATA_SECTIONS } from "@/features/content/legal-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your data and deleting your account",
  description: "See, correct and delete your Anonmee data. Delete your account yourself with your password.",
  alternates: { canonical: `${SITE.url}/your-data` },
};

export default function Page() {
  return <ProsePage title="Your data, your call." intro="How to see it, change it, and delete it." updated="October 2026" sections={YOUR_DATA_SECTIONS} />;
}
