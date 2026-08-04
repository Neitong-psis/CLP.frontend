/**
 * Central namespace registry — the single source of truth for every
 * next-intl namespace string used in this project.
 *
 * Do not import NS directly in components. Use the typed hooks from '@/i18n'.
 * NS is an implementation detail of hooks.ts.
 */
export const NS = {
  // ── Shared / public ──────────────────────────────────────────────────────
  header: 'header',
  language: 'language',
  theme: 'theme',
  notFound: 'notFound',
  nav: 'nav',
  common: 'common',
  course: 'course',

  // ── Auth ─────────────────────────────────────────────────────────────────
  auth: 'auth',

  // ── Admin ─────────────────────────────────────────────────────────────────
  admin: {
    root: 'admin',
    common: 'admin.common',
    dashboard: 'admin.dashboardPage',
    courses: 'admin.coursesPage',
    coursesContextMenu: 'admin.coursesPage.contextMenu',
    coursesCreateModal: 'admin.coursesPage.createModal',
    coursesDeleteModal: 'admin.coursesPage.deleteModal',
    coursesEditModal: 'admin.coursesPage.editModal',
    coursesViewModal: 'admin.coursesPage.viewModal',
    coursesAssignAuthor: 'admin.coursesPage.assignAuthor',
    reviewOverlay: 'admin.reviewOverlay',
    users: 'admin.usersPage',
    usersAddModal: 'admin.usersPage.addModal',
    usersContextMenu: 'admin.usersPage.contextMenu',
    usersPasswordCell: 'admin.usersPage.passwordCell',
    usersApprovals: 'admin.usersPage.approvalsPage',
    analytics: 'admin.analyticsPage',
    certifications: 'admin.certPage',
    revenue: 'admin.revenuePage',
    system: 'admin.systemPage',
    settings: 'admin.settingsPage',
    learnMore: 'admin.learnMore',
    login: 'admin.login',
    statCard: 'admin.statCard',
    topCourses: 'admin.topCourses',
    platformAnalytics: 'admin.platformAnalytics',
    monthlyRevenue: 'admin.monthlyRevenue',
  },

  // ── Educator ──────────────────────────────────────────────────────────────
  educator: {
    root: 'educator',
    stats: 'educator.stats',
    greetingHero: 'educator.greetingHero',
    courses: 'educator.coursesPage',
    students: 'educator.studentsPage',
    settings: 'educator.settingsPage',
    review: 'educator.review',
    createCourse: 'educator.createCourse',
  },

  // ── Learner ───────────────────────────────────────────────────────────────
  learner: {
    root: 'learner',
    dashboard: 'learner.dashboard',
    myLearning: 'learner.myLearning',
    certificates: 'learner.certificates',
    explore: 'learner.explore',
    checkout: 'learner.checkout',
  },
} as const;

// Derives a union of every leaf string value inside NS.
// Any string not in this union is a compile-time error when used as a namespace.
type DeepValue<T> = T extends string
  ? T
  : T extends object
    ? DeepValue<T[keyof T]>
    : never;

export type NamespaceKey = DeepValue<typeof NS>;
