'use client';

export * from './namespaces';
import { useTranslations } from 'next-intl';
import { NS } from './namespaces';

// ── Shared / public ────────────────────────────────────────────────────────
export const useHeaderT = () => useTranslations(NS.header);
export const useLanguageT = () => useTranslations(NS.language);
export const useThemeT = () => useTranslations(NS.theme);
export const useNotFoundT = () => useTranslations(NS.notFound);
export const useNavT = () => useTranslations(NS.nav);
export const useCommonT = () => useTranslations(NS.common);
export const useCourseT = () => useTranslations(NS.course);

// ── Auth ───────────────────────────────────────────────────────────────────
export const useAuthT = () => useTranslations(NS.auth);

// ── Admin ──────────────────────────────────────────────────────────────────
export const useAdminT = () => useTranslations(NS.admin.root);
export const useAdminCommonT = () => useTranslations(NS.admin.common);
export const useAdminDashboardT = () => useTranslations(NS.admin.dashboard);
export const useAdminCoursesT = () => useTranslations(NS.admin.courses);
export const useAdminCoursesContextMenuT = () =>
  useTranslations(NS.admin.coursesContextMenu);
export const useAdminCoursesCreateModalT = () =>
  useTranslations(NS.admin.coursesCreateModal);
export const useAdminCoursesDeleteModalT = () =>
  useTranslations(NS.admin.coursesDeleteModal);
export const useAdminCoursesEditModalT = () =>
  useTranslations(NS.admin.coursesEditModal);
export const useAdminCoursesViewModalT = () =>
  useTranslations(NS.admin.coursesViewModal);
export const useAdminCoursesAssignAuthorT = () =>
  useTranslations(NS.admin.coursesAssignAuthor);
export const useAdminReviewOverlayT = () =>
  useTranslations(NS.admin.reviewOverlay);
export const useAdminUsersT = () => useTranslations(NS.admin.users);
export const useAdminUsersAddModalT = () =>
  useTranslations(NS.admin.usersAddModal);
export const useAdminUsersContextMenuT = () =>
  useTranslations(NS.admin.usersContextMenu);
export const useAdminUsersPasswordCellT = () =>
  useTranslations(NS.admin.usersPasswordCell);
export const useAdminUsersApprovalsT = () =>
  useTranslations(NS.admin.usersApprovals);
export const useAdminAnalyticsT = () => useTranslations(NS.admin.analytics);
export const useAdminCertificationsT = () =>
  useTranslations(NS.admin.certifications);
export const useAdminRevenueT = () => useTranslations(NS.admin.revenue);
export const useAdminSystemT = () => useTranslations(NS.admin.system);
export const useAdminSettingsT = () => useTranslations(NS.admin.settings);
export const useAdminLearnMoreT = () => useTranslations(NS.admin.learnMore);
export const useAdminLoginT = () => useTranslations(NS.admin.login);
export const useAdminStatCardT = () => useTranslations(NS.admin.statCard);
export const useAdminTopCoursesT = () => useTranslations(NS.admin.topCourses);
export const useAdminPlatformAnalyticsT = () =>
  useTranslations(NS.admin.platformAnalytics);
export const useAdminMonthlyRevenueT = () =>
  useTranslations(NS.admin.monthlyRevenue);

// ── Educator ───────────────────────────────────────────────────────────────
export const useEducatorT = () => useTranslations(NS.educator.root);
export const useEducatorStatsT = () => useTranslations(NS.educator.stats);
export const useEducatorGreetingHeroT = () =>
  useTranslations(NS.educator.greetingHero);
export const useEducatorCoursesT = () => useTranslations(NS.educator.courses);
export const useEducatorStudentsT = () => useTranslations(NS.educator.students);
export const useEducatorSettingsT = () => useTranslations(NS.educator.settings);
export const useEducatorReviewT = () => useTranslations(NS.educator.review);
export const useCreateCourseT = () => useTranslations(NS.educator.createCourse);

// ── Learner ────────────────────────────────────────────────────────────────
export const useLearnerT = () => useTranslations(NS.learner.root);
export const useLearnerDashboardT = () => useTranslations(NS.learner.dashboard);
export const useLearnerMyLearningT = () =>
  useTranslations(NS.learner.myLearning);
export const useLearnerCertificatesT = () =>
  useTranslations(NS.learner.certificates);
export const useLearnerExploreT = () => useTranslations(NS.learner.explore);
export const useLearnerCheckoutT = () => useTranslations(NS.learner.checkout);

// ── Shared course catalog/preview components ────────────────────────────────
// Alias onto the same copy as the learner Explore surface — shared components
// under src/components/course/ render on both public and learner pages, so
// they use this neutrally-named hook instead of importing a learner-specific
// one directly.
export const useCourseCatalogT = () => useTranslations(NS.learner.explore);
