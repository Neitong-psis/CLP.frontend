import {
  Award,
  BookOpen,
  Compass,
  LayoutDashboard,
  type LucideIcon,
  ScrollText,
  Settings,
  ListChecks,
} from "lucide-react";
import { ROUTES } from "@/config/routes";

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly badgeCount?: number;
}

export const learnerNavItems: readonly NavItem[] = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard.root,
    icon: LayoutDashboard,
  },
  {
    label: "My Learning",
    href: ROUTES.dashboard.myLearning,
    icon: BookOpen,
    badgeCount: 3,
  },
  {
    label: "Explore",
    href: ROUTES.dashboard.explore,
    icon: Compass,
  },
  {
    label: "Progress & Achievements",
    href: ROUTES.dashboard.progress,
    icon: Award,
  },
  {
    label: "Quizzes",
    href: ROUTES.dashboard.quizzes,
    icon: ListChecks,
    badgeCount: 2,
  },
  {
    label: "Certificates",
    href: ROUTES.dashboard.certificates,
    icon: ScrollText,
  },
  {
    label: "Settings",
    href: ROUTES.dashboard.settings,
    icon: Settings,
  },
] as const;
