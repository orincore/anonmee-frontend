import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SectionHeading } from "@/components/shared";
import { FAQ_ITEMS } from "@/lib/faq-items";

const SHOWN = FAQ_ITEMS.slice(0, 6);

/** First four questions as native disclosures: no JavaScript, keyboard and screen reader friendly. */
export function FaqList() {
  return (
    <section aria-label="Common questions" className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <SectionHeading title="Questions people ask." />
        <div className="space-y-6">
          <div className="divide-y-2 divide-line overflow-hidden rounded-card border-2 border-edge bg-surface shadow-sticker">
            {SHOWN.map((f) => (
              <details key={f.q} className="group px-5 md:px-7">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-xl font-bold marker:hidden [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-edge bg-accent text-accent-fg transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">
                    <Plus aria-hidden weight="bold" className="size-5" />
                  </span>
                </summary>
                <p className="max-w-[56ch] pb-6 text-base text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <Link href="/faq" className="inline-flex min-h-11 items-center font-bold underline decoration-2 underline-offset-4 hover:text-accent-text">
            Read all questions
          </Link>
        </div>
      </div>
    </section>
  );
}
