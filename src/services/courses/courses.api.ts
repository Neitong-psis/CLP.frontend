import { http } from '@/lib/api/http';
import { normalizeError } from '@/lib/api/errors';
import {
  backendCourseSchema,
  coursesPageSchema,
  type BackendCourse,
} from '@/schemas/course.schema';
import type { AdminCourseRow, CourseStatus } from '@/constants/admin';

// ─── Dashboard stats types ────────────────────────────────────────────────────

export interface DashboardTopCourse {
  title: string;
  instructor: string;
  students: string;
  progress: number;
}

export interface DashboardRevenueCategory {
  name: string;
  amount: string;
  pct: number;
}

export interface CourseStats {
  activeCourses: number;
  topCourses: DashboardTopCourse[];
  revenueByCategory: DashboardRevenueCategory[];
}

const COURSES_ENDPOINT = '/courses';

const MAX_PAGE_LIMIT = 50;
const MAX_PAGES = 100;

// ─── Domain → row mapping ────────────────────────────────────────────────────

export function toAdminCourseRow(course: BackendCourse): AdminCourseRow {
  const meta = (course.meta ?? {}) as Record<string, unknown>;

  const firstName = course.instructor?.firstName ?? '';
  const lastName = course.instructor?.lastName ?? '';
  const instructorName =
    [firstName, lastName].filter(Boolean).join(' ') ||
    course.instructor?.email ||
    '—';

  const status: CourseStatus = course.isPublished
    ? 'Public'
    : meta.status === 'pending'
      ? 'Pending'
      : 'Archive';

  return {
    id: course.id,
    title: course.title,
    instructor: instructorName,
    category: course.category?.name ?? '—',
    level: typeof meta.level === 'string' ? meta.level : '—',
    enrolled: typeof meta.studentsCount === 'number' ? meta.studentsCount : 0,
    rating: typeof meta.rating === 'number' ? meta.rating : 0,
    status,
    createdAt: '—',
  };
}

function formatRevenue(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}k`;
  return `$${amount.toFixed(0)}`;
}

/**
 * Derives dashboard summary stats from the raw course list.
 * No extra API calls — everything is computed from `fetchRawCourses()` output.
 * Revenue is estimated as `price × studentsCount` per course.
 */
export function deriveCourseStats(raw: BackendCourse[]): CourseStats {
  const activeCourses = raw.filter((c) => c.isPublished).length;

  const withCounts = raw.map((c) => {
    const meta = (c.meta ?? {}) as Record<string, unknown>;
    return {
      course: c,
      count: typeof meta.studentsCount === 'number' ? meta.studentsCount : 0,
    };
  });

  const sorted = [...withCounts].sort((a, b) => b.count - a.count);
  const maxCount = sorted[0]?.count ?? 0;

  const topCourses: DashboardTopCourse[] = sorted
    .slice(0, 5)
    .map(({ course, count }) => ({
      title: course.title,
      instructor: toAdminCourseRow(course).instructor,
      students: count.toLocaleString(),
      progress: maxCount > 0 ? Math.round((count / maxCount) * 100) : 0,
    }));

  const catRevenue = new Map<string, number>();
  for (const { course, count } of withCounts) {
    const cat = course.category?.name ?? 'Other';
    catRevenue.set(cat, (catRevenue.get(cat) ?? 0) + course.price * count);
  }

  const sortedCats = [...catRevenue.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxRevenue = sortedCats[0]?.[1] ?? 0;

  const revenueByCategory: DashboardRevenueCategory[] = sortedCats.map(
    ([name, amount]) => ({
      name,
      amount: formatRevenue(amount),
      pct: maxRevenue > 0 ? Math.round((amount / maxRevenue) * 100) : 0,
    }),
  );

  return { activeCourses, topCourses, revenueByCategory };
}

// ─── API functions ───────────────────────────────────────────────────────────

/**
 * Walks all pages and returns raw `BackendCourse[]` so callers can extract
 * meta for later merge operations.
 */
export async function fetchRawCourses(): Promise<BackendCourse[]> {
  try {
    const all: BackendCourse[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const { data } = await http.get<unknown>(COURSES_ENDPOINT, {
        params: { page, limit: MAX_PAGE_LIMIT },
      });
      const parsed = coursesPageSchema.parse(data);
      all.push(...parsed.data);
      if (!parsed.hasNextPage) break;
    }
    return all;
  } catch (error) {
    throw normalizeError(error);
  }
}

export interface UpdateCourseInput {
  title?: string;
  isPublished?: boolean;
  /** Full meta replacement — callers must merge with existing meta first. */
  meta?: Record<string, unknown>;
}

export async function updateCourse(
  id: string,
  input: UpdateCourseInput,
): Promise<BackendCourse> {
  try {
    const { data } = await http.patch<unknown>(
      `${COURSES_ENDPOINT}/${id}`,
      input,
    );
    return backendCourseSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function deleteCourse(id: string): Promise<void> {
  try {
    await http.delete(`${COURSES_ENDPOINT}/${id}`);
  } catch (error) {
    throw normalizeError(error);
  }
}
