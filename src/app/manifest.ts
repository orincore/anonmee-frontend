import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anonmee — Anonymous Dating, Friendship & Stranger Chat",
    short_name: "Anonmee",
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
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
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
