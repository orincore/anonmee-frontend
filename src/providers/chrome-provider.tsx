"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface Chrome {
  /** True while a chat fills the screen: the phone tab bar steps aside. */
  immersive: boolean;
  setImmersive: (v: boolean) => void;
}
const ChromeContext = createContext<Chrome>({ immersive: false, setImmersive: () => {} });

export function ChromeProvider({ children }: { children: React.ReactNode }) {
  const [immersive, setImmersive] = useState(false);
  const value = useMemo(() => ({ immersive, setImmersive }), [immersive]);
  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>;
}

/** Call from a full-screen chat to hide the tab bar for as long as it is mounted. */
export function useImmersive(on: boolean) {
  const { setImmersive } = useContext(ChromeContext);
  useEffect(() => {
    setImmersive(on);
    return () => setImmersive(false);
  }, [on, setImmersive]);
}

export const useChrome = () => useContext(ChromeContext);
