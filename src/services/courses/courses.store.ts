import { createResourceStore } from '@/lib/cache/createResourceStore';
import { ADMIN_COURSES, type AdminCourseRow } from '@/constants/admin';
import { fetchRawCourses, toAdminCourseRow } from './courses.api';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';

/** Shared cache for the admin course list — every admin page that needs the
 *  full course list reads from this one store instead of fetching its own
 *  copy, so navigating between pages doesn't re-flash a loading skeleton. */
export const coursesStore = createResourceStore<AdminCourseRow[]>(() =>
  isMockModeEnabled()
    ? Promise.resolve(ADMIN_COURSES)
    : fetchRawCourses().then((rows) => rows.map(toAdminCourseRow)),
);
