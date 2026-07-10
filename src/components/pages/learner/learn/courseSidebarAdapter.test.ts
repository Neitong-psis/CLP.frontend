import { describe, expect, it } from 'vitest';
import { computeLocks, type ItemDone } from '@/lib/course-progress';
import type {
  AssignmentItem,
  DocumentItem,
  QuizItem,
  ReviewModule,
  VideoItem,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { toSidebarCourse, type AdapterLabels } from './courseSidebarAdapter';

const LABELS: AdapterLabels = {
  completed: 'Completed',
  pending: 'Pending',
  submitted: 'Submitted',
  attemptsUsed: (used, max) => `${used} of ${max} attempts`,
  lockedHint: (lesson) => `Complete ${lesson} to unlock`,
  lockedFallback: 'Locked',
};

const doc = (id: string, title: string): DocumentItem => ({
  kind: 'document',
  id,
  title,
  readTime: '10 min',
  intro: '',
  objectives: [],
  sections: [],
  takeaways: [],
});

const video = (id: string, title: string): VideoItem => ({
  kind: 'video',
  id,
  title,
  duration: '12:40',
  intro: '',
  topics: [],
  moments: [],
});

const quiz = (id: string, title: string): QuizItem => ({
  kind: 'quiz',
  id,
  title,
  status: 'Ready',
  forLesson: 'L1',
  totalQuestions: 5,
  estimatedMinutes: 8,
  description: '',
  questions: [],
});

const assignment = (id: string, title: string): AssignmentItem => ({
  kind: 'assignment',
  id,
  title,
  status: 'Ready',
  forLesson: 'L1',
  dueDate: 'Friday',
  submission: 'File',
  instructions: '',
  requirements: [],
});

/**
 * Module 1 / lesson "l1" bundles two items (doc + quiz) — exactly the case
 * that a flat Module → row mapping would erase. Module 2 / lesson "l2" holds
 * one item each, the common case.
 */
const MODULES: ReviewModule[] = [
  {
    id: 'm1',
    title: 'Web Foundations',
    lessons: [
      {
        id: 'l1',
        title: 'Responsive Design',
        documents: [doc('d1', 'Responsive Design Guide')],
        videos: [],
        quizzes: [quiz('q1', 'Responsive Design Quiz')],
        assignments: [],
      },
    ],
  },
  {
    id: 'm2',
    title: 'HTML & Semantics',
    lessons: [
      {
        id: 'l2',
        title: 'HTML Introduction',
        documents: [],
        videos: [video('v1', 'HTML Introduction')],
        quizzes: [],
        assignments: [],
      },
      {
        id: 'l3',
        title: 'Semantic Landing Page',
        documents: [],
        videos: [],
        quizzes: [],
        assignments: [assignment('a1', 'Semantic Landing Page')],
      },
    ],
  },
];

function adapt({
  done = new Set<string>(),
  attempts = {},
  submitted = new Set<string>(),
}: {
  done?: Set<string>;
  attempts?: Record<string, number>;
  submitted?: Set<string>;
} = {}) {
  const isItemDone: ItemDone = (item) => done.has(item.id);
  return toSidebarCourse({
    courseId: 'c1',
    courseTitle: 'Course',
    modules: MODULES,
    locks: computeLocks(MODULES, isItemDone, true),
    isItemDone,
    attempts,
    submitted,
    maxQuizAttempts: 3,
    labels: LABELS,
  });
}

describe('toSidebarCourse', () => {
  it('maps Module → Lesson → Item one-for-one, preserving a bundled lesson', () => {
    const course = adapt();

    expect(course.modules.map((m) => m.id)).toEqual(['m1', 'm2']);
    expect(course.modules[0]!.lessons.map((l) => l.id)).toEqual(['l1']);

    // l1 keeps both of its items nested under one lesson, not split into two rows.
    const l1 = course.modules[0]!.lessons[0]!;
    expect(l1.items.map((i) => i.id)).toEqual(['d1', 'q1']);
    expect(l1.items.map((i) => i.type)).toEqual(['document', 'quiz']);

    expect(course.modules[1]!.lessons.map((l) => l.id)).toEqual(['l2', 'l3']);
  });

  it('locks a whole lesson, not individual items within it', () => {
    // Nothing done → lesson l2 is gated behind lesson l1 ("Responsive Design").
    const course = adapt();
    const l2 = course.modules[1]!.lessons[0]!;

    expect(l2.locked).toBe(true);
    expect(l2.lockedHint).toBe('Complete Responsive Design to unlock');
  });

  it('locks a module only when every lesson inside it is gated', () => {
    const course = adapt();
    expect(course.modules[0]!.locked).toBe(false);
    expect(course.modules[1]!.locked).toBe(true);
  });

  it('unlocks the next module once the prior lesson is finished', () => {
    const course = adapt({ done: new Set(['d1', 'q1']) });

    expect(course.modules[1]!.locked).toBe(false);
    expect(course.modules[1]!.lessons[0]!.locked).toBe(false);
    expect(course.modules[0]!.lessons[0]!.items.every((i) => i.completed)).toBe(
      true,
    );
  });

  it('carries each item kind its own detail line', () => {
    const course = adapt({ done: new Set(['d1', 'q1']) });
    const [guide, quizRow] = course.modules[0]!.lessons[0]!.items;
    const videoRow = course.modules[1]!.lessons[0]!.items[0]!;
    const assignmentRow = course.modules[1]!.lessons[1]!.items[0]!;

    expect(guide!.detail).toBe('10 min'); // document readTime
    expect(quizRow!.detail).toBe('Completed'); // passed quiz
    expect(videoRow.detail).toBe('12:40'); // video duration
    expect(assignmentRow.detail).toBe('Pending'); // not submitted
  });

  it('surfaces used quiz attempts instead of a duration', () => {
    const course = adapt({ attempts: { q1: 2 } });
    const quizRow = course.modules[0]!.lessons[0]!.items[1]!;
    expect(quizRow.detail).toBe('2 of 3 attempts');
  });

  it('shows an untouched quiz its estimated time', () => {
    const course = adapt();
    expect(course.modules[0]!.lessons[0]!.items[1]!.detail).toBe('8 min');
  });

  it('marks a submitted assignment as submitted', () => {
    const course = adapt({
      done: new Set(['d1', 'q1']),
      submitted: new Set(['a1']),
    });
    expect(course.modules[1]!.lessons[1]!.items[0]!.detail).toBe('Submitted');
  });
});
