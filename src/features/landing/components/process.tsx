import { SectionHeading } from "@/components/shared";
import { IntentDemo } from "./intent-demo";
import { MatchDemo } from "./match-demo";
import { SafetyDemo } from "./safety-demo";
import { StepCard } from "./step-card";

/** Three steps on a six-column grid: one wide, one tall, one wide, so it never reads as three equal boxes. */
export function Process() {
  return (
    <section id="how-it-works" aria-label="How it works" className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-20 md:px-6 md:py-28">
      <SectionHeading title="Pick. Match. Talk." body="No profile to fill in. No photos. Just a conversation." className="mb-12" />
      <ol className="grid gap-5 md:grid-cols-6 md:gap-6">
        <StepCard highlight="Say what" rest="you want." tone="accent" className="md:col-span-4" body="Friends, dating, a casual chat, something else. Choose one or several, and who you would like to meet.">
          <IntentDemo />
        </StepCard>
        <StepCard highlight="Get matched" rest="in a moment." tone="pop" className="md:col-span-2 md:row-span-2" body="We pair you with someone who wants the same thing and fits what you asked for. Both ways, every time.">
          <MatchDemo />
        </StepCard>
        <StepCard highlight="Leave" rest="or report any time." tone="brand" className="md:col-span-4" body="Not feeling it? One tap ends the chat. Report or block, and you will never be put together again.">
          <SafetyDemo />
        </StepCard>
      </ol>
    </section>
  );
}
