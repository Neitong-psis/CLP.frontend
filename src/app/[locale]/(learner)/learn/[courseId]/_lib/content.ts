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
import {
  C1_MODULES,
  C2_MODULES,
  C3_MODULES,
  C4_MODULES,
  C5_MODULES,
  C6_MODULES,
  C7_MODULES,
  C8_MODULES,
  C9_MODULES,
  C10_MODULES,
  C11_MODULES,
  C12_MODULES,
} from './course-modules';
import {
  E1_MODULES,
  E2_MODULES,
  E3_MODULES,
  E4_MODULES,
  E5_MODULES,
  E6_MODULES,
  E7_MODULES,
  E8_MODULES,
  E9_MODULES,
  E10_MODULES,
  E11_MODULES,
  E12_MODULES,
  E13_MODULES,
  E14_MODULES,
  E15_MODULES,
} from './explore-modules';

// ── Learner item status ───────────────────────────────────────────────────────

export type LearnerItemStatus =
  'unread' | 'completed' | 'ready' | 'passed' | 'failed' | 'submitted';

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
  // Module 3: Leadership & Communication
  v4: 'unread', // Leadership Styles
  q6: 'unread', // Leadership Styles Quiz
  a6: 'unread', // Leadership Style Self-Assessment
  d3: 'unread', // Effective Communication
  q7: 'unread', // Effective Communication Quiz
  a7: 'unread', // Feedback Conversation Role Play
  v5: 'unread', // Presenting with Confidence
  q8: 'unread', // Presenting with Confidence Quiz
  a8: 'unread', // 3-Minute Presentation Script
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
// Each course has unique topic-matched curriculum content. See course-modules.ts
// for enrolled courses (1-12) and explore-modules.ts for explore courses (e1-e15).

export const COURSE_MODULES_MAP: Record<string, typeof REVIEW_MODULES> = {
  '1': C1_MODULES,
  '2': C2_MODULES,
  '3': C3_MODULES,
  '4': C4_MODULES,
  '5': C5_MODULES,
  '6': C6_MODULES,
  '7': C7_MODULES,
  '8': C8_MODULES,
  '9': C9_MODULES,
  '10': C10_MODULES,
  '11': C11_MODULES,
  '12': C12_MODULES,
  e1: E1_MODULES,
  e2: E2_MODULES,
  e3: E3_MODULES,
  e4: E4_MODULES,
  e5: E5_MODULES,
  e6: E6_MODULES,
  e7: E7_MODULES,
  e8: E8_MODULES,
  e9: E9_MODULES,
  e10: E10_MODULES,
  e11: E11_MODULES,
  e12: E12_MODULES,
  e13: E13_MODULES,
  e14: E14_MODULES,
  e15: E15_MODULES,
};
