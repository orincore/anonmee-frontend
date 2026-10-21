import type { PeerView } from "@/contracts";

/** A one-to-one chat as the screen knows it. */
export interface ChatSession {
  id: string;
  you: PeerView;
  peer: PeerView;
}
