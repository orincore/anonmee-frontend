import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Public pages and LLM documentation are open to search engines and AI assistants.
// User-private and authentication segments remain protected.
export default function robots(): MetadataRoute.Robots {
  const disallowed = ["/home", "/chat", "/groups", "/me", "/admin", "/login", "/signup"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/safety",
          "/faq",
          "/contact",
          "/topics",
          "/topics/*",
          "/locations",
          "/locations/*",
          "/for",
          "/for/*",
          "/llms.txt",
          "/llms-full.txt",
          "/opensearch.xml",
          "/manifest.webmanifest",
        ],
        disallow: disallowed,
      },
      // Explicitly allow major AI search engines and answer engines
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
        ],
        allow: [
          "/",
          "/about",
          "/safety",
          "/faq",
          "/contact",
          "/topics",
          "/topics/*",
          "/locations",
          "/locations/*",
          "/for",
          "/for/*",
          "/llms.txt",
          "/llms-full.txt",
          "/opensearch.xml",
          "/manifest.webmanifest",
        ],
        disallow: disallowed,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
