"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { api, ApiError } from "@/lib/api";
import { AdminShell, type AdminRole } from "./admin-shell";

interface Admin { email: string; role: AdminRole }
const AdminContext = createContext<Admin | null>(null);

/** The signed-in staff member, for screens that change by role. */
export function useAdmin(): Admin {
  const a = useContext(AdminContext);
  if (!a) throw new Error("useAdmin must be used inside AdminGate");
  return a;
}

/** Only staff get past this. Anyone else is sent to the staff login. */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin>();
  useEffect(() => {
    api<{ admin: Admin }>("/admin/me")
      .then((r) => setAdmin(r.admin))
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) router.replace("/admin/login");
      });
  }, [router]);

  if (!admin) return <div className="mx-auto max-w-3xl space-y-4 px-4 pt-16" aria-busy><Skeleton className="h-12 w-1/2" /><Skeleton className="h-40" /></div>;
  return (
    <AdminContext.Provider value={admin}>
      <AdminShell role={admin.role} email={admin.email}>{children}</AdminShell>
    </AdminContext.Provider>
  );
}
