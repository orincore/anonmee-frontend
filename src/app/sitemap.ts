import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TOPICS } from "@/lib/topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/safety", "/faq", "/contact", "/terms", "/privacy", "/cookies", "/community-guidelines", "/child-safety", "/your-data", ...TOPICS.map((t) => `/topics/${t.slug}`)];
  return pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: p === "" ? "daily" : "monthly", priority: p === "" ? 1 : 0.6 }));
}
