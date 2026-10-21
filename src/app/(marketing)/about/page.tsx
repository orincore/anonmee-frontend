import type { Metadata } from "next";
import { ProsePage } from "@/features/content/components/prose-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Anonmee is an anonymous chat for adults. Only gender and age are ever shown. Here is why we built it.",
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return (
    <ProsePage
      title="Say it. Stay you."
      intro="Anonmee exists so adults can talk to someone new without handing over their identity."
      sections={[
        { heading: "What it is", paragraphs: ["A free anonymous chat. You pick what you are here for, we match you with a stranger who picked the same, and you talk. Or join a group about something you love. Nobody sees your email, username, name or date of birth. Only your gender and age."] },
        { heading: "Why", paragraphs: ["Most social apps ask you to be someone: a profile, photos, followers. Sometimes you just want a conversation where none of that matters. Anonymous does not have to mean unsafe, so safety is built in: adults only, text only, and report and block one tap away."] },
        { heading: "What we promise, and what we do not", paragraphs: ["We promise to show other people only a random name, your gender and your age, to delete one-to-one chats when they end, and to let you delete your account. We do not promise that strangers will always behave, which is why you are always in control of leaving, blocking and reporting."] },
      ]}
    />
  );
}
