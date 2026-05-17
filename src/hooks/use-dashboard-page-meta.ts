"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { getDashboardPageMeta } from "@/config/dashboard-pages";

export function useDashboardPageMeta() {
  const pathname = usePathname();

  return useMemo(() => getDashboardPageMeta(pathname), [pathname]);
}
