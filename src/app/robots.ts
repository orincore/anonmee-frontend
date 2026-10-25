import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Public pages and LLM documentation are open to search engines and AI assistants.
// User-private and authentication segments remain protected.
export default function robots(): MetadataRoute.Robots {
  // Only strictly private segments remain disallowed: 1-on-1 private chats (/chat), private settings (/me), admin console, auth
  const disallowed = ["/home", "/chat", "/me", "/admin", "/login", "/signup"];

  const publicPaths = [
    "/",
    "/about",
    "/safety",
    "/faq",
    "/contact",
    "/global-chat",
    "/groups",
    "/groups/*",
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
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: publicPaths,
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
        allow: publicPaths,
        disallow: disallowed,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
