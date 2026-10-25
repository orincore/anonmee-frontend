import { SITE } from "./site";

export interface PublicGroup {
  id: string;
  title: string;
  topic: string;
  description: string;
  memberCount: number;
  createdAt: number;
}

export interface GlobalRoomStats {
  roomId: string;
  title: string;
  description: string;
  activeParticipants: number;
  trendingTopics: string[];
}

function getApiBase(): string {
  // During server-side rendering / build on production, localhost:4110 is fastest and direct.
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL ?? "http://127.0.0.1:4110";
  }
  return SITE.api;
}

/**
 * Fetch open groups for public directory and sitemap generation.
 * Never throws — returns empty array on failure so builds don't fail.
 */
export async function getPublicGroups(opts?: { topic?: string; limit?: number }): Promise<PublicGroup[]> {
  const base = getApiBase();
  const limit = opts?.limit ?? 50;
  const topicParam = opts?.topic ? `&topic=${encodeURIComponent(opts.topic)}` : "";
  const url = `${base}/groups/public?limit=${limit}${topicParam}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { groups: PublicGroup[] };
    return data.groups ?? [];
  } catch {
    // If internal fetch failed (e.g. during local offline build), try public api fallback
    try {
      const publicUrl = `${SITE.api}/groups/public?limit=${limit}${topicParam}`;
      const res = await fetch(publicUrl, { next: { revalidate: 60 } });
      if (!res.ok) return [];
      const data = (await res.json()) as { groups: PublicGroup[] };
      return data.groups ?? [];
    } catch {
      return [];
    }
  }
}

/**
 * Fetch a single group's public metadata for SEO and guest preview.
 * Strictly metadata only (title, topic, description, member count).
 * NEVER returns or exposes any chat messages.
 */
export async function getPublicGroup(id: string): Promise<PublicGroup | null> {
  if (id === "global") {
    return {
      id: "global",
      title: "Global Chat (Everyone)",
      topic: "global",
      description: "Open to all of Anonmee — live anonymous public chat across the globe with zero photos or tracking.",
      memberCount: 500,
      createdAt: 1790800000000,
    };
  }

  const base = getApiBase();
  try {
    const res = await fetch(`${base}/groups/${id}/public`, {
      next: { revalidate: 30 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { group: PublicGroup };
    return data.group ?? null;
  } catch {
    try {
      const res = await fetch(`${SITE.api}/groups/${id}/public`, { next: { revalidate: 30 } });
      if (!res.ok) return null;
      const data = (await res.json()) as { group: PublicGroup };
      return data.group ?? null;
    } catch {
      return null;
    }
  }
}

/**
 * Fetch live public stats for the Global Chat room.
 */
export async function getGlobalStats(): Promise<GlobalRoomStats> {
  const base = getApiBase();
  try {
    const res = await fetch(`${base}/groups/global/stats`, {
      next: { revalidate: 15 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("bad stats");
    return (await res.json()) as GlobalRoomStats;
  } catch {
    return {
      roomId: "global",
      title: "Everyone (Global Chat)",
      description: "Open to all of Anonmee — live anonymous public chat across the globe.",
      activeParticipants: 28,
      trendingTopics: ["dating", "friendship", "confessions", "deep-talks", "open-chat"],
    };
  }
}
