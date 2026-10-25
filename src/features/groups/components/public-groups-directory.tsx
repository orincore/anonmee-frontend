"use client";

import { ArrowRight, ChatCircleDots, Plus, Sparkle, UsersThree } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/shared";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import type { PublicGroup } from "@/lib/public-groups";
import { TOPICS } from "@/lib/topics";
import { SITE } from "@/lib/site";

export interface PublicGroupsDirectoryProps {
  initialGroups: PublicGroup[];
}

/**
 * Public Directory for Groups:
 * Renders crawlable semantic HTML and JSON-LD structured data for Google / search engines.
 * NO user chat history or private member data is ever rendered.
 */
export function PublicGroupsDirectory({ initialGroups }: PublicGroupsDirectoryProps) {
  const [topic, setTopic] = useState<string>();

  const filtered = topic ? initialGroups.filter((g) => g.topic === topic) : initialGroups;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Anonymous Groups & Community Chatrooms | Anonmee",
      description:
        "Browse and join anonymous group chats on Anonmee. Discuss dating, romance, friendship, hobbies, and confessions with 100% privacy and zero photo bias.",
      url: `${SITE.url}/groups`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: initialGroups.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}/groups/${g.id}`,
          name: g.title,
          description: g.description,
        })),
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/anonme-logo.png`,
      },
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-20">
          {schemas.map((s, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
            />
          ))}

          <Breadcrumbs items={[{ name: "Groups", href: "/groups" }]} />

          {/* Hero Section */}
          <section className="mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-accent-text">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Anonymous • Zero Photo Bias • 18+ Only
            </div>
            <h1 className="display text-3xl font-extrabold md:text-5xl">
              Anonymous Community Groups.
            </h1>
            <p className="max-w-2xl text-lg text-muted">
              Connect with adults who share your passions, hobbies, and relationship intents. Every group gives you a fresh random alias with zero personal identity exposed.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg">
                <Link href="/signup?redirect=/groups">
                  <Plus aria-hidden weight="bold" className="size-5" />
                  Create an Anonymous Group
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/global-chat">
                  <ChatCircleDots aria-hidden weight="bold" className="size-5" />
                  Visit Global Chat
                </Link>
              </Button>
            </div>
          </section>

          {/* Global Room Spotlight Card */}
          <section className="mb-12">
            <Link
              href="/groups/global"
              className="group relative block overflow-hidden rounded-card border-2 border-edge bg-gradient-to-br from-brand/20 via-surface to-accent/15 p-6 shadow-sticker transition-transform active:scale-[0.99] md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-brand px-3 py-0.5 text-xs font-bold text-brand-fg">
                  <Sparkle aria-hidden weight="fill" className="size-3.5" />
                  Official Live Room
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wide text-muted">
                  Open to everyone 24/7
                </span>
              </div>
              <h2 className="display mt-3 text-2xl font-bold md:text-4xl">
                Global Chat (Everyone)
              </h2>
              <p className="mt-2 max-w-xl text-base text-muted md:text-lg">
                The massive 24/7 chatroom where singles and adults across the globe chat freely with total anonymity. No wait times.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 font-bold text-accent-text group-hover:underline">
                Enter Global Chatroom
                <ArrowRight aria-hidden weight="bold" className="size-4" />
              </div>
            </Link>
          </section>

          {/* Topic Filters */}
          <section className="mb-8 space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-muted">
              Filter by Topic
            </h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter groups by topic">
              <Chip selected={!topic} onClick={() => setTopic(undefined)}>
                All Groups
              </Chip>
              {TOPICS.map((t) => (
                <Chip key={t.slug} selected={topic === t.slug} onClick={() => setTopic(t.slug)}>
                  #{t.label}
                </Chip>
              ))}
            </div>
          </section>

          {/* Groups Grid */}
          <section className="mb-16">
            {filtered.length === 0 ? (
              <div className="rounded-card border-2 border-dashed border-line p-12 text-center">
                <UsersThree aria-hidden weight="light" className="mx-auto size-12 text-muted" />
                <h3 className="mt-3 text-lg font-bold">No groups found in #{topic}</h3>
                <p className="mt-1 text-sm text-muted">Be the first to create an anonymous group on this topic.</p>
                <Button asChild size="sm" className="mt-4">
                  <Link href="/signup?redirect=/groups">Start a Group</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((g) => (
                  <Link
                    key={g.id}
                    href={`/groups/${g.id}`}
                    className="group relative block rounded-card border-2 border-edge bg-surface p-6 shadow-sticker transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--edge)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block -rotate-1 rounded-full border-2 border-edge bg-accent px-3 py-0.5 text-xs font-bold text-accent-fg">
                        #{g.topic}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {g.memberCount} {g.memberCount === 1 ? "member" : "members"}
                      </span>
                    </div>
                    <h3 className="display mt-3 text-2xl font-bold transition-colors group-hover:text-accent-text">
                      {g.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">
                      {g.description || `Join ${g.title} to discuss #${g.topic} anonymously with other adults on Anonmee.`}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-2 border-t border-line text-xs font-semibold text-muted">
                      <span>100% Anonymous</span>
                      <span className="text-accent-text group-hover:underline">Join Group →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Call to Action Banner */}
          <section className="rounded-card border-2 border-edge bg-surface p-8 text-center shadow-sticker">
            <h2 className="display text-2xl font-bold md:text-3xl">
              Can't find the group you are looking for?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-muted">
              Create your own anonymous community group in seconds. Choose any topic, set guidelines, and invite others to chat with zero judgment.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/signup?redirect=/groups">
                  Create Your Group (Free)
                  <ArrowRight aria-hidden weight="bold" className="size-5" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
