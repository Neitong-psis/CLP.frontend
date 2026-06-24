// Learner-specific content for the Course Player page.
// Re-exports shared curriculum types from the educator content file so the
// learner page can consume the same data without duplicating the model.

export {
  REVIEW_MODULES,
  flattenItems,
  lessonCount,
} from '../../../../(educator)/educator/courses/[id]/_lib/content';

export type {
  ReviewModule,
  ReviewLesson,
  ReviewItem,
  ReviewItemKind,
  DocumentItem,
  VideoItem,
  QuizItem,
  AssignmentItem,
} from '../../../../(educator)/educator/courses/[id]/_lib/content';

import { REVIEW_MODULES } from '../../../../(educator)/educator/courses/[id]/_lib/content';

// ── Learner item status ───────────────────────────────────────────────────────

export type LearnerItemStatus =
  | 'unread'
  | 'completed'
  | 'ready'
  | 'passed'
  | 'failed'
  | 'submitted';

export const LEARNER_ITEM_STATUSES: Record<string, LearnerItemStatus> = {
  d1: 'completed', // Responsive Design Guide - read
  v1: 'completed', // HTML Introduction - watched (active for resume)
  v2: 'ready', // CSS Layout Basics - not started yet
  q1: 'ready', // HTML Basics Quiz
  q2: 'ready', // CSS Layout Quiz
  q3: 'ready', // Responsive Design Quiz
  a1: 'ready', // Create a Semantic Page
  a2: 'submitted', // Rebuild a Responsive Layout
  a3: 'ready', // Responsive Reading Reflection
  d2: 'unread', // Accessibility Notes
  v3: 'ready', // Smart Office Workflow
  q4: 'ready', // Smart Office Workflow Quiz
  q5: 'ready', // Accessibility Practice Quiz
  a4: 'ready', // Draft an AI Workflow Plan
  a5: 'ready', // Accessibility Audit Checklist
};

export const LEARNER_STATUS_STYLE: Record<LearnerItemStatus, string> = {
  completed:
    'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20',
  passed: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20',
  failed: 'bg-red-500/10 text-red-600 border-red-200 dark:bg-red-500/20',
  submitted:
    'bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/20',
  ready:
    'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20',
  unread: 'bg-muted text-muted-foreground border-border',
};

// ── Course → modules mapping ──────────────────────────────────────────────────
// All enrolled courses currently share the same demo curriculum (REVIEW_MODULES).
// Replace individual entries with real per-course data when the backend is ready.

export const COURSE_MODULES_MAP: Record<string, typeof REVIEW_MODULES> = {
  '1': REVIEW_MODULES,
  '2': REVIEW_MODULES,
  '3': REVIEW_MODULES,
  '4': REVIEW_MODULES,
  '5': REVIEW_MODULES,
  '6': REVIEW_MODULES,
  '7': REVIEW_MODULES,
  '8': REVIEW_MODULES,
  '9': REVIEW_MODULES,
  '10': REVIEW_MODULES,
  '11': REVIEW_MODULES,
  '12': REVIEW_MODULES,
  e1: REVIEW_MODULES,
  e2: REVIEW_MODULES,
  e3: REVIEW_MODULES,
  e4: REVIEW_MODULES,
  e5: REVIEW_MODULES,
  e6: REVIEW_MODULES,
  e7: REVIEW_MODULES,
  e8: REVIEW_MODULES,
  e9: REVIEW_MODULES,
  e10: REVIEW_MODULES,
  e11: REVIEW_MODULES,
  e12: REVIEW_MODULES,
  e13: REVIEW_MODULES,
  e14: REVIEW_MODULES,
  e15: REVIEW_MODULES,
};
