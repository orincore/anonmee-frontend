import { AuthProvider } from "@/providers/auth-provider";

/*
 * Who is signed in is only known in the browser (the session cookie belongs to the API, not to this site),
 * so the server can never pre-render these screens. They load their content on the client and navigate
 * like a single-page app. That is why this segment opts out of Next's instant-navigation check, which
 * would otherwise report the signed-in pages as "dropped" on every visit.
 */
export const dynamic = "force-dynamic";
export const instant = false;

// Everything that needs to know who is signed in lives under this layout. Public pages stay outside it.
export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
