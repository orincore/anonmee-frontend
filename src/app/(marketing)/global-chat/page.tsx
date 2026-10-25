import { ArrowRight, ChatCircleDots, ShieldCheck, Sparkle, UserSwitch, UsersThree } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, SectionHeading } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { TOPICS } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Global Chat — Live Anonymous Global Chatroom (18+) | Anonmee Dating App",
  description:
    "Join Anonmee's 24/7 Global Chat. Connect with singles, adults, and strangers worldwide in real-time with 100% anonymity. Zero photos, no real names, pure conversation.",
  keywords: [
    "anonmee global chat",
    "anonymous global chat",
    "global stranger chat",
    "talk to strangers online",
    "anonymous chat room",
    "live stranger group chat",
    "free anonymous chatroom 18+",
    "anonymous dating chat",
    "stranger chat without login",
  ],
  alternates: { canonical: `${SITE.url}/global-chat` },
  openGraph: {
    title: "Global Chat — Live Anonymous Global Chatroom (18+) | Anonmee",
    description:
      "Join Anonmee's 24/7 Global Chat. Connect with singles, adults, and strangers worldwide in real-time with 100% anonymity. Zero photos, no real names, pure conversation.",
    url: `${SITE.url}/global-chat`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE.url}/anonme-logo.png`,
        width: 1200,
        height: 630,
        alt: "Anonmee Global Chatroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Chat — Live Anonymous Global Chatroom (18+) | Anonmee",
    description:
      "Connect with singles and strangers worldwide in real-time with 100% anonymity. Zero photos, no real names, zero chat logs indexed.",
    images: [`${SITE.url}/anonme-logo.png`],
  },
};

const GLOBAL_FAQS = [
  {
    q: "What is Anonmee Global Chat?",
    a: "Anonmee Global Chat is a real-time, 24/7 anonymous public chatroom open to adults (18+) worldwide. You can chat freely about dating, friendships, life confessions, and random thoughts without showing your face or revealing personal identity.",
  },
  {
    q: "Is Anonmee Global Chat 100% free?",
    a: "Yes. Anonmee Global Chat is completely free with no subscriptions, paywalls, or hidden coins. You can join and chat immediately.",
  },
  {
    q: "Are my chat messages public or indexed on search engines?",
    a: "Never. Anonmee enforces a strict privacy-first architecture. All chat messages are ephemeral, transmitted over secure real-time connections, and never stored permanently or indexed by search engines. Only the public room invitation and community guidelines are discoverable.",
  },
  {
    q: "Do I need to upload photos to participate in Global Chat?",
    a: "No. Anonmee is strictly anti-superficial with zero profile photos or avatars. In Global Chat, you are assigned a random playful alias that protects your identity while keeping conversations fun and unbiased.",
  },
  {
    q: "How do I report or block disruptive users in Global Chat?",
    a: "Every message in Global Chat has one-tap moderation controls. You can instantly report inappropriate content or block any user so you never see their messages again.",
  },
];

export default function GlobalChatPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      headline: "Anonmee Global Chat — Live Anonymous Public Chatroom",
      description:
        "Open to all of Anonmee — live anonymous public chat across the globe with zero photos or profile tracking. Messages are ephemeral and never indexed.",
      url: `${SITE.url}/global-chat`,
      datePublished: "2026-10-01T00:00:00Z",
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/JoinAction",
        name: "Active Participants",
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/anonme-logo.png`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: GLOBAL_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6 md:py-24">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <Breadcrumbs items={[{ name: "Global Chat", href: "/global-chat" }]} />

      <section className="mb-14 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-accent-text">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          Live 24/7 Room • Ephemeral &amp; Zero Logs • 18+ Only
        </div>

        <SectionHeading
          as="h1"
          title="Global Chat."
          body="The open floor for everyone on Anonmee. Talk to adults, singles, and strangers across the globe in real-time with 100% anonymity."
          className="mb-4"
        />

        <p className="max-w-2xl text-lg text-muted">
          No photo bias, no real names, and zero social pressure. Step into an open room of live conversations, share your late-night thoughts, find dating matches, or just vibe with people worldwide.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/groups/global">
              Enter Global Chat
              <ArrowRight aria-hidden weight="bold" className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/groups">Browse Community Groups</Link>
          </Button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mb-16">
        <h2 className="display mb-8 text-2xl font-bold md:text-3xl">Why Millions Chat in Anonmee Global</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl border-2 border-edge bg-brand text-brand-fg">
              <UserSwitch aria-hidden weight="bold" className="size-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold">Total Anonymity &amp; Fresh Aliases</h3>
            <p className="text-sm text-muted">
              You are assigned a fresh random alias in every chat. Nobody ever sees your email, phone number, or profile photo.
            </p>
          </article>

          <article className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl border-2 border-edge bg-accent text-accent-fg">
              <ShieldCheck aria-hidden weight="bold" className="size-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold">Zero Logs &amp; Strict Privacy</h3>
            <p className="text-sm text-muted">
              Your conversations are ephemeral and private. Search engines never index message history, and data is never sold to third parties.
            </p>
          </article>

          <article className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl border-2 border-edge bg-pop text-pop-fg">
              <ChatCircleDots aria-hidden weight="bold" className="size-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold">Real-time Reactions &amp; Replies</h3>
            <p className="text-sm text-muted">
              Live typing indicators, interactive emoji reactions, quoted replies, and instant WebSocket message delivery without delays.
            </p>
          </article>

          <article className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
            <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl border-2 border-edge bg-surface text-fg">
              <UsersThree aria-hidden weight="bold" className="size-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold">Global Adults (18+) Community</h3>
            <p className="text-sm text-muted">
              Strictly verified 18+ community with proactive spam defenses and device fingerprinting to ensure quality human connections.
            </p>
          </article>
        </div>
      </section>

      {/* Guidelines and Privacy Notice */}
      <section className="mb-16 rounded-card border-2 border-edge bg-surface p-8 shadow-sticker">
        <div className="flex items-center gap-3">
          <Sparkle aria-hidden weight="fill" className="size-7 text-accent" />
          <h2 className="display text-xl font-bold md:text-2xl">Room Guidelines &amp; Privacy Pledge</h2>
        </div>
        <ul className="mt-4 space-y-2 text-muted">
          <li>• <strong className="text-fg">18+ Only:</strong> All members must be consenting adults. Zero tolerance for underage accounts.</li>
          <li>• <strong className="text-fg">No Doxxing:</strong> Never share other people's private information, phone numbers, or social handles.</li>
          <li>• <strong className="text-fg">Zero Message Indexing:</strong> What you say in Global Chat stays in the room. Search engines only index this public gateway.</li>
          <li>• <strong className="text-fg">Respect &amp; Civility:</strong> No hate speech, harassment, or commercial spam. Moderation tools are live 24/7.</li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="display mb-8 text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {GLOBAL_FAQS.map((faq, i) => (
            <article key={i} className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
              <h3 className="text-lg font-bold">{faq.q}</h3>
              <p className="mt-2 text-muted">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Other Topics */}
      <section className="space-y-4">
        <h2 className="display text-2xl font-bold">Explore More Topics &amp; Community Groups</h2>
        <div className="flex flex-wrap gap-2">
          {TOPICS.slice(0, 10).map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="rounded-full border border-edge bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:bg-line"
            >
              #{t.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
