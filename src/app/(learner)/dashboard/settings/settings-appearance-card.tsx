"use client";

import { ThemeToggle } from "@/components/clp/theme-toggle";

export function SettingsAppearanceCard() {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[#0F172A]">Appearance</h3>
          <p className="mt-2 text-sm text-[#64748B]">
            Toggle between light/dark palettes. Persistence is powered by Next Themes (`class`-based switching).
          </p>
        </div>
        <ThemeToggle />
      </div>
    </section>
  );
}
