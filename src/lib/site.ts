export const SITE = {
  name: "Anonmee",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  api: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  /** Where people reach us. Make sure each of these mailboxes exists before launch. Override with environment variables. */
  contact: {
    support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@anonmee.in",
    safety: process.env.NEXT_PUBLIC_SAFETY_EMAIL ?? "safety@anonmee.in",
    grievance: process.env.NEXT_PUBLIC_GRIEVANCE_EMAIL ?? "grievance@anonmee.in",
    legal: process.env.NEXT_PUBLIC_LEGAL_EMAIL ?? "legal@anonmee.in",
  },
  /** Shown on the contact page. Put the real name of the person responsible in this variable. */
  grievanceOfficer: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER ?? "Grievance Officer, Anonmee",
  tagline: "Talk to someone new, without saying who you are.",
  description:
    "Anonmee is a free anonymous chat for adults 18 and over. Get matched with a stranger who wants the same kind of chat, or join a group about something you care about. Only gender and age are ever shown.",
} as const;
