// Content model for the admin course-review experience.
//
// A pending course is reviewed module-by-module before it can be approved.
// Each module groups four kinds of items (documents, videos, quizzes,
// assignments) which the admin previews exactly as a learner would.

export type ReviewItemStatus = 'Ready' | 'Submitted' | 'Locked';

export type ReviewItemKind = 'document' | 'video' | 'quiz' | 'assignment';

interface BaseReviewItem {
  id: string;
  title: string;
}

export interface DocumentItem extends BaseReviewItem {
  kind: 'document';
  status: ReviewItemStatus;
  readingLabel: string;
  intro: string;
  body: string[];
  keyTakeaway: string;
  duration: string;
  linkedQuiz: string;
  resources: string[];
}

export interface VideoItem extends BaseReviewItem {
  kind: 'video';
  intro: string;
  caption: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: string[];
}

export interface QuizItem extends BaseReviewItem {
  kind: 'quiz';
  status: ReviewItemStatus;
  forLesson: string;
  minutes: number;
  questions: QuizQuestion[];
}

export interface AssignmentItem extends BaseReviewItem {
  kind: 'assignment';
  status: ReviewItemStatus;
  assignedAfter: string;
  lessonTitle: string;
  dueDate: string;
  submission: string;
  instructions: string;
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

export const REVIEW_STATUS_STYLE: Record<ReviewItemStatus, string> = {
  Ready: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Submitted: 'border border-blue-200 bg-blue-50 text-blue-600',
  Locked: 'border border-slate-200 bg-slate-100 text-slate-500',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Lessons the educator authored (documents + videos), used for module labels. */
export function lessonCount(module: ReviewModule): number {
  return module.documents.length + module.videos.length;
}

/** Every previewable item, flattened in the order it appears in the sidebar. */
export function flattenItems(modules: ReviewModule[]): ReviewItem[] {
  return modules.flatMap((m) => [
    ...m.documents,
    ...m.videos,
    ...m.quizzes,
    ...m.assignments,
  ]);
}

// ── Mock content ─────────────────────────────────────────────────────────────
// Stand-in for the educator's submitted syllabus. Mirrors the structure the
// learner experience renders so the admin reviews the real learner view.

export const COURSE_REVIEW_MODULES: ReviewModule[] = [
  {
    id: 'm1',
    title: 'Module 1: Web Foundations',
    documents: [
      {
        id: 'd1',
        kind: 'document',
        title: 'Responsive Design Guide',
        status: 'Ready',
        readingLabel: 'Reading 3 · 8 min read',
        intro:
          'A concise reading guide for mobile-first layouts, breakpoints, and readable content blocks.',
        body: [
          'Start by scanning the key idea, then read each section carefully. This lesson focuses on practical habits learners can apply immediately inside their course work.',
          'A good learning document should give context first, examples second, and a simple action at the end. For this topic, pay attention to the structure, the definitions, and the short examples that connect the concept to real projects.',
          'When reading, slow down at each heading and ask what changed from the previous idea. This keeps the lesson active.',
        ],
        keyTakeaway:
          'Finish the reading before opening the quiz. The quiz checks whether the lesson concept is clear enough to use without guessing.',
        duration: '8 min read',
        linkedQuiz: 'Responsive Design Quiz',
        resources: ['Breakpoint notes', 'Layout worksheet'],
      },
    ],
    videos: [
      {
        id: 'v1',
        kind: 'video',
        title: 'HTML Introduction',
        intro:
          'Meet the building blocks of every page: elements, tags, and document structure.',
        caption: 'Preview from the start.',
      },
      {
        id: 'v2',
        kind: 'video',
        title: 'CSS Layout Basics',
        intro:
          'Position content with the box model, flexbox, and a few reliable layout patterns.',
        caption: 'Preview from the start.',
      },
    ],
    quizzes: [
      {
        id: 'q1',
        kind: 'quiz',
        title: 'HTML Basics Quiz',
        status: 'Ready',
        forLesson: 'HTML Introduction',
        minutes: 15,
        questions: [
          {
            id: 'q1-1',
            prompt: 'What is HTML?',
            choices: [
              'Programming Language',
              'Database',
              'Markup Language',
              'Operating System',
            ],
          },
          {
            id: 'q1-2',
            prompt: 'Which tag defines the largest heading?',
            choices: ['<h6>', '<head>', '<h1>', '<heading>'],
          },
          {
            id: 'q1-3',
            prompt: 'Which element wraps the main page content?',
            choices: ['<main>', '<section>', '<div>', '<body>'],
          },
          {
            id: 'q1-4',
            prompt: 'What does a self-closing tag look like?',
            choices: ['<br>', '<br></br>', '</br>', '<br/ >'],
          },
        ],
      },
      {
        id: 'q2',
        kind: 'quiz',
        title: 'CSS Layout Quiz',
        status: 'Ready',
        forLesson: 'CSS Layout Basics',
        minutes: 10,
        questions: [
          {
            id: 'q2-1',
            prompt: 'Which property enables a flex container?',
            choices: [
              'display: flex',
              'position: flex',
              'float: flex',
              'layout: flex',
            ],
          },
          {
            id: 'q2-2',
            prompt: 'What does `justify-content` control?',
            choices: [
              'Main-axis alignment',
              'Cross-axis alignment',
              'Element opacity',
              'Font weight',
            ],
          },
        ],
      },
      {
        id: 'q3',
        kind: 'quiz',
        title: 'Responsive Design Quiz',
        status: 'Ready',
        forLesson: 'Responsive Design Guide',
        minutes: 10,
        questions: [
          {
            id: 'q3-1',
            prompt: 'A breakpoint is best described as…',
            choices: [
              'A width where the layout adapts',
              'A broken CSS rule',
              'A JavaScript error',
              'A type of image',
            ],
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'a1',
        kind: 'assignment',
        title: 'Create a Semantic Page Outline',
        status: 'Ready',
        assignedAfter: 'HTML Introduction',
        lessonTitle: 'HTML Introduction',
        dueDate: 'May 28',
        submission: 'File or link upload',
        instructions:
          'Submit a labelled HTML page structure using header, main, section, and footer elements.',
      },
      {
        id: 'a2',
        kind: 'assignment',
        title: 'Rebuild a Responsive Layout',
        status: 'Submitted',
        assignedAfter: 'CSS Layout Basics',
        lessonTitle: 'CSS Layout Basics',
        dueDate: 'May 30',
        submission: 'File or link upload',
        instructions:
          'Recreate the provided desktop layout so it adapts cleanly at mobile and tablet breakpoints.',
      },
      {
        id: 'a3',
        kind: 'assignment',
        title: 'Responsive Reading Reflection',
        status: 'Ready',
        assignedAfter: 'Responsive Design Guide',
        lessonTitle: 'Responsive Design Guide',
        dueDate: 'Jun 2',
        submission: 'Text response',
        instructions:
          'Summarise three habits from the reading and explain where you would apply each one.',
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
        status: 'Locked',
        readingLabel: 'Reading 4 · 6 min read',
        intro:
          'Quick reference for contrast, focus order, and labelling interactive elements.',
        body: [
          'Accessibility is easier when it is part of the first draft. Start with semantic structure, then layer in labels and visible focus states.',
          'Check colour contrast early and confirm that every interactive element can be reached and operated with the keyboard alone.',
        ],
        keyTakeaway:
          'Ship the keyboard path first. If it works without a mouse, most other fixes become small adjustments.',
        duration: '6 min read',
        linkedQuiz: 'Accessibility Practice Quiz',
        resources: ['Contrast checklist', 'ARIA quick guide'],
      },
    ],
    videos: [
      {
        id: 'v3',
        kind: 'video',
        title: 'Smart Office Workflow',
        intro:
          'Use AI tools to organize office tasks, summarize notes, and create faster daily workflows.',
        caption: 'Continue from saved progress.',
      },
    ],
    quizzes: [
      {
        id: 'q4',
        kind: 'quiz',
        title: 'Smart Office Workflow Quiz',
        status: 'Locked',
        forLesson: 'Smart Office Workflow',
        minutes: 12,
        questions: [
          {
            id: 'q4-1',
            prompt: 'A good workflow prompt should be…',
            choices: [
              'Specific and outcome-focused',
              'As long as possible',
              'Free of any context',
              'Written in all caps',
            ],
          },
        ],
      },
      {
        id: 'q5',
        kind: 'quiz',
        title: 'Accessibility Practice Quiz',
        status: 'Locked',
        forLesson: 'Accessibility Notes',
        minutes: 8,
        questions: [
          {
            id: 'q5-1',
            prompt: 'Which signals an accessible interactive control?',
            choices: [
              'A visible focus state',
              'A hidden outline',
              'Low contrast text',
              'Mouse-only access',
            ],
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'a4',
        kind: 'assignment',
        title: 'Draft an AI Workflow Plan',
        status: 'Locked',
        assignedAfter: 'Smart Office Workflow',
        lessonTitle: 'Smart Office Workflow',
        dueDate: 'Jun 5',
        submission: 'File or link upload',
        instructions:
          'Map one weekly task into a three-step AI-assisted workflow and note where a human reviews the result.',
      },
      {
        id: 'a5',
        kind: 'assignment',
        title: 'Accessibility Audit Checklist',
        status: 'Locked',
        assignedAfter: 'Accessibility Notes',
        lessonTitle: 'Accessibility Notes',
        dueDate: 'Jun 8',
        submission: 'File or link upload',
        instructions:
          'Run the contrast and keyboard checklist against your project and record every issue you find.',
      },
    ],
  },
];
