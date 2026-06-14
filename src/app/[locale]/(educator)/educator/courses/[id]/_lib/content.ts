// Compact curriculum model for the educator course-review experience.
// The educator previews their own submitted course exactly as a learner sees it
// before choosing to edit it or resubmit it for admin review.

export type ReviewItemKind = 'document' | 'video' | 'quiz' | 'assignment';
export type ReviewItemStatus = 'Ready' | 'Draft';

interface BaseItem {
  id: string;
  title: string;
}

export interface DocumentItem extends BaseItem {
  kind: 'document';
  intro: string;
  body: string[];
}

export interface VideoItem extends BaseItem {
  kind: 'video';
  intro: string;
  caption: string;
}

export interface QuizItem extends BaseItem {
  kind: 'quiz';
  status: ReviewItemStatus;
  forLesson: string;
  questions: number;
}

export interface AssignmentItem extends BaseItem {
  kind: 'assignment';
  status: ReviewItemStatus;
  dueDate: string;
  submission: string;
}

export type ReviewItem = DocumentItem | VideoItem | QuizItem | AssignmentItem;

export interface ReviewModule {
  id: string;
  title: string;
  documents: DocumentItem[];
  videos: VideoItem[];
  quizzes: QuizItem[];
  assignments: AssignmentItem[];
}

export const ITEM_STATUS_STYLE: Record<ReviewItemStatus, string> = {
  Ready: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Draft: 'border-amber-200 bg-amber-50 text-amber-600',
};

export function lessonCount(module: ReviewModule): number {
  return module.documents.length + module.videos.length;
}

export function flattenItems(modules: ReviewModule[]): ReviewItem[] {
  return modules.flatMap((m) => [
    ...m.documents,
    ...m.videos,
    ...m.quizzes,
    ...m.assignments,
  ]);
}

export const REVIEW_MODULES: ReviewModule[] = [
  {
    id: 'm1',
    title: 'Module 1: Web Foundations',
    documents: [
      {
        id: 'd1',
        kind: 'document',
        title: 'Responsive Design Guide',
        intro:
          'A concise reading guide for mobile-first layouts, breakpoints, and readable content blocks.',
        body: [
          'Start by scanning the key idea, then read each section carefully. This lesson focuses on practical habits learners can apply immediately.',
          'Give context first, examples second, and a simple action at the end. Pay attention to structure, definitions, and short real-world examples.',
        ],
      },
    ],
    videos: [
      {
        id: 'v1',
        kind: 'video',
        title: 'HTML Introduction',
        intro:
          'Meet the building blocks of every page: elements, tags, and document structure.',
        caption: 'Educator preview of the learner video experience.',
      },
      {
        id: 'v2',
        kind: 'video',
        title: 'CSS Layout Basics',
        intro:
          'Position content with the box model, flexbox, and a few reliable layout patterns.',
        caption: 'Educator preview of the learner video experience.',
      },
    ],
    quizzes: [
      {
        id: 'q1',
        kind: 'quiz',
        title: 'HTML Basics Quiz',
        status: 'Ready',
        forLesson: 'HTML Introduction',
        questions: 10,
      },
      {
        id: 'q2',
        kind: 'quiz',
        title: 'CSS Layout Quiz',
        status: 'Ready',
        forLesson: 'CSS Layout Basics',
        questions: 8,
      },
      {
        id: 'q3',
        kind: 'quiz',
        title: 'Responsive Design Quiz',
        status: 'Ready',
        forLesson: 'Responsive Design Guide',
        questions: 6,
      },
    ],
    assignments: [
      {
        id: 'a1',
        kind: 'assignment',
        title: 'Create a Semantic Page',
        status: 'Ready',
        dueDate: 'May 28',
        submission: 'File or link upload',
      },
      {
        id: 'a2',
        kind: 'assignment',
        title: 'Rebuild a Responsive Layout',
        status: 'Ready',
        dueDate: 'May 30',
        submission: 'File or link upload',
      },
      {
        id: 'a3',
        kind: 'assignment',
        title: 'Responsive Reading Reflection',
        status: 'Ready',
        dueDate: 'Jun 2',
        submission: 'Text response',
      },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Applied Smart Workflows',
    documents: [
      {
        id: 'd2',
        kind: 'document',
        title: 'Accessibility Notes',
        intro:
          'Quick reference for contrast, focus order, and labelling interactive elements.',
        body: [
          'Accessibility is easier when it is part of the first draft. Start with semantic structure, then layer in labels and visible focus states.',
          'Confirm that every interactive element can be reached and operated with the keyboard alone.',
        ],
      },
    ],
    videos: [
      {
        id: 'v3',
        kind: 'video',
        title: 'Smart Office Workflow',
        intro:
          'Use AI tools to organize office tasks, summarize notes, and create faster daily workflows.',
        caption: 'Educator preview of the learner video experience.',
      },
    ],
    quizzes: [
      {
        id: 'q4',
        kind: 'quiz',
        title: 'Smart Office Workflow Quiz',
        status: 'Ready',
        forLesson: 'Smart Office Workflow',
        questions: 7,
      },
      {
        id: 'q5',
        kind: 'quiz',
        title: 'Accessibility Practice Quiz',
        status: 'Ready',
        forLesson: 'Accessibility Notes',
        questions: 5,
      },
    ],
    assignments: [
      {
        id: 'a4',
        kind: 'assignment',
        title: 'Draft an AI Workflow Plan',
        status: 'Ready',
        dueDate: 'Jun 5',
        submission: 'File or link upload',
      },
      {
        id: 'a5',
        kind: 'assignment',
        title: 'Accessibility Audit Checklist',
        status: 'Ready',
        dueDate: 'Jun 8',
        submission: 'File or link upload',
      },
    ],
  },
];
