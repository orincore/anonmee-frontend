import type { PeerView } from "@/contracts";
import { AliasAvatar } from "./alias-avatar";
import { cn } from "@/lib/cn";

export const GENDER_LABEL: Record<PeerView["gender"], string> = {
  male: "Male",
  female: "Female",
  trans_man: "Trans man",
  trans_woman: "Trans woman",
  non_binary: "Non-binary",
  prefer_not_to_say: "Prefers not to say",
};

/** The only thing anyone ever sees about another person: a random alias, their gender and their age. */
export function PeerBadge({ peer, bare = false, className }: { peer: PeerView; /** Hide the initial block. */ bare?: boolean; className?: string }) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      {bare ? null : <AliasAvatar alias={peer.alias} />}
      <div className="min-w-0">
        <p className="truncate font-semibold leading-tight">{peer.alias}</p>
        <p className="truncate font-mono text-[13px] uppercase tracking-wide text-muted">
          {GENDER_LABEL[peer.gender]} / {peer.age}
        </p>
      </div>
    </div>
  );
}
