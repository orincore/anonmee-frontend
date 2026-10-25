import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section aria-label="Get started" className="overflow-x-clip bg-brand text-brand-fg">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <h2 className="display max-w-4xl text-hero">Someone new is waiting.</h2>
        <p className="mt-6 max-w-[50ch] text-lg md:text-xl">
          Join thousands of adults dating, making friends, and chatting anonymously. Free forever, zero photo pressure, and setup takes under a minute.
        </p>
        <Button asChild size="lg" className="mt-8 w-full border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] sm:w-auto">
          <Link href="/signup">
            Start chatting
            <ArrowRight aria-hidden weight="bold" className="size-5" />
          </Link>
        </Button>
        <span aria-hidden className="display absolute bottom-10 right-4 hidden -rotate-6 rounded-full border-2 border-ink bg-pop px-5 py-2 text-2xl text-pop-fg shadow-[4px_4px_0_0_var(--ink)] md:block">
          18+ only
        </span>
      </div>
    </section>
  );
}
