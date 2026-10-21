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
  return {
    title: `${topic.label} chat groups`,
    description: `${topic.blurb} Join anonymous ${topic.label.toLowerCase()} groups on Anonmee. Adults 18 and over.`,
    alternates: { canonical: `${SITE.url}/topics/${topic.slug}` },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const topic = topicBySlug((await params).topic);
  if (!topic) notFound();
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anonmee", item: SITE.url },
    { "@type": "ListItem", position: 2, name: topic.label, item: `${SITE.url}/topics/${topic.slug}` },
  ] };
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading as="h1" title={`${topic.label} groups.`} body={topic.blurb} className="mb-10" />
      <p className="mb-8 max-w-[56ch] text-lg text-muted">Groups are open to everyone and have no member limit. You get a random name in each one, and only your gender and age are shown. Sign up to see which {topic.label.toLowerCase()} groups are live right now.</p>
      <Button asChild size="lg">
        <Link href="/signup">
          Start chatting
          <ArrowRight aria-hidden weight="bold" className="size-5" />
        </Link>
      </Button>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />
    </section>
  );
}
