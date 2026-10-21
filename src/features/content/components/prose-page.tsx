import { SectionHeading } from "@/components/shared";

export interface ProseSection {
  heading: string;
  paragraphs: string[];
  /** An optional list shown after the paragraphs. */
  bullets?: string[];
}

export interface ProsePageProps {
  title: string;
  intro: string;
  /** Shown under the title, for legal pages. */
  updated?: string;
  sections: ProseSection[];
  children?: React.ReactNode;
}

/** A readable long-form page: big title, then headed sections at a comfortable line length. */
export function ProsePage({ title, intro, updated, sections, children }: ProsePageProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading as="h1" title={title} body={intro} className="mb-12" />
      {updated ? <p className="-mt-6 mb-10 font-mono text-sm text-muted">Last updated {updated}</p> : null}
      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.heading} className="space-y-3 border-t-2 border-edge pt-6">
            <h2 className="display text-3xl">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="max-w-[62ch] text-lg text-muted">
                {p}
              </p>
            ))}
            {s.bullets ? (
              <ul className="max-w-[62ch] list-disc space-y-1.5 pl-6 text-lg text-muted marker:text-fg">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
      {children}
    </article>
  );
}
