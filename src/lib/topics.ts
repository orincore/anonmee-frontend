/** Public topic pages. The slug is the canonical tag; synonyms are mapped to it on the server. */
export const TOPICS = [
  { slug: "football", label: "Football", blurb: "Matchday talk, transfers and hot takes from fans all over the world." },
  { slug: "cricket", label: "Cricket", blurb: "Live scores, old rivalries and arguments about the best XI." },
  { slug: "advice", label: "Advice", blurb: "Ask something you could not ask anyone you know. Answers come from strangers, so be kind to yourself." },
  { slug: "music", label: "Music", blurb: "Share what is on repeat and find something new." },
  { slug: "late-night-talks", label: "Late night talks", blurb: "For the hours when everyone else is asleep." },
  { slug: "games", label: "Games", blurb: "Squads, strategy and bragging rights." },
] as const;

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);
