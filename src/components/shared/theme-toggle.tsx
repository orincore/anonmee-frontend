"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={`Switch to ${next} theme`}>
      {theme === "dark" ? <Sun aria-hidden weight="bold" className="size-5" /> : <Moon aria-hidden weight="bold" className="size-5" />}
    </Button>
  );
}
