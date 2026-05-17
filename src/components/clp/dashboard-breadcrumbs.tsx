"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/clp/breadcrumbs";
import type { BreadcrumbItem } from "@/components/clp/breadcrumbs";
import { getDashboardBreadcrumbItems } from "@/lib/dashboard-breadcrumb-items";

interface DashboardBreadcrumbsProps {
  readonly overrides?: readonly BreadcrumbItem[];
}

export function DashboardBreadcrumbs({ overrides }: DashboardBreadcrumbsProps) {
  const pathname = usePathname();

  const items = useMemo<readonly BreadcrumbItem[]>(() => {
    if (overrides?.length) {
      return overrides;
    }
    return getDashboardBreadcrumbItems(pathname);
  }, [overrides, pathname]);

  return <Breadcrumbs items={items} />;
}
