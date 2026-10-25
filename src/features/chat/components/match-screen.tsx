"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PreferencesSheet } from "@/components/shared";
import { usePreferences } from "@/hooks/use-preferences";
import { useImmersive } from "@/providers/chrome-provider";
import { useSocket } from "@/providers/socket-provider";
import { useMatch } from "../hooks/use-match";
import { ChatView } from "./chat-view";
import { IdleView } from "./idle-view";
import { SearchingView } from "./searching-view";

/** The Chat tab: rest, search, no-match, and the live conversation, all driven by one state machine. */
export function MatchScreen() {
  const { phase, start, cancel, leave, skip, reset } = useMatch();
  const { connected } = useSocket();
  const { preferences, save } = usePreferences();
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const wantsStart = useSearchParams().get("go") === "1";
  const autoStarted = useRef(false);
  useImmersive(phase.kind === "chatting");

  // Coming from "Start matching" on Home: begin straight away, once, then tidy the address.
  useEffect(() => {
    if (!wantsStart || autoStarted.current || !connected || phase.kind !== "idle") return;
    autoStarted.current = true;
    void start();
    router.replace("/chat");
  }, [wantsStart, connected, phase.kind, start, router]);

  return (
    <>
      {phase.kind === "searching" ? <SearchingView onCancel={cancel} /> : null}
      {phase.kind === "idle" ? <IdleView title="Meet someone new." body="We will pair you with a stranger who wants the same kind of chat. Only your gender and age are shown." error={phase.error} primaryLabel="Start matching" onStart={start} secondary={{ label: "What I am looking for", onClick: () => setEditing(true) }} /> : null}
      {phase.kind === "timeout" ? <IdleView title="No one yet." body="Nobody who fits is around right now. Keep waiting, or widen what you are looking for." primaryLabel="Keep waiting" onStart={start} secondary={{ label: "Change preferences", onClick: () => setEditing(true) }} /> : null}
      {phase.kind === "chatting" ? <ChatView key={phase.chat.id} chat={phase.chat} ended={phase.ended} onLeave={leave} onNext={() => { reset(); void start(); }} onSkip={skip} /> : null}
      {preferences ? <PreferencesSheet open={editing} onOpenChange={setEditing} value={preferences} onSave={save} /> : null}
    </>
  );
}
