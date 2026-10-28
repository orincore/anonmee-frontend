import type { Metadata } from "next";
import { GroupsViewContainer } from "@/features/groups/components/groups-view-container";
import { getPublicGroups } from "@/lib/public-groups";
import { SITE } from "@/lib/site";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export const metadata: Metadata = {
  title: "Anonymous Groups & Community Chatrooms | Anonmee Dating App",
  description:
    "Browse and join anonymous group chats on Anonmee. Discuss dating, romance, friendship, hobbies, and confessions with 100% privacy and zero photo bias.",
  keywords: [
    "anonymous groups",
    "anonymous chatrooms",
    "dating group chat",
    "stranger chat groups",
    "free anonymous community",
    "talk to strangers groups",
    "anonmee groups",
    "adults 18+ group chat",
  ],
  alternates: { canonical: `${SITE.url}/groups` },
  openGraph: {
    title: "Anonymous Groups & Community Chatrooms | Anonmee Dating App",
    description:
      "Browse and join anonymous group chats on Anonmee. Discuss dating, romance, friendship, hobbies, and confessions with 100% privacy and zero photo bias.",
    url: `${SITE.url}/groups`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE.url}/anonme-logo.png`,
        width: 1200,
        height: 630,
        alt: "Anonmee Anonymous Groups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonymous Groups & Community Chatrooms | Anonmee Dating App",
    description:
      "Browse and join anonymous group chats on Anonmee. Zero photos, no real names, pure conversation.",
    images: [`${SITE.url}/anonme-logo.png`],
  },
};

export default async function GroupsPage() {
  const initialGroups = await getPublicGroups({ limit: 50 });

  return <GroupsViewContainer initialGroups={initialGroups} />;
}
