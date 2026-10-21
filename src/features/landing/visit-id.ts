const KEY = "visit-id";

/** The visit id from /track/visit, kept for this tab so sign-up can be credited to where the person came from. */
export function readVisitId(): string | undefined {
  try {
    return sessionStorage.getItem(KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

export function saveVisitId(id: string) {
  try {
    sessionStorage.setItem(KEY, id);
  } catch {
    /* storage can be blocked; attribution is optional */
  }
}
