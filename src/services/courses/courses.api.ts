import { z } from 'zod';
import { http } from '@/lib/api/http';
import { normalizeError } from '@/lib/api/errors';
import {
  backendCourseSchema,
  coursesPageSchema,
  courseStatsResponseSchema,
  topPerformingCourseSchema,
  type BackendCourse,
  type CourseStatusValue,
  type CourseStatsResponse,
  type TopPerformingCourse,
} from '@/schemas/course.schema';
import type { AdminCourseRow, CourseStatus } from '@/constants/admin';

// ─── Status/level mapping ─────────────────────────────────────────────────────
// The backend only tracks a 5-value workflow status (todo/in_writing/
// under_review/published/archived) and a lowercase level enum. The admin UI
// collapses that down to the 3-value CourseStatus shown in the table.

function toCourseStatusLabel(status: CourseStatusValue): CourseStatus {
  if (status === 'published') return 'Public';
  if (status === 'archived') return 'Archive';
  return 'Pending';
}

/** Reverse of toCourseStatusLabel — 'Pending' maps to under_review, the
 *  closest equivalent when an admin manually sets a course back to pending. */
function toCourseStatusValue(label: CourseStatus): CourseStatusValue {
  if (label === 'Public') return 'published';
  if (label === 'Archive') return 'archived';
  return 'under_review';
}

function toDisplayLevel(level: string | null | undefined): string {
  if (!level) return '—';
  return level.charAt(0).toUpperCase() + level.slice(1);
}

// ─── Dashboard stats types ────────────────────────────────────────────────────

export interface DashboardTopCourse {
  id: string;
  title: string;
  instructor: string;
  students: string;
  progress: number;
  status: CourseStatus;
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

function formatInstructorName(
  instructor: BackendCourse['instructor'] | TopPerformingCourse['instructor'],
): string {
  const firstName = instructor?.firstName ?? '';
  const lastName = instructor?.lastName ?? '';
  return (
    [firstName, lastName].filter(Boolean).join(' ') || instructor?.email || '—'
  );
}

export function toAdminCourseRow(course: BackendCourse): AdminCourseRow {
  return {
    id: course.id,
    title: course.title,
    instructor: formatInstructorName(course.instructor),
    category: course.category?.name ?? '—',
    level: toDisplayLevel(course.level),
    enrolled: course.enrolledCount ?? 0,
    // No rating/review-score data exists in the backend yet.
    rating: 0,
    status: toCourseStatusLabel(course.status),
    createdAt: '—',
    description: course.description ?? undefined,
    price: course.price,
    thumbnail: course.thumbnail ?? undefined,
    categoryId: course.category?.id,
    instructorId:
      course.instructor?.id != null ? String(course.instructor.id) : undefined,
  };
}

function formatRevenue(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}k`;
  return `$${amount.toFixed(0)}`;
}

/**
 * Combines `courses/stats` and `courses/top-performing` into the shape the
 * dashboard/revenue widgets render. Both endpoints are cheap, admin-only SQL
 * aggregations — no course list pagination involved.
 */
export function buildCourseStats(
  stats: CourseStatsResponse,
  topPerforming: TopPerformingCourse[],
): CourseStats {
  const maxCount = topPerforming[0]?.studentsCount ?? 0;
  const topCourses: DashboardTopCourse[] = topPerforming.map((course) => ({
    id: course.id,
    title: course.title,
    instructor: formatInstructorName(course.instructor),
    students: course.studentsCount.toLocaleString(),
    progress:
      maxCount > 0 ? Math.round((course.studentsCount / maxCount) * 100) : 0,
    status: toCourseStatusLabel(course.status),
  }));

  const maxRevenue = stats.revenueByCategory[0]?.amount ?? 0;
  const revenueByCategory: DashboardRevenueCategory[] =
    stats.revenueByCategory.map(({ name, amount }) => ({
      name,
      amount: formatRevenue(amount),
      pct: maxRevenue > 0 ? Math.round((amount / maxRevenue) * 100) : 0,
    }));

  return { activeCourses: stats.active, topCourses, revenueByCategory };
}

// ─── API functions ───────────────────────────────────────────────────────────

export async function fetchCourseStats(): Promise<CourseStatsResponse> {
  try {
    const { data } = await http.get<unknown>(`${COURSES_ENDPOINT}/stats`);
    return courseStatsResponseSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function fetchTopPerformingCourses(): Promise<
  TopPerformingCourse[]
> {
  try {
    const { data } = await http.get<unknown>(
      `${COURSES_ENDPOINT}/top-performing`,
    );
    return z.array(topPerformingCourseSchema).parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

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
  status?: CourseStatusValue;
  level?: string;
  categoryId?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  instructorId?: string;
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

/** Admin edit-modal save: maps the 3-value UI status/display level back to
 *  the backend's workflow status enum and lowercase level enum. Category is
 *  only sent when it resolves to a real categoryId (see fetchAllCategories). */
export async function saveAdminCourseRow(
  updated: AdminCourseRow,
  categoryId?: string,
): Promise<BackendCourse> {
  return updateCourse(updated.id, {
    title: updated.title,
    status: toCourseStatusValue(updated.status),
    level: updated.level.toLowerCase(),
    ...(categoryId ? { categoryId } : {}),
  });
}

/** Republishes an archived course. */
export async function publishCourse(id: string): Promise<BackendCourse> {
  return updateCourse(id, { status: 'published' });
}

export async function deleteCourse(id: string): Promise<void> {
  try {
    await http.delete(`${COURSES_ENDPOINT}/${id}`);
  } catch (error) {
    throw normalizeError(error);
  }
}

export interface CreateCourseInput {
  title: string;
  subtitle?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  level?: string;
  categoryId?: string;
  instructorId?: string;
}

export async function createCourse(
  input: CreateCourseInput,
): Promise<BackendCourse> {
  try {
    const { data } = await http.post<unknown>(COURSES_ENDPOINT, input);
    return backendCourseSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

export interface SyncCurriculumQuizOption {
  text: string;
  correct: boolean;
}

export interface SyncCurriculumSection {
  type: 'text' | 'image' | 'video' | 'quiz' | 'assignment';
  text?: string;
  videoTitle?: string;
  videoUrl?: string;
  question?: string;
  answerFormat?: 'single' | 'multiple';
  options?: SyncCurriculumQuizOption[];
  assignmentDesc?: string;
  dueDate?: string;
  submissionType?: string;
}

export interface SyncCurriculumInput {
  modules: Array<{
    title: string;
    lessons: Array<{
      title: string;
      sections: SyncCurriculumSection[];
    }>;
  }>;
}

/** Replaces a course's modules/lessons in one call — used right after
 *  `createCourse` to persist the wizard's curriculum step. */
export async function syncCourseCurriculum(
  courseId: string,
  input: SyncCurriculumInput,
): Promise<void> {
  try {
    await http.post(`${COURSES_ENDPOINT}/${courseId}/curriculum`, input);
  } catch (error) {
    throw normalizeError(error);
  }
}
