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
  emailVerified: boolean;
}
type State = { status: "loading" } | { status: "offline" } | { status: "guest" } | { status: "authed"; me: Me };

interface AuthValue {
  state: State;
  register: (input: RegisterFormValues) => Promise<Me>;
  login: (input: LoginInput) => Promise<Me>;
  logout: () => Promise<void>;
  verifyEmail: (code: string, email?: string) => Promise<void>;
  resendVerification: (email?: string) => Promise<{ ok: boolean; message: string; cooldown: number }>;
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
  verificationToken?: string;
  code?: string;
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
    return r.user;
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const r = await api<{ user: Me }>("/auth/login", { method: "POST", body: input });
    setState({ status: "authed", me: r.user });
    return r.user;
  }, []);

  const logout = useCallback(async () => {
    await api("/auth/logout", { method: "POST", body: {} }).catch(() => {});
    setState({ status: "guest" });
  }, []);

  const verifyEmail = useCallback(async (code: string, email?: string) => {
    const r = await api<{ ok: boolean; user: Me }>("/auth/verify-email", {
      method: "POST",
      body: { code, email },
    });
    setState({ status: "authed", me: r.user });
  }, []);

  const resendVerification = useCallback(async (email?: string) => {
    return api<{ ok: boolean; message: string; cooldown: number }>("/auth/send-verification", {
      method: "POST",
      body: { email },
    });
  }, []);

  const value = useMemo(
    () => ({ state, register, login, logout, verifyEmail, resendVerification, retry }),
    [state, register, login, logout, verifyEmail, resendVerification, retry]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
