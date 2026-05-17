import { ROUTES } from "@/config/routes";

export type DashboardSkeletonVariant =
  | "overview"
  | "my-learning"
  | "explore"
  | "progress"
  | "quizzes"
  | "certificates"
  | "settings";

export interface DashboardPageMeta {
  readonly title: string;
  readonly description: string;
  readonly skeleton: DashboardSkeletonVariant;
  readonly useGreeting?: boolean;
}

export const DASHBOARD_PAGE_META: Readonly<Record<string, DashboardPageMeta>> = {
  [ROUTES.dashboard.root]: {
    title: "Dashboard",
    description: "Learner overview, streaks, quizzes, and continue learning.",
    skeleton: "overview",
    useGreeting: true,
  },
  [ROUTES.dashboard.myLearning]: {
    title: "My Learning",
    description: "5 courses enrolled",
    skeleton: "my-learning",
  },
  [ROUTES.dashboard.explore]: {
    title: "Explore Courses",
    description: "Discover new learning paths and enrollments.",
    skeleton: "explore",
  },
  [ROUTES.dashboard.progress]: {
    title: "Progress & Achievements",
    description: "XP, weekly activity, and skill progress.",
    skeleton: "progress",
  },
  [ROUTES.dashboard.quizzes]: {
    title: "Quizzes",
    description: "Upcoming assessments and quiz timeline.",
    skeleton: "quizzes",
  },
  [ROUTES.dashboard.certificates]: {
    title: "My Certificates",
    description: "Completed course certificates and verification status.",
    skeleton: "certificates",
  },
  [ROUTES.dashboard.settings]: {
    title: "Settings",
    description: "Workspace preferences and appearance.",
    skeleton: "settings",
  },
} as const;

export function getDashboardPageMeta(pathname: string): DashboardPageMeta {
  const exact = DASHBOARD_PAGE_META[pathname];
  if (exact) return exact;

  return {
    title: "Dashboard",
    description: "Content Learning Platform workspace.",
    skeleton: "overview",
    useGreeting: true,
  };
}
