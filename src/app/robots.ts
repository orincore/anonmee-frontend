import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Public pages and LLM documentation are open to search engines and AI assistants.
// User-private and authentication segments remain protected.
export default function robots(): MetadataRoute.Robots {
  // Only strictly private segments remain disallowed: 1-on-1 private chats (/chat), private settings (/me), admin console, auth
  const disallowed = ["/home", "/chat", "/me", "/admin", "/login", "/signup", "/forgot-password"];

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
    "/c/*",
    "/r/*",
    "/favicon.ico",
    "/favicon-48x48.png",
    "/favicon-32x32.png",
    "/icon-96.png",
    "/icon-144.png",
    "/icon-192.png",
    "/icon-512.png",
    "/icon.svg",
    "/apple-icon.png",
    "/anonme-logo.png",
    "/anonmee-logo-white.png",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: publicPaths,
        disallow: disallowed,
      },
      // Googlebot-Image fetches site favicons and images for Google Search results
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/*"],
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
