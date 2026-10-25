import { CheckCircle, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { GENDER_LABEL } from "@/components/shared";
import type { Me } from "@/providers/auth-provider";

/** What the app holds about you, and what other people actually see. */
export function ProfileCard({ me }: { me: Me }) {
  return (
    <section className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[13px] uppercase tracking-wide text-muted">Your username, private</p>
          <p className="display mt-1 text-4xl">{me.username}</p>
        </div>
        {me.emailVerified ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-text">
            <CheckCircle aria-hidden weight="fill" className="size-3.5" />
            Verified
          </span>
        ) : null}
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t-2 border-line pt-5">
        <div>
          <dt className="text-sm text-muted">Gender</dt>
          <dd className="text-lg font-bold">{GENDER_LABEL[me.gender]}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Age</dt>
          <dd className="text-lg font-bold">{me.age}</dd>
        </div>
      </dl>
      <p className="mt-5 flex items-start gap-2 text-[15px] text-muted">
        <EyeSlash aria-hidden weight="bold" className="mt-0.5 size-5 shrink-0" />
        Others see only a random name, your gender and your age.
      </p>
    </section>
  );
}
