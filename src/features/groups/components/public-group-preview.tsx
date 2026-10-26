import { ArrowRight, ChatCircleDots, LockKey, ShareNetwork, ShieldCheck, Sparkle, UserSwitch, UsersThree } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Breadcrumbs, ShareButton } from "@/components/shared";
import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import type { PublicGroup } from "@/lib/public-groups";
import { TOPICS } from "@/lib/topics";
import { SITE } from "@/lib/site";

export interface PublicGroupPreviewProps {
  group: PublicGroup;
}

/**
 * Public SEO-optimized preview of a user-created group.
 * Displays group topic, description, guidelines, and a call-to-action to join anonymously.
 *
 * PRIVACY CONTRACT:
 * Strictly metadata only. Under NO circumstances are any member chat messages,
 * histories, or personal accounts rendered or exposed.
 */
export function PublicGroupPreview({ group }: PublicGroupPreviewProps) {
  const isGlobal = group.id === "global";
  const joinHref = `/signup?redirect=/groups/${group.id}`;
  const loginHref = `/login?redirect=/groups/${group.id}`;

  const groupFaqs = [
    {
      q: `What is the "${group.title}" group?`,
      a: `${group.title} is an anonymous online group chat on Anonmee focused on ${group.topic}. Members join to discuss shared interests without sharing phone numbers or profile pictures.`,
    },
    {
      q: "Can other members see my real name or phone number?",
      a: "No. When you join this group, you are assigned a random unique alias. Your email, real name, and phone number are never exposed to other members.",
    },
    {
      q: "Are the group's chat messages public on search engines?",
      a: "Never. Chat messages inside this group are private to joined members, encrypted, and ephemeral. Search engines only index this public invitation card.",
    },
    {
      q: "How do I participate in this group?",
      a: "Click 'Join Group Anonymously', set your age and gender (no photos required), and you will immediately be admitted to the live conversation.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      headline: `${group.title} — Anonymous ${group.topic} Group Chat`,
      description: group.description || `Join ${group.title} on Anonmee. An anonymous ${group.topic} group chat with ${group.memberCount} members.`,
      genre: group.topic,
      url: `${SITE.url}/groups/${group.id}`,
      datePublished: new Date(group.createdAt).toISOString(),
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/JoinAction",
        name: "Members Inside",
        userInteractionCount: group.memberCount,
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
      mainEntity: groupFaqs.map((f) => ({
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
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6 md:py-20">
          {schemas.map((s, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
            />
          ))}

          <Breadcrumbs
            items={[
              { name: "Groups", href: "/groups" },
              { name: group.title, href: `/groups/${group.id}` },
            ]}
          />

          {/* Group Header Card */}
          <article className="mb-14 rounded-card border-2 border-edge bg-surface p-6 shadow-sticker md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block -rotate-1 rounded-full border-2 border-edge bg-accent px-3.5 py-1 text-sm font-bold text-accent-fg">
                  #{group.topic}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-muted">
                  <UsersThree aria-hidden weight="bold" className="size-4" />
                  {group.memberCount.toLocaleString()} {group.memberCount === 1 ? "member" : "members"}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs font-bold text-muted">
                <LockKey aria-hidden weight="bold" className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                100% Anonymous
              </span>
            </div>

            <h1 className="display mt-4 text-3xl font-extrabold md:text-5xl">
              {group.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted md:text-xl">
              {group.description || `Welcome to ${group.title}. Join this open anonymous group on Anonmee to chat with others interested in ${group.topic}.`}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={joinHref}>
                  Join {isGlobal ? "Global Chat" : "Group"} Anonymously
                  <ArrowRight aria-hidden weight="bold" className="size-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href={loginHref}>I already have an account</Link>
              </Button>
              <ShareButton
                title={`${group.title} — Anonymous #${group.topic} Group Chat`}
                text={
                  isGlobal
                    ? "Come chat anonymously with me on Anonmee — zero photos, 100% private:"
                    : `Join the anonymous #${group.topic} chat "${group.title}" on Anonmee — zero photos, 100% private:`
                }
                url={`/groups/${group.id}`}
                roomId={group.id}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                ariaLabel="Share this group"
              >
                <ShareNetwork aria-hidden weight="bold" className="size-5" />
                Share & Invite
              </ShareButton>
            </div>
          </article>

          {/* How It Works & Privacy */}
          <section className="mb-16">
            <h2 className="display mb-6 text-2xl font-bold md:text-3xl">How Anonymous Group Chatting Works</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-2xl border-2 border-edge bg-brand text-brand-fg">
                  <UserSwitch aria-hidden weight="bold" className="size-5" />
                </div>
                <h3 className="mb-1 text-base font-bold">1. Random Group Alias</h3>
                <p className="text-sm text-muted">
                  When you join, you receive a fresh alias inside this group. Your real name and account details remain hidden.
                </p>
              </div>

              <div className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-2xl border-2 border-edge bg-pop text-pop-fg">
                  <ChatCircleDots aria-hidden weight="bold" className="size-5" />
                </div>
                <h3 className="mb-1 text-base font-bold">2. Real-time Live Chat</h3>
                <p className="text-sm text-muted">
                  Message, react with emojis, and reply to discussions with other members in real-time over secure WebSockets.
                </p>
              </div>

              <div className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-2xl border-2 border-edge bg-accent text-accent-fg">
                  <ShieldCheck aria-hidden weight="bold" className="size-5" />
                </div>
                <h3 className="mb-1 text-base font-bold">3. Zero Chat Logs Indexed</h3>
                <p className="text-sm text-muted">
                  Conversations stay strictly inside the room. Search engines only index this public card, never anyone's private chat.
                </p>
              </div>
            </div>
          </section>

          {/* Room Guidelines */}
          <section className="mb-16 rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm md:p-8">
            <div className="flex items-center gap-3">
              <Sparkle aria-hidden weight="fill" className="size-6 text-accent" />
              <h2 className="display text-xl font-bold">Community Rules for #{group.topic}</h2>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted md:text-base">
              <li>• <strong className="text-fg">Respect Privacy:</strong> Never reveal anyone's real identity, location, or contact info.</li>
              <li>• <strong className="text-fg">Adults 18+ Only:</strong> All members must be consenting adults.</li>
              <li>• <strong className="text-fg">Safe Moderation:</strong> One-tap report and block controls are active 24/7 on every message.</li>
            </ul>
          </section>

          {/* FAQs */}
          <section className="mb-16">
            <h2 className="display mb-6 text-2xl font-bold">Questions about this Group</h2>
            <div className="space-y-4">
              {groupFaqs.map((faq, i) => (
                <article key={i} className="rounded-card border-2 border-edge bg-surface p-5 shadow-sticker-sm">
                  <h3 className="text-base font-bold md:text-lg">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted md:text-base">{faq.a}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Explore Other Topics */}
          <section className="space-y-4">
            <h2 className="display text-xl font-bold md:text-2xl">Browse More Anonymous Groups &amp; Topics</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/groups"
                className="rounded-full border-2 border-edge bg-brand px-4 py-2 text-sm font-bold text-brand-fg transition-opacity hover:opacity-90"
              >
                All Groups →
              </Link>
              <Link
                href="/global-chat"
                className="rounded-full border-2 border-edge bg-accent px-4 py-2 text-sm font-bold text-accent-fg transition-opacity hover:opacity-90"
              >
                Global Chat (Live 24/7)
              </Link>
              {TOPICS.slice(0, 8).map((t) => (
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
      </main>

      <Footer />
    </div>
  );
}
