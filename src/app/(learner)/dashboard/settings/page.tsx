import type { Metadata } from "next";
import { DashboardPageView } from "@/components/dashboard/dashboard-page-view";
import { DASHBOARD_PAGE_META } from "@/config/dashboard-pages";
import { ROUTES } from "@/config/routes";

const meta = DASHBOARD_PAGE_META[ROUTES.dashboard.settings];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function SettingsPage() {
  return <DashboardPageView variant={meta.skeleton} />;
}
