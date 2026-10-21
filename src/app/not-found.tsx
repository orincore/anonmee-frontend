import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-xl flex-col justify-center gap-6 px-4">
      <p className="display text-hero text-accent-text">404</p>
      <h1 className="display text-display">That page left the chat.</h1>
      <p className="text-lg text-muted">It may have moved, or it never existed.</p>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href="/">Back to Anonmee</Link>
      </Button>
    </main>
  );
}
