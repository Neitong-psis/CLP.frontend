import { z } from 'zod';

export const CATEGORIES = [
  'Web Development',
  'Programming',
  'Data Science',
  'Cloud Computing',
  'DevOps',
  'Design',
  'AI & Machine Learning',
  'Cybersecurity',
] as const;

export const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export const VISIBILITY = ['draft', 'published'] as const;

export const MAX_DESCRIPTION = 500;

export const courseSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be under 100 characters'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(
      MAX_DESCRIPTION,
      `Description must be under ${MAX_DESCRIPTION} characters`,
    ),
  category: z.string().min(1, 'Please select a category'),
  level: z.enum(LEVELS, {
    message: 'Please select a level',
  }),
  price: z.coerce
    .number({ message: 'Must be a number' })
    .min(0, 'Price cannot be negative'),
  duration: z.string().min(1, 'Duration is required'),
  tags: z.array(z.string()).min(1, 'Add at least one tag'),
  visibility: z.enum(VISIBILITY),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
