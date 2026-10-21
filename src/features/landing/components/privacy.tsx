import { IdSlip } from "./id-slip";

/** The coral band, so the privacy promise is impossible to miss. Statement left, the form right. */
export function Privacy() {
  return (
    <section aria-label="Your privacy" className="overflow-x-clip bg-pop text-pop-fg">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 py-20 md:grid-cols-2 md:items-center md:gap-20 md:px-6 md:py-28">
        <div className="space-y-6">
          <h2 className="display text-display">Only two real things about you are ever shown.</h2>
          <p className="max-w-[48ch] text-lg">Your gender and your age. That is the whole list. Our safety team can look up account details to deal with abuse; that access needs two-step login and every look is logged.</p>
        </div>
        <IdSlip />
      </div>
    </section>
  );
}
