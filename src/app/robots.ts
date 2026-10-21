import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Public pages are open to everyone, including AI crawlers. The signed-in app and the admin are not.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/home", "/chat", "/groups", "/me", "/admin", "/login", "/signup"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
