import { z } from 'zod';
import { courseSchema as baseCourseSchema } from '@/config/course';

const quizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  correct: z.boolean(),
});

const contentSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'image', 'video', 'quiz', 'assignment']),
  text: z.string().optional(),
  videoTitle: z.string().optional(),
  videoUrl: z.string().optional(),
  question: z.string().optional(),
  answerFormat: z.enum(['single', 'multiple']).optional(),
  options: z.array(quizOptionSchema).optional(),
  assignmentDesc: z.string().optional(),
  dueDate: z.string().optional(),
  submissionType: z.string().optional(),
});

const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Lesson title is required'),
  expanded: z.boolean(),
  sections: z.array(contentSectionSchema),
});

const moduleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Module title is required'),
  expanded: z.boolean(),
  lessons: z.array(lessonSchema),
});

export const wizardCourseSchema = baseCourseSchema.extend({
  subtitle: z.string().optional(),
  thumbnailFile: z.any().nullable().optional(), // holds raw File client-side safely
  thumbnailPath: z.string().optional(), // holds final string path from upload API
  pricingType: z.enum(['paid', 'free']),
  modules: z.array(moduleSchema),
  assignedEducatorId: z.string().optional(),
  workStatus: z.string(),
  author: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.string().optional(),
  workProgress: z.number().min(0).max(100).optional(),
});

export type WizardCourseFormValues = z.infer<typeof wizardCourseSchema>;
