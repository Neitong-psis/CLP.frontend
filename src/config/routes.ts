export const ROUTES = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    verifyEmail: "/auth/verify-email",
  },
  dashboard: {
    root: "/dashboard",
    myLearning: "/dashboard/my-learning",
    explore: "/dashboard/explore",
    progress: "/dashboard/progress",
    quizzes: "/dashboard/quizzes",
    certificates: "/dashboard/certificates",
    settings: "/dashboard/settings",
  },
} as const;

export type DashboardRoute =
  (typeof ROUTES.dashboard)[keyof typeof ROUTES.dashboard];

export const PROTECTED_ROUTE_PREFIXES: readonly string[] = [
  ROUTES.dashboard.root,
] as const;

export function isProtectedPathname(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
