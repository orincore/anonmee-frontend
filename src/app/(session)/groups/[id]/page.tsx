import type { Metadata } from "next";
import { GroupViewContainer } from "@/features/groups/components/group-view-container";
import { getPublicGroup } from "@/lib/public-groups";
import { SITE } from "@/lib/site";

// Signed-in screens load on the client, so there is nothing for Next to pre-render. See (session)/layout.tsx.
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const group = await getPublicGroup(id);

  if (id === "global") {
    return {
      title: "Global Chat — Live Anonymous Global Chatroom (18+) | Anonmee Dating App",
      description:
        "Join the official Anonmee Global Chat. Connect with singles, adults, and strangers worldwide in real-time with 100% privacy and zero photo bias.",
      alternates: { canonical: `${SITE.url}/groups/global` },
      openGraph: {
        title: "Global Chat — Live Anonymous Global Chatroom (18+) | Anonmee",
        description:
          "Connect with singles, adults, and strangers worldwide in real-time with 100% anonymity. Zero photos, no real names.",
        url: `${SITE.url}/groups/global`,
        siteName: SITE.name,
        locale: "en_US",
        type: "website",
        images: [{ url: `${SITE.url}/og-image.png`, width: 1200, height: 630, alt: "Anonmee Global Chat" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Global Chat — Live Anonymous Global Chatroom (18+) | Anonmee",
        description:
          "Connect with singles, adults, and strangers worldwide in real-time with 100% anonymity. Zero photos, no real names.",
        images: [`${SITE.url}/og-image.png`],
      },
    };
  }

  if (group) {
    const title = `${group.title} — Anonymous ${group.topic} Group Chat | Anonmee`;
    const description = group.description
      ? `${group.description} | Join ${group.title} on Anonmee. An anonymous ${group.topic} group chat with ${group.memberCount} members. 100% private.`
      : `Join ${group.title} on Anonmee. An anonymous ${group.topic} group chat with ${group.memberCount} members. 100% private, no real names.`;
    const url = `${SITE.url}/groups/${id}`;

    return {
      title,
      description,
      keywords: [
        group.title.toLowerCase(),
        `${group.topic} group chat`,
        `anonymous ${group.topic}`,
        "anonymous group chat",
        "anonmee groups",
        "talk to strangers",
        "adults 18+",
      ],
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        siteName: SITE.name,
        locale: "en_US",
        type: "article",
        images: [{ url: `${SITE.url}/anonme-logo.png`, width: 1200, height: 630, alt: group.title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`${SITE.url}/anonme-logo.png`],
      },
    };
  }

  return {
    title: "Anonymous Group Chat | Anonmee Dating App",
    description: "Join anonymous community group chats on Anonmee.",
  };
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const group = (await getPublicGroup(id)) ?? {
    id,
    title: id === "global" ? "Everyone (Global Chat)" : "Anonymous Group",
    topic: "general",
    description: "Join this anonymous discussion group on Anonmee.",
    memberCount: 1,
    createdAt: Date.now(),
  };

  return <GroupViewContainer id={id} initialGroup={group} />;
}
