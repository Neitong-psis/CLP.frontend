"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

function useIsClientHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {
      /* no-op unsubscribe */
    },
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useIsClientHydrated();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch theme (current ${hydrated ? (resolvedTheme ?? "system") : "system"})`}
      disabled={!hydrated}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white shadow-sm",
        "transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A23C]",
      )}
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </button>
  );
}
