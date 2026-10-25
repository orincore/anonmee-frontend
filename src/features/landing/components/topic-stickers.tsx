import type { Icon } from "@phosphor-icons/react";
import {
  ChatsCircle,
  GameController,
  Headphones,
  Heart,
  Lightbulb,
  MoonStars,
  UsersThree,
  Waveform,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SectionHeading } from "@/components/shared";
import { cn } from "@/lib/cn";

const HIGHLIGHT_TOPICS: { slug: string; label: string; icon: Icon; tone: string; tilt: string }[] = [
  { slug: "dating", label: "Dating", icon: Heart, tone: "bg-pop text-pop-fg", tilt: "-2deg" },
  { slug: "friendship", label: "Friendship", icon: UsersThree, tone: "bg-accent text-accent-fg", tilt: "2.5deg" },
  { slug: "stranger-chat", label: "Talk to Strangers", icon: ChatsCircle, tone: "bg-brand text-brand-fg", tilt: "-1.5deg" },
  { slug: "late-night-talks", label: "Late Night Talks", icon: MoonStars, tone: "bg-surface text-fg", tilt: "3deg" },
  { slug: "deep-talks", label: "Deep Conversations", icon: Lightbulb, tone: "bg-accent text-accent-fg", tilt: "-2.5deg" },
  { slug: "venting", label: "Vent & Listen", icon: Waveform, tone: "bg-pop text-pop-fg", tilt: "1.5deg" },
  { slug: "music", label: "Music", icon: Headphones, tone: "bg-surface text-fg", tilt: "-3deg" },
  { slug: "games", label: "Games", icon: GameController, tone: "bg-brand text-brand-fg", tilt: "2deg" },
];

/** A sheet of stickers, each a link to a public topic page. They tilt a little and wiggle when you touch them. */
export function TopicStickers() {
  return (
    <section aria-label="Group topics and conversation categories" className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6 md:pb-28">
      <SectionHeading
        title="Find your people. Pick your vibe."
        body="Whether you are looking for romance, a genuine new friend, someone to vent to, or an open group discussing your passions — choose where you belong."
        className="mb-12"
      />
      <ul className="flex flex-wrap gap-4 md:gap-5">
        {HIGHLIGHT_TOPICS.map(({ slug, label, icon: IconComponent, tone, tilt }) => (
          <li key={slug}>
            <Link
              href={`/topics/${slug}`}
              style={{ "--tilt": tilt } as React.CSSProperties}
              className={cn("sticker inline-flex min-h-16 items-center gap-3 rounded-full border-2 border-edge px-6 py-3 shadow-sticker hover:shadow-[6px_6px_0_0_var(--edge)] motion-reduce:hover:animate-none", tone)}
            >
              <IconComponent aria-hidden weight="bold" className="size-7 md:size-9" />
              <span className="display text-3xl md:text-5xl">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
