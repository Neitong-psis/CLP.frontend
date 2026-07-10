import { z } from 'zod';

/** Instructor sub-shape.
 *  Production serializes User with ClassSerializerInterceptor and no groups,
 *  which may omit id/firstName/lastName when excludeExtraneousValues is true.
 *  All fields are therefore optional so a sparse/empty object doesn't throw. */
const instructorSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
});

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const courseStatusSchema = z.enum([
  'todo',
  'in_writing',
  'under_review',
  'published',
  'archived',
]);

export type CourseStatusValue = z.infer<typeof courseStatusSchema>;

export const backendCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  thumbnail: z.string().nullable().optional(),
  status: courseStatusSchema,
  level: z.string().nullable().optional(),
  enrolledCount: z.number().optional(),
  meta: z.record(z.string(), z.unknown()).nullable().optional(),
  instructor: instructorSchema.nullable().optional(),
  category: categorySchema.nullable().optional(),
});

export const coursesPageSchema = z.object({
  data: z.array(backendCourseSchema),
  hasNextPage: z.boolean(),
});

export type BackendCourse = z.infer<typeof backendCourseSchema>;

export const courseStatsResponseSchema = z.object({
  active: z.number(),
  total: z.number(),
  trend: z.number(),
  revenueByCategory: z.array(
    z.object({ name: z.string(), amount: z.number() }),
  ),
});

export type CourseStatsResponse = z.infer<typeof courseStatsResponseSchema>;

export const topPerformingCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  studentsCount: z.number(),
  status: courseStatusSchema,
  price: z.number(),
  instructor: instructorSchema.nullable().optional(),
});

export type TopPerformingCourse = z.infer<typeof topPerformingCourseSchema>;
