import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { TOPICS, topicBySlug } from "@/lib/topics";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const topic = topicBySlug((await params).topic);
  if (!topic) return {};
  const title = `${topic.label} — Anonymous Chat & Community for Adults (18+)`;
  const description = `${topic.blurb} Connect anonymously on Anonmee with adults 18+ who share your passions. Pure text chat, zero photo bias, completely free.`;
  const url = `${SITE.url}/topics/${topic.slug}`;

  return {
    title,
    description,
    keywords: [...topic.keywords, "anonymous chat", "adults 18+", "talk to strangers", "dating app", "friendship app"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const topic = topicBySlug((await params).topic);
  if (!topic) notFound();

  const otherTopics = TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 6);

  const topicFaqs = [
    {
      q: `How does anonymous ${topic.label.toLowerCase()} matching work?`,
      a: `When you choose ${topic.label.toLowerCase()}, Anonmee matches you with another adult (18+) who wants to talk about the same thing. Only your age and gender are ever shown to the other person.`,
    },
    {
      q: `Do I need to upload photos to discuss ${topic.label.toLowerCase()}?`,
      a: `No. Anonmee is 100% text-only with zero profile photos or avatars. You get a random alias in each conversation so you can speak freely without appearance or social bias.`,
    },
    {
      q: "Can I skip or leave the conversation anytime?",
      a: "Yes. Every chat has an instant Skip button to seamlessly connect with another person, as well as immediate report and block controls.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Topics", item: `${SITE.url}/#topics` },
        { "@type": "ListItem", position: 3, name: topic.label, item: `${SITE.url}/topics/${topic.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${topic.label} Anonymous Chat Groups & 1:1 Matching`,
      url: `${SITE.url}/topics/${topic.slug}`,
      description: topic.blurb,
      about: {
        "@type": "Thing",
        name: topic.label,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: topicFaqs.map((f) => ({
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
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-fg">Home</Link>
        <span>/</span>
        <span className="text-fg">{topic.label}</span>
      </nav>

      <section className="mb-14 space-y-6">
        <SectionHeading as="h1" title={`${topic.label}.`} body={topic.blurb} className="mb-4" />
        <p className="max-w-2xl text-lg text-muted">
          Whether you are looking for 1:1 stranger chats, dating and romance, or an open group room with zero judgment, Anonmee gives you a fresh random alias in every chat. Only your gender and age are ever shown.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/signup">
              Start chatting now
              <ArrowRight aria-hidden weight="bold" className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/login">Log in to your account</Link>
          </Button>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="mb-16 grid gap-5 sm:grid-cols-3">
        <div className="rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
          <h2 className="display text-2xl">Pure Personality</h2>
          <p className="mt-2 text-sm text-muted">No selfies, no followers, no social status. Connect with people who care about what you say, not what you look like.</p>
        </div>
        <div className="rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
          <h2 className="display text-2xl">Adults 18+ Only</h2>
          <p className="mt-2 text-sm text-muted">Strict age-gating ensures mature, respectful conversations with people verified to be 18 and older.</p>
        </div>
        <div className="rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
          <h2 className="display text-2xl">Ephemeral Privacy</h2>
          <p className="mt-2 text-sm text-muted">One-to-one chats are permanently wiped from server memory the moment you leave. What is said in chat stays in chat.</p>
        </div>
      </section>

      {/* Topic FAQ */}
      <section className="mb-16 space-y-6">
        <h2 className="display text-3xl">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {topicFaqs.map((faq, i) => (
            <div key={i} className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
              <h3 className="font-bold text-lg">{faq.q}</h3>
              <p className="mt-2 text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore other topics */}
      <section className="space-y-4 border-t-2 border-line pt-10">
        <h2 className="display text-2xl">Explore More Topics & Communities</h2>
        <div className="flex flex-wrap gap-2.5">
          {otherTopics.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border-2 border-edge bg-surface px-4 py-1 text-sm font-bold shadow-sticker-sm hover:bg-line transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      <script
        id="topic-json-ld"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
