"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Gender, LoginInput } from "@/contracts";
import { api, ApiError } from "@/lib/api";
import { readVisitId } from "@/features/landing/visit-id";

/** The only account details the app ever holds: what the person sees about themselves. */
export interface Me {
  username: string;
  gender: Gender;
  age: number;
}
type State = { status: "loading" } | { status: "offline" } | { status: "guest" } | { status: "authed"; me: Me };

interface AuthValue {
  state: State;
  register: (input: RegisterFormValues) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  /** Try again after the connection dropped. */
  retry: () => void;
}
/** What the sign-up form sends: the date of birth is a plain YYYY-MM-DD string. */
export interface RegisterFormValues {
  email: string;
  password: string;
  username: string;
  gender: Me["gender"];
  dateOfBirth: string;
  confirmAdult: boolean;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({ status: "loading" });

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    api<{ user: Me }>("/auth/me")
      .then((r) => live && setState({ status: "authed", me: r.user }))
      .catch((e) => {
        // A dropped connection is not the same as being signed out; only a 401 means guest.
        if (live) setState(e instanceof ApiError && e.status === 0 ? { status: "offline" } : { status: "guest" });
      });
    return () => {
      live = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }, []);

  const register = useCallback(async (input: RegisterFormValues) => {
    const r = await api<{ user: Me }>("/auth/register", { method: "POST", body: { ...input, visitId: readVisitId() } });
    setState({ status: "authed", me: r.user });
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const r = await api<{ user: Me }>("/auth/login", { method: "POST", body: input });
    setState({ status: "authed", me: r.user });
  }, []);

  const logout = useCallback(async () => {
    await api("/auth/logout", { method: "POST", body: {} }).catch(() => {});
    setState({ status: "guest" });
  }, []);

  const value = useMemo(() => ({ state, register, login, logout, retry }), [state, register, login, logout, retry]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
