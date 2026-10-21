import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { VisitTracker } from "@/features/landing/components/visit-tracker";

// Public pages: static, indexable, and light on JavaScript.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <VisitTracker />
    </>
  );
}
