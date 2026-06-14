import { z } from 'zod';

/** Instructor sub-shape (email is group-gated; always rely on firstName/lastName). */
const instructorSchema = z.object({
  id: z.number(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
});

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

/**
 * Backend `Course` domain shape (src/courses/domain/course.ts).
 * Status is derived: isPublished=true → "Public";
 * isPublished=false + meta.status="pending" → "Pending"; else → "Archive".
 * Level, rating and enrollment count live in the `meta` JSONB field.
 */
export const backendCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  thumbnail: z.string().nullable().optional(),
  isPublished: z.boolean(),
  meta: z.record(z.string(), z.unknown()).nullable().optional(),
  instructor: instructorSchema,
  category: categorySchema.nullable().optional(),
});

export const coursesPageSchema = z.object({
  data: z.array(backendCourseSchema),
  hasNextPage: z.boolean(),
});

export type BackendCourse = z.infer<typeof backendCourseSchema>;
