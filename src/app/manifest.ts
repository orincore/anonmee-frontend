import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anonmee Dating App — Anonymous Dating, Friendship & Stranger Chat",
    short_name: "Anonmee Dating",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4f8",
    theme_color: "#3b4bff",
    categories: ["lifestyle", "social", "dating"],
    lang: "en",
    dir: "ltr",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/anonme-logo.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Start Chatting",
        url: "/signup",
        description: "Join Anonmee and start chatting anonymously in seconds",
      },
      {
        name: "Browse Topics",
        url: "/#topics",
        description: "Explore interest groups and community rooms",
      },
    ],
  };
}
