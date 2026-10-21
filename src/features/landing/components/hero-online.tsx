"use client";

import { OnlineCounter } from "@/components/shared";
import { usePulse } from "../pulse-provider";

export function HeroOnline() {
  return <OnlineCounter count={usePulse().online} />;
}
