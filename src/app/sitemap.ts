import type { MetadataRoute } from "next";
import { AUDIENCES } from "@/lib/audiences";
import { LOCATIONS } from "@/lib/locations";
import { getPublicGroups } from "@/lib/public-groups";
import { SITE } from "@/lib/site";
import { TOPICS } from "@/lib/topics";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Root landing page
  const rootEntry: MetadataRoute.Sitemap[number] = {
    url: SITE.url,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
  };

  // High-priority Global Chat & Groups hub
  const globalChatEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE.url}/global-chat`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.95,
  };

  const groupsIndexEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE.url}/groups`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  };

  const globalRoomEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE.url}/groups/global`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.95,
  };

  // Dynamic user-created public groups
  let groupEntries: MetadataRoute.Sitemap = [];
  try {
    const publicGroups = await getPublicGroups({ limit: 100 });
    groupEntries = publicGroups.map((g) => ({
      url: `${SITE.url}/groups/${g.id}`,
      lastModified: new Date(g.createdAt),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
  } catch {
    groupEntries = [];
  }

  // High-priority core topic pages
  const topicEntries: MetadataRoute.Sitemap = TOPICS.map((t) => {
    const isPrimaryVertical = ["dating", "friendship", "stranger-chat", "deep-talks", "venting"].includes(t.slug);
    return {
      url: `${SITE.url}/topics/${t.slug}`,
      lastModified: now,
      changeFrequency: isPrimaryVertical ? "daily" : "weekly",
      priority: isPrimaryVertical ? 0.9 : 0.7,
    };
  });

  // Location-based SEO pages (Cities & Countries)
  const locationIndex: MetadataRoute.Sitemap[number] = {
    url: `${SITE.url}/locations`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };
  const locationEntries: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: `${SITE.url}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: l.type === "country" ? 0.85 : 0.75,
  }));

  // User Target / Persona-based SEO pages
  const audienceIndex: MetadataRoute.Sitemap[number] = {
    url: `${SITE.url}/for`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };
  const audienceEntries: MetadataRoute.Sitemap = AUDIENCES.map((a) => ({
    url: `${SITE.url}/for/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Marketing & documentation pages
  const coreContentPages = [
    { path: "/about", priority: 0.8, frequency: "weekly" as const },
    { path: "/safety", priority: 0.8, frequency: "weekly" as const },
    { path: "/faq", priority: 0.8, frequency: "weekly" as const },
    { path: "/community-guidelines", priority: 0.6, frequency: "monthly" as const },
    { path: "/child-safety", priority: 0.6, frequency: "monthly" as const },
    { path: "/contact", priority: 0.5, frequency: "monthly" as const },
    { path: "/privacy", priority: 0.5, frequency: "monthly" as const },
    { path: "/terms", priority: 0.5, frequency: "monthly" as const },
    { path: "/cookies", priority: 0.4, frequency: "monthly" as const },
    { path: "/your-data", priority: 0.4, frequency: "monthly" as const },
  ].map((page) => ({
    url: `${SITE.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.frequency,
    priority: page.priority,
  }));

  return [
    rootEntry,
    globalChatEntry,
    groupsIndexEntry,
    globalRoomEntry,
    ...groupEntries,
    ...topicEntries,
    locationIndex,
    ...locationEntries,
    audienceIndex,
    ...audienceEntries,
    ...coreContentPages,
  ];
}
