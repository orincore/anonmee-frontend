import type { Icon } from "@phosphor-icons/react";
import { Cricket, GameController, Headphones, Lightbulb, MoonStars, SoccerBall } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SectionHeading } from "@/components/shared";
import { cn } from "@/lib/cn";

const TOPICS: { slug: string; label: string; icon: Icon; tone: string; tilt: string }[] = [
  { slug: "football", label: "Football", icon: SoccerBall, tone: "bg-accent text-accent-fg", tilt: "-3deg" },
  { slug: "late-night-talks", label: "Late night talks", icon: MoonStars, tone: "bg-brand text-brand-fg", tilt: "2deg" },
  { slug: "cricket", label: "Cricket", icon: Cricket, tone: "bg-surface text-fg", tilt: "-1deg" },
  { slug: "advice", label: "Advice", icon: Lightbulb, tone: "bg-pop text-pop-fg", tilt: "3deg" },
  { slug: "music", label: "Music", icon: Headphones, tone: "bg-accent text-accent-fg", tilt: "-2deg" },
  { slug: "games", label: "Games", icon: GameController, tone: "bg-surface text-fg", tilt: "1.5deg" },
];

/** A sheet of stickers, each a link to a public topic page. They tilt a little and wiggle when you touch them. */
export function TopicStickers() {
  return (
    <section aria-label="Group topics" className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6 md:pb-28">
      <SectionHeading title="Find your people." body="Join a group about what you love, or start your own. The ones that match your interests show up first." className="mb-12" />
      <ul className="flex flex-wrap gap-4 md:gap-5">
        {TOPICS.map(({ slug, label, icon: IconComponent, tone, tilt }) => (
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
