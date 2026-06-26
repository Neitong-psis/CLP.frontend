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

export const backendCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  thumbnail: z.string().nullable().optional(),
  isPublished: z.boolean(),
  meta: z.record(z.string(), z.unknown()).nullable().optional(),
  instructor: instructorSchema.nullable().optional(),
  category: categorySchema.nullable().optional(),
});

export const coursesPageSchema = z.object({
  data: z.array(backendCourseSchema),
  hasNextPage: z.boolean(),
});

export type BackendCourse = z.infer<typeof backendCourseSchema>;
