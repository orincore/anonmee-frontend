"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-xl flex-col justify-center gap-6 px-4">
      <h1 className="display text-display">Something broke.</h1>
      <p className="text-lg text-muted">It was not you. Try again, and if it keeps happening, come back in a minute.</p>
      <Button size="lg" onClick={reset} className="w-full sm:w-auto">Try again</Button>
    </main>
  );
}
