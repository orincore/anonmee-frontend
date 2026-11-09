import Link from "next/link";
import { Prohibit } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export interface AdBlockWallProps {
  onReload: () => void;
}

/** Full-screen notice shown instead of the app while an ad blocker is on. Presentational only. */
export function AdBlockWall({ onReload }: AdBlockWallProps) {
  return (
    <div
      data-ad-wall
      role="dialog"
      aria-modal="true"
      aria-labelledby="ad-wall-title"
      className="fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center overflow-y-auto bg-bg p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
    >
      <div className="w-full max-w-md space-y-5 rounded-card border-2 border-edge bg-surface p-6 shadow-sticker">
        <Prohibit aria-hidden weight="bold" className="size-10 text-pop" />
        <h2 id="ad-wall-title" className="display text-4xl">
          Turn off your ad blocker.
        </h2>
        <p className="text-base">
          Anonmee is free because of the ads on it. Your ad blocker is hiding them, so we paused the app until it is off.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-base text-muted">
          <li>Pause or disable your blocker for this site.</li>
          <li>Some browsers block ads on their own (shields, tracking protection). Turn that off for this site too.</li>
          <li>Then reload this page.</li>
        </ul>
        <Button block size="lg" onClick={onReload} autoFocus>
          I turned it off
        </Button>
        <p className="text-sm text-muted">
          Ads never appear in your chats, and the ad network never gets your account or messages.{" "}
          <Link href="/privacy" className="font-semibold underline underline-offset-2">
            What it does see
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
