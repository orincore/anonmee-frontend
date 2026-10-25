import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingStickers } from "./floating-stickers";
import { HeroOnline } from "./hero-online";
import { PhoneFrame } from "./phone-frame";
import { Transcript } from "./transcript";

/** Cobalt poster. A huge headline, one sentence, one button, and the real product in a tilted phone. */
export function Hero() {
  return (
    <section className="overflow-x-clip bg-brand text-brand-fg">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pb-16 pt-8 md:grid-cols-[1.3fr_0.7fr] md:gap-8 md:px-6 md:pb-20 md:pt-10">
        <div className="space-y-6">
          <HeroOnline />
          <h1 className="display text-hero">
            Talk to strangers.
            <br />
            Stay{" "}
            <span className="inline-block -rotate-1 rounded-2xl border-2 border-ink bg-accent px-3 pb-1 text-accent-fg shadow-[4px_4px_0_0_var(--ink)]">anonymous.</span>
          </h1>
          <p className="max-w-md text-lg md:text-xl">
            The free anonymous app for dating, genuine friendship, and talking to strangers. Get matched with adults who want the exact same kind of conversation. Only your gender and age are ever shown.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-bold text-accent-fg">
            <span className="rounded-full border border-ink bg-accent px-3 py-1 shadow-sticker-sm">Dating & Flirting</span>
            <span className="rounded-full border border-ink bg-pop px-3 py-1 text-pop-fg shadow-sticker-sm">Make Real Friends</span>
            <span className="rounded-full border border-ink bg-surface px-3 py-1 text-fg shadow-sticker-sm">Stranger Chat</span>
            <span className="rounded-full border border-ink bg-accent px-3 py-1 shadow-sticker-sm">No Photo Pressure</span>
          </div>
          <Button asChild size="lg" className="w-full border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] sm:w-auto">
            <Link href="/signup">
              Start chatting
              <ArrowRight aria-hidden weight="bold" className="size-5" />
            </Link>
          </Button>
        </div>
        <FloatingStickers>
          <PhoneFrame className="rotate-3">
            <Transcript />
          </PhoneFrame>
        </FloatingStickers>
      </div>
    </section>
  );
}
