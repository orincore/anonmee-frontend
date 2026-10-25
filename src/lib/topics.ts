/**
 * Public topic pages.
 * The slug is the canonical tag; search engines and AI assistants use these to index high-intent verticals.
 */
export const TOPICS = [
  {
    slug: "dating",
    label: "Anonymous Dating",
    blurb: "Flirting, romance, and genuine connections without photo bias or superficial swiping. Pure personality-first dating for adults 18+.",
    keywords: ["anonymous dating app", "dating without pictures", "free dating app", "adult dating 18+", "online romance", "flirting app"],
  },
  {
    slug: "friendship",
    label: "Friendship & Making Friends",
    blurb: "Find real friends who share your mindset, talk through your day, and build authentic bonds without social media pressure.",
    keywords: ["friendship app", "make friends online", "find friends online", "friend finder", "meet new friends"],
  },
  {
    slug: "stranger-chat",
    label: "Talk to Strangers",
    blurb: "Instant random 1:1 text chats with verified adults (18+). Safe, completely anonymous, with an instant Skip button.",
    keywords: ["talk to strangers", "anonymous stranger chat", "random chat app", "text chat with strangers", "omegle alternative"],
  },
  {
    slug: "deep-talks",
    label: "Deep Conversations",
    blurb: "Meaningful conversations about life, philosophy, late-night thoughts, and questions you cannot ask people in real life.",
    keywords: ["deep conversation app", "philosophical talks", "late night thoughts", "meaningful conversations"],
  },
  {
    slug: "venting",
    label: "Vent & Listen",
    blurb: "A safe, confidential space to vent your feelings, release stress, blow off steam, and find kind strangers who actually listen.",
    keywords: ["venting app", "anonymous support", "safe space to vent", "listen to me", "emotional outlet"],
  },
  {
    slug: "relationship-advice",
    label: "Dating & Relationship Advice",
    blurb: "Honest perspectives, dating dilemmas, breakup advice, and real relationship answers from adults who understand.",
    keywords: ["relationship advice", "dating advice anonymous", "marriage questions", "breakup support"],
  },
  {
    slug: "lgbtq",
    label: "LGBTQ+ Community",
    blurb: "Affirming, safe chat rooms for queer, trans, bi-curious, and non-binary adults to connect openly and without judgment.",
    keywords: ["lgbtq chat app", "queer dating anonymous", "trans chat", "bi-curious community"],
  },
  {
    slug: "late-night-talks",
    label: "Late Night Talks",
    blurb: "For the quiet hours when everyone else is asleep. Raw thoughts, honest talk, and companionable late-night company.",
    keywords: ["late night talks", "can't sleep chat", "insomnia friends", "night owl chat"],
  },
  {
    slug: "advice",
    label: "Life Advice",
    blurb: "Ask what you could not ask anyone you know. Unbiased, anonymous answers from strangers worldwide.",
    keywords: ["anonymous advice", "life questions", "peer advice app"],
  },
  {
    slug: "music",
    label: "Music & Playlists",
    blurb: "Share what is on repeat, discover underground tracks, debate classic albums, and find fellow music lovers.",
    keywords: ["music chat", "playlist sharing", "song recommendations"],
  },
  {
    slug: "games",
    label: "Gaming & Squads",
    blurb: "Find co-op gaming partners, discuss strategies, and talk about your favorite titles without toxic lobbies.",
    keywords: ["gaming buddies", "squad finder", "gamer chat anonymous"],
  },
  {
    slug: "movies-tv",
    label: "Movies & Shows",
    blurb: "Plot theories, indie gems, spoiler-free reviews, and TV show binge recommendations with fellow cinephiles.",
    keywords: ["movie discussions", "tv show recommendations", "cinema lovers"],
  },
  {
    slug: "football",
    label: "Football",
    blurb: "Matchday talk, transfer rumors, tactical breakdowns, and hot takes from passionate fans all over the world.",
    keywords: ["football chat", "soccer fans", "matchday talk"],
  },
  {
    slug: "cricket",
    label: "Cricket",
    blurb: "Live scores, historic rivalries, match banter, and debates about the greatest XI.",
    keywords: ["cricket chat", "ipl discussions", "live cricket talk"],
  },
] as const;

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);
