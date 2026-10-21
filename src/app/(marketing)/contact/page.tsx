import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and grievances",
  description: "How to reach Anonmee for support, safety reports, grievances and legal requests.",
  alternates: { canonical: `${SITE.url}/contact` },
};

const C = SITE.contact;

export default function ContactPage() {
  return (
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
  );
}
