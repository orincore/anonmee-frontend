export interface LocationItem {
  slug: string;
  name: string;
  type: "city" | "country";
  country: string;
  countryCode: string;
  region?: string;
  headline: string;
  description: string;
  keywords: string[];
  geo: {
    lat: number;
    lng: number;
  };
}

export const LOCATIONS: LocationItem[] = [
  // United States
  {
    slug: "united-states",
    name: "United States",
    type: "country",
    country: "United States",
    countryCode: "US",
    headline: "Anonymous Dating & Stranger Chat across the United States",
    description: "Connect with verified adults (18+) across the US for anonymous dating, making real friends, and spontaneous late-night text chats with zero photo swiping.",
    keywords: ["dating app usa", "anonymous dating us", "talk to strangers usa", "make friends online us", "free dating app united states"],
    geo: { lat: 37.0902, lng: -95.7129 },
  },
  {
    slug: "new-york",
    name: "New York",
    type: "city",
    country: "United States",
    countryCode: "US",
    region: "NY",
    headline: "Anonymous Dating & Stranger Chat in New York City",
    description: "Meet someone new in NYC without the superficial hustle. Pure text-only anonymous dating, authentic friendship, and instant stranger chat with verified adults.",
    keywords: ["dating app nyc", "anonymous dating new york", "talk to strangers nyc", "make friends in nyc", "nyc stranger chat"],
    geo: { lat: 40.7128, lng: -74.006 },
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    type: "city",
    country: "United States",
    countryCode: "US",
    region: "CA",
    headline: "Anonymous Dating & Friend Finder in Los Angeles",
    description: "Escape superficial social media culture in LA. Connect with adults based on authentic intent, shared vibes, and meaningful late-night conversations.",
    keywords: ["dating app los angeles", "anonymous dating la", "talk to strangers la", "make friends in los angeles"],
    geo: { lat: 34.0522, lng: -118.2437 },
  },
  {
    slug: "chicago",
    name: "Chicago",
    type: "city",
    country: "United States",
    countryCode: "US",
    region: "IL",
    headline: "Anonymous Dating & Stranger Chat in Chicago",
    description: "Connect with genuine people across the Windy City. Safe, ephemeral 1:1 text chat for dating, casual romance, and making new friends.",
    keywords: ["dating app chicago", "talk to strangers chicago", "chicago friends anonymous"],
    geo: { lat: 41.8781, lng: -87.6298 },
  },
  {
    slug: "austin",
    name: "Austin",
    type: "city",
    country: "United States",
    countryCode: "US",
    region: "TX",
    headline: "Anonymous Dating & Community Chat in Austin",
    description: "Keep Austin weird and genuine. Connect anonymously with local techies, music lovers, and open-minded adults for dating and real friendships.",
    keywords: ["dating app austin", "austin stranger chat", "make friends austin"],
    geo: { lat: 30.2672, lng: -97.7431 },
  },

  // United Kingdom
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    type: "country",
    country: "United Kingdom",
    countryCode: "GB",
    headline: "Anonymous Dating & Stranger Chat in the United Kingdom",
    description: "Meet people across the UK for anonymous dating, sincere friendship, and late-night talks. Strict 18+ age verification, text-only privacy, 100% free.",
    keywords: ["dating app uk", "anonymous dating united kingdom", "talk to strangers uk", "make friends online uk"],
    geo: { lat: 55.3781, lng: -3.436 },
  },
  {
    slug: "london",
    name: "London",
    type: "city",
    country: "United Kingdom",
    countryCode: "GB",
    region: "ENG",
    headline: "Anonymous Dating & Stranger Chat in London",
    description: "Cut through the lonely crowd in London. Chat with strangers, find dates based on personality, and build real friendships without sharing your identity.",
    keywords: ["dating app london", "anonymous dating london", "talk to strangers london", "meet people london"],
    geo: { lat: 51.5074, lng: -0.1278 },
  },

  // India
  {
    slug: "india",
    name: "India",
    type: "country",
    country: "India",
    countryCode: "IN",
    headline: "Anonymous Dating & Friendship Chat App in India",
    description: "Chat with verified adults 18+ across India for dating, romance, deep conversations, and friendship without revealing your name, photos, or social profile.",
    keywords: ["dating app india", "anonymous dating india", "free dating app in india", "talk to strangers india", "make friends online india", "safe chat app india"],
    geo: { lat: 20.5937, lng: 78.9629 },
  },
  {
    slug: "delhi",
    name: "Delhi NCR",
    type: "city",
    country: "India",
    countryCode: "IN",
    region: "DL",
    headline: "Anonymous Dating & Stranger Chat in Delhi NCR",
    description: "Connect with genuine adults across Delhi, Noida, and Gurugram for dating, romance, late-night chats, and honest friendship without societal judgment.",
    keywords: ["dating app delhi", "anonymous dating delhi ncr", "talk to strangers delhi", "make friends in delhi"],
    geo: { lat: 28.6139, lng: 77.209 },
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    type: "city",
    country: "India",
    countryCode: "IN",
    region: "MH",
    headline: "Anonymous Dating & Friendship Chat in Mumbai",
    description: "For the city that never sleeps: late-night anonymous talks, dating, and real friendships with open-minded adults across Mumbai.",
    keywords: ["dating app mumbai", "anonymous dating mumbai", "talk to strangers mumbai", "meet people in mumbai"],
    geo: { lat: 19.076, lng: 72.8777 },
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    type: "city",
    country: "India",
    countryCode: "IN",
    region: "KA",
    headline: "Anonymous Dating & Tech Chat in Bengaluru",
    description: "Connect with engineers, creators, and adults across Bangalore for anonymous dating, gaming squads, and genuine friendship without LinkedIn or Instagram baggage.",
    keywords: ["dating app bangalore", "anonymous dating bengaluru", "talk to strangers bangalore", "make friends in bangalore"],
    geo: { lat: 12.9716, lng: 77.5946 },
  },

  // Canada
  {
    slug: "canada",
    name: "Canada",
    type: "country",
    country: "Canada",
    countryCode: "CA",
    headline: "Anonymous Dating & Stranger Chat in Canada",
    description: "Connect with adults across Canada from coast to coast. Ephemeral text chat for dating, casual romance, and friendly conversation.",
    keywords: ["dating app canada", "anonymous dating canada", "talk to strangers canada", "make friends canada"],
    geo: { lat: 56.1304, lng: -106.3468 },
  },
  {
    slug: "toronto",
    name: "Toronto",
    type: "city",
    country: "Canada",
    countryCode: "CA",
    region: "ON",
    headline: "Anonymous Dating & Stranger Chat in Toronto",
    description: "Meet friendly adults across the GTA for anonymous dating, open-minded conversations, and casual chat without picture pressure.",
    keywords: ["dating app toronto", "anonymous dating toronto", "talk to strangers toronto"],
    geo: { lat: 43.6532, lng: -79.3832 },
  },

  // Australia
  {
    slug: "australia",
    name: "Australia",
    type: "country",
    country: "Australia",
    countryCode: "AU",
    headline: "Anonymous Dating & Stranger Chat in Australia",
    description: "G'day to genuine connections. Chat with adults across Australia for dating, making friends, and late-night banter with 100% privacy.",
    keywords: ["dating app australia", "anonymous dating australia", "talk to strangers australia", "make friends online australia"],
    geo: { lat: -25.2744, lng: 133.7751 },
  },
  {
    slug: "sydney",
    name: "Sydney",
    type: "city",
    country: "Australia",
    countryCode: "AU",
    region: "NSW",
    headline: "Anonymous Dating & Stranger Chat in Sydney",
    description: "Connect with genuine adults in Sydney for dating, spontaneous text chats, and real friendship without social media filters.",
    keywords: ["dating app sydney", "anonymous dating sydney", "talk to strangers sydney"],
    geo: { lat: -33.8688, lng: 151.2093 },
  },

  // Global Hubs
  {
    slug: "philippines",
    name: "Philippines",
    type: "country",
    country: "Philippines",
    countryCode: "PH",
    headline: "Anonymous Dating & Stranger Chat in the Philippines",
    description: "Warm, respectful anonymous chat for adults across the Philippines. Find dating partners, friends, and late-night conversation companions.",
    keywords: ["dating app philippines", "anonymous dating philippines", "talk to strangers philippines"],
    geo: { lat: 12.8797, lng: 121.774 },
  },
  {
    slug: "germany",
    name: "Germany",
    type: "country",
    country: "Germany",
    countryCode: "DE",
    headline: "Anonymous Dating & Safe Chat in Germany",
    description: "Privacy-first anonymous chat and dating for adults across Germany. Strict data protection, text-only conversations, zero ads.",
    keywords: ["dating app germany", "anonymous dating germany", "stranger chat germany"],
    geo: { lat: 51.1657, lng: 10.4515 },
  },
];

export const locationBySlug = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
