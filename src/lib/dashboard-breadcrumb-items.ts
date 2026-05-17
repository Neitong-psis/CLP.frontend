import { ROUTES } from "@/config/routes";
import type { BreadcrumbItem } from "@/components/clp/breadcrumbs";

function titleCase(segment: string): string {
  return segment
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

const routeLabelLookup: Record<string, string> = {
  [ROUTES.dashboard.root]: "Dashboard",
  [ROUTES.dashboard.myLearning]: "My Learning",
  [ROUTES.dashboard.explore]: "Explore",
  [ROUTES.dashboard.certificates]: "Certificates",
  [ROUTES.dashboard.progress]: "Progress & Achievements",
  [ROUTES.dashboard.quizzes]: "Quizzes",
  [ROUTES.dashboard.settings]: "Settings",
};

export function getDashboardBreadcrumbItems(pathname: string): readonly BreadcrumbItem[] {
  if (!pathname.startsWith(ROUTES.dashboard.root)) {
    return [];
  }

  const exactLabel = routeLabelLookup[pathname];
  if (exactLabel) {
    if (pathname === ROUTES.dashboard.root) {
      return [{ label: exactLabel }];
    }
    return [
      { label: "Dashboard", href: ROUTES.dashboard.root },
      { label: exactLabel },
    ];
  }

  // Fallback for unknown nested routes under /dashboard
  const trimmed = pathname.replace(/\/+$/, "");
  const parts = trimmed.split("/").filter(Boolean); // ["dashboard", ...]

  const items: BreadcrumbItem[] = [];
  items.push({ label: "Dashboard", href: ROUTES.dashboard.root });

  if (parts.length <= 1) {
    return items;
  }

  const tail = parts.slice(1).join("/");
  items.push({ label: titleCase(tail.replaceAll("/", " ")) });
  return items;
}
