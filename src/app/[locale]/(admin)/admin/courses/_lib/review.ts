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
    title: 'Module 1: Innovative Learning Foundations',
    documents: [
      {
        id: 'd1',
        kind: 'document',
        title: 'Lesson Design Fundamentals',
        status: 'Ready',
        readingLabel: 'Reading 3 · 8 min read',
        intro:
          'A concise reading guide for backward design, pacing, and clear learning objectives.',
        body: [
          'Start by scanning the key idea, then read each section carefully. This lesson focuses on practical habits educators can apply immediately inside their own lesson plans.',
          'A good lesson-design document should give context first, examples second, and a simple action at the end. For this topic, pay attention to the structure, the definitions, and the short examples that connect the concept to a real classroom.',
          'When reading, slow down at each heading and ask what changed from the previous idea. This keeps the lesson active.',
        ],
        keyTakeaway:
          'Finish the reading before opening the quiz. The quiz checks whether the lesson concept is clear enough to use without guessing.',
        duration: '8 min read',
        linkedQuiz: 'Lesson Design Quiz',
        resources: ['Objective-writing notes', 'Pacing worksheet'],
      },
    ],
    videos: [
      {
        id: 'v1',
        kind: 'video',
        title: 'Learner Engagement Basics',
        intro:
          'Meet the building blocks of every engaging lesson: hooks, questions, and participation structures.',
        caption: 'Preview from the start.',
      },
      {
        id: 'v2',
        kind: 'video',
        title: 'Structuring an Active Lesson',
        intro:
          'Sequence a lesson with a clear arc, active-learning techniques, and a few reliable pacing patterns.',
        caption: 'Preview from the start.',
      },
    ],
    quizzes: [
      {
        id: 'q1',
        kind: 'quiz',
        title: 'Learner Engagement Quiz',
        status: 'Ready',
        forLesson: 'Learner Engagement Basics',
        minutes: 15,
        questions: [
          {
            id: 'q1-1',
            prompt: 'What is a lesson hook?',
            choices: [
              'A grading tool',
              'A seating chart',
              'An opening moment that captures learner curiosity',
              'A homework tracker',
            ],
          },
          {
            id: 'q1-2',
            prompt:
              'Which participation structure has learners think alone, then share with a partner?',
            choices: [
              'Think-pair-share',
              'Cold-call',
              'Silent reading',
              'Lecture',
            ],
          },
          {
            id: 'q1-3',
            prompt: 'What is the purpose of a closing recap?',
            choices: [
              'To reinforce the lesson objective',
              'To assign extra homework',
              'To start a new topic',
              'To take attendance',
            ],
          },
          {
            id: 'q1-4',
            prompt:
              'Which structure gives every learner a planned chance to respond?',
            choices: [
              'Cold-call (equitable, planned)',
              'Free-for-all discussion',
              'Silent independent work',
              'Optional Q&A',
            ],
          },
        ],
      },
      {
        id: 'q2',
        kind: 'quiz',
        title: 'Active Lesson Design Quiz',
        status: 'Ready',
        forLesson: 'Structuring an Active Lesson',
        minutes: 10,
        questions: [
          {
            id: 'q2-1',
            prompt: 'Which sequence best describes a lesson arc?',
            choices: [
              'Opening hook, guided practice, independent practice, closing',
              'Independent practice, then hook',
              'Assessment, then lesson',
              'Closing, then opening',
            ],
          },
          {
            id: 'q2-2',
            prompt: 'What does gradual release of responsibility describe?',
            choices: [
              'Model, support, then independent work',
              'Independent work from the start',
              'No teacher involvement',
              'Grading by peers only',
            ],
          },
        ],
      },
      {
        id: 'q3',
        kind: 'quiz',
        title: 'Lesson Design Quiz',
        status: 'Ready',
        forLesson: 'Lesson Design Fundamentals',
        minutes: 10,
        questions: [
          {
            id: 'q3-1',
            prompt: 'A learning objective is best described as…',
            choices: [
              'A statement of what learners can do by lesson end',
              'A grading rubric category',
              'A classroom seating chart',
              'A textbook chapter title',
            ],
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'a1',
        kind: 'assignment',
        title: 'Design a Lesson Opening Outline',
        status: 'Ready',
        assignedAfter: 'Learner Engagement Basics',
        lessonTitle: 'Learner Engagement Basics',
        dueDate: 'May 28',
        submission: 'File or link upload',
        instructions:
          'Submit a short lesson opening outline that includes a hook, a stated objective, and one participation structure.',
      },
      {
        id: 'a2',
        kind: 'assignment',
        title: 'Redesign a Lesson Sequence',
        status: 'Submitted',
        assignedAfter: 'Structuring an Active Lesson',
        lessonTitle: 'Structuring an Active Lesson',
        dueDate: 'May 30',
        submission: 'File or link upload',
        instructions:
          'Recreate the provided lecture-only lesson plan so it includes guided practice, independent practice, and a closing recap.',
      },
      {
        id: 'a3',
        kind: 'assignment',
        title: 'Lesson Design Reflection',
        status: 'Ready',
        assignedAfter: 'Lesson Design Fundamentals',
        lessonTitle: 'Lesson Design Fundamentals',
        dueDate: 'Jun 2',
        submission: 'Text response',
        instructions:
          'Summarise three habits from the reading and explain where you would apply each one in a lesson you are planning.',
      },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Applied Innovative Learning',
    documents: [
      {
        id: 'd2',
        kind: 'document',
        title: 'Inclusive Classroom Practices',
        status: 'Locked',
        readingLabel: 'Reading 4 · 6 min read',
        intro:
          'Quick reference for UDL principles, participation access, and clear instructions for every learner.',
        body: [
          'Inclusion is easier when it is part of the first draft of a lesson. Start with multiple channels for content, then layer in clear instructions and accessible materials.',
          'Check that every activity offers at least two channels of access and confirm that every learner can participate without needing to request an accommodation.',
        ],
        keyTakeaway:
          'Design the accessible path first. If every learner can participate without asking, most other adjustments become small tweaks.',
        duration: '6 min read',
        linkedQuiz: 'Inclusive Practices Quiz',
        resources: ['UDL checklist', 'Accommodations quick guide'],
      },
    ],
    videos: [
      {
        id: 'v3',
        kind: 'video',
        title: 'Formative Assessment & Feedback Loops',
        intro:
          'Use quick-check techniques to see what learners understand, and close the loop with feedback that changes the next lesson.',
        caption: 'Continue from saved progress.',
      },
    ],
    quizzes: [
      {
        id: 'q4',
        kind: 'quiz',
        title: 'Formative Assessment Quiz',
        status: 'Locked',
        forLesson: 'Formative Assessment & Feedback Loops',
        minutes: 12,
        questions: [
          {
            id: 'q4-1',
            prompt: 'A good formative-check question should be…',
            choices: [
              'Specific and quick to answer',
              'As long as possible',
              'Free of any context',
              'Worth a final grade',
            ],
          },
        ],
      },
      {
        id: 'q5',
        kind: 'quiz',
        title: 'Inclusive Practices Quiz',
        status: 'Locked',
        forLesson: 'Inclusive Classroom Practices',
        minutes: 8,
        questions: [
          {
            id: 'q5-1',
            prompt: 'Which signals an inclusive classroom activity?',
            choices: [
              'Content offered through more than one channel',
              'A single required format',
              'Instructions given only once',
              'Access limited to one accommodation request',
            ],
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'a4',
        kind: 'assignment',
        title: 'Design a Feedback Loop',
        status: 'Locked',
        assignedAfter: 'Formative Assessment & Feedback Loops',
        lessonTitle: 'Formative Assessment & Feedback Loops',
        dueDate: 'Jun 5',
        submission: 'File or link upload',
        instructions:
          'Map one weekly lesson concept into a three-step formative-check routine and note how results would change the next lesson.',
      },
      {
        id: 'a5',
        kind: 'assignment',
        title: 'Inclusion Audit Checklist',
        status: 'Locked',
        assignedAfter: 'Inclusive Classroom Practices',
        lessonTitle: 'Inclusive Classroom Practices',
        dueDate: 'Jun 8',
        submission: 'File or link upload',
        instructions:
          'Run the UDL and access checklist against your lesson plan and record every gap you find.',
      },
    ],
  },
];
