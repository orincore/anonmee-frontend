import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Support — Reach the Anonmee Team",
  description: "Official contact points for Anonmee: customer support, trust & safety reports, legal inquiries, and grievance redressal officer.",
  keywords: ["contact anonmee", "anonmee support", "safety report", "grievance officer"],
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "Contact Anonmee Support & Safety",
    description: "Get in touch with the Anonmee team for assistance, safety reports, or grievances.",
    url: `${SITE.url}/contact`,
  },
};

const C = SITE.contact;

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Anonmee",
    url: `${SITE.url}/contact`,
    description: "Direct email contact points for support, safety, legal, and grievance handling at Anonmee.",
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: C.support,
          contactType: "customer support",
        },
        {
          "@type": "ContactPoint",
          email: C.safety,
          contactType: "safety and abuse",
        },
        {
          "@type": "ContactPoint",
          email: C.grievance,
          contactType: "grievance officer",
        },
        {
          "@type": "ContactPoint",
          email: C.legal,
          contactType: "legal department",
        },
      ],
    },
  };

  return (
    <>
      <ProsePage
        title="Talk to us."
        intro="A real team reads these. Tell us what happened and we will help."
        sections={[
          { heading: "Support", paragraphs: [`Questions, problems with your account, or help with your data: ${C.support}. Please write from the email you signed up with.`] },
          { heading: "Safety and abuse", paragraphs: [`To report something serious, use Report in the chat first, so we can act on the exact messages. You can also write to ${C.safety}. If anyone is in danger, contact your local emergency services.`] },
          {
            heading: "Grievances",
            paragraphs: ["If you are unhappy with how we handled something, or want to complain about content on Anonmee, write to our grievance officer. We acknowledge every complaint within 24 hours and aim to resolve it within 15 days."],
            bullets: [`Grievance officer: ${SITE.grievanceOfficer}`, `Email: ${C.grievance}`],
          },
          { heading: "Legal requests", paragraphs: [`Law enforcement and legal notices: ${C.legal}. We respond to valid legal requests, we ask for the legal basis, and we tell the people affected when we are allowed to.`] },
        ]}
      />
      <script
        id="contact-json-ld"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
