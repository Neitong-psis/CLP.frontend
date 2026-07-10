import type { Course, ContentItem, ContentItemType, Lesson } from './types';

/**
 * Demo fixture. Also the fixture the unit tests read, so every state the
 * sidebar can render appears at least once below — including a lesson that
 * bundles more than one content item (Module 1 / "Responsive Design", which
 * pairs a reading with its quiz under one lesson caption).
 */

function itemProgress(type: ContentItemType, completed: number, total: number) {
  return type === 'video' || type === 'document'
    ? ({
        kind: 'percent',
        value: Math.round((completed / total) * 100),
      } as const)
    : ({ kind: 'ratio', completed, total } as const);
}

export const MOCK_COURSE: Course = {
  id: 'course-web-foundations',
  title: 'Modern Web Foundations',
  modules: [
    {
      id: 'module-1',
      title: 'Web Foundations',
      lessons: [
        {
          // A lesson that bundles two items — the reading and its quiz share
          // one lesson caption, exactly the case a flat item list would erase.
          id: 'lesson-responsive-design',
          title: 'Responsive Design',
          items: [
            {
              id: 'item-responsive-guide',
              title: 'Responsive Design Guide',
              type: 'document',
              durationMinutes: 10,
              completed: true,
            },
            {
              id: 'item-responsive-quiz',
              title: 'Responsive Design Quiz',
              type: 'quiz',
              durationMinutes: 8,
              completed: true,
            },
          ],
        },
        {
          id: 'lesson-responsive-reflection',
          title: 'Responsive Reading Reflection',
          items: [
            {
              id: 'item-responsive-reflection',
              title: 'Responsive Reading Reflection',
              type: 'assignment',
              durationMinutes: 20,
              progress: itemProgress('assignment', 2, 5),
            },
          ],
        },
      ],
    },
    {
      id: 'module-2',
      title: 'HTML & Semantics',
      lessons: [
        {
          id: 'lesson-html-intro',
          title: 'HTML Introduction',
          items: [
            {
              id: 'item-html-intro',
              title: 'HTML Introduction',
              type: 'video',
              durationMinutes: 14,
              completed: true,
            },
          ],
        },
        {
          id: 'lesson-semantic-elements',
          title: 'Semantic Elements in Practice',
          items: [
            {
              // The current item, mid-watch: renders the blue rail plus "60%".
              id: 'item-semantic-elements',
              title: 'Semantic Elements in Practice',
              type: 'video',
              durationMinutes: 18,
              progress: itemProgress('video', 3, 5),
            },
          ],
        },
        {
          id: 'lesson-forms-a11y',
          title: 'Accessible Forms',
          items: [
            {
              id: 'item-forms-a11y',
              title: 'Accessible Forms',
              type: 'document',
              durationMinutes: 22,
            },
          ],
        },
        {
          id: 'lesson-html-project',
          title: 'Semantic Landing Page',
          items: [
            {
              id: 'item-html-assignment',
              title: 'Build a Semantic Landing Page',
              type: 'assignment',
              durationMinutes: 60,
            },
          ],
        },
      ],
    },
    {
      id: 'module-3',
      title: 'CSS Layout Basics',
      locked: true,
      lessons: [
        {
          id: 'lesson-flexbox',
          title: 'Flexbox',
          locked: true,
          items: [
            {
              id: 'item-flexbox',
              title: 'Flexbox Deep Dive',
              type: 'video',
              durationMinutes: 26,
            },
          ],
        },
        {
          id: 'lesson-grid',
          title: 'CSS Grid',
          locked: true,
          items: [
            {
              id: 'item-grid',
              title: 'CSS Grid Fundamentals',
              type: 'video',
              durationMinutes: 31,
            },
            {
              id: 'item-layout-quiz',
              title: 'Layout Systems Quiz',
              type: 'quiz',
              durationMinutes: 12,
            },
          ],
        },
      ],
    },
    {
      id: 'module-4',
      title: 'Capstone Project',
      disabled: true,
      lessons: [
        {
          id: 'lesson-capstone-brief',
          title: 'Project Brief',
          locked: true,
          items: [
            {
              id: 'item-capstone-brief',
              title: 'Project Brief',
              type: 'document',
              durationMinutes: 15,
            },
          ],
        },
      ],
    },
  ],
};

/** Where the mock player is parked. */
export const MOCK_CURRENT_ITEM_ID = 'item-semantic-elements';

/**
 * A module large enough to cross `VIRTUALIZE_THRESHOLD`, for exercising the
 * windowed list. Every third lesson bundles two items, so the fixture also
 * exercises variable-height virtualization rather than only the uniform case.
 */
export function makeLargeCourse(lessonCount = 200): Course {
  const types: ContentItemType[] = ['video', 'document', 'quiz', 'assignment'];

  const lessons: Lesson[] = Array.from({ length: lessonCount }, (_, i) => {
    const type = types[i % types.length]!;
    const primary: ContentItem = {
      id: `bulk-item-${i}-a`,
      title: `${LESSON_TITLES[i % LESSON_TITLES.length]} ${Math.floor(i / LESSON_TITLES.length) + 1}`,
      type,
      durationMinutes: 5 + (i % 25),
      completed: i < 40,
    };

    const bundlesQuiz = i % 3 === 0 && type !== 'quiz';
    const items = bundlesQuiz
      ? [
          primary,
          {
            id: `bulk-item-${i}-b`,
            title: `${primary.title} Quiz`,
            type: 'quiz' as const,
            durationMinutes: 6,
            completed: i < 40,
          },
        ]
      : [primary];

    return { id: `bulk-lesson-${i}`, title: primary.title, items };
  });

  return {
    id: 'course-bulk',
    title: 'Full-Stack Engineering Certificate',
    modules: [{ id: 'bulk-module', title: 'Everything, At Once', lessons }],
  };
}

const LESSON_TITLES = [
  'Rendering Pipelines',
  'State Management',
  'Data Fetching',
  'Caching Strategies',
  'Error Boundaries',
  'Accessibility Audits',
  'Performance Budgets',
  'Bundle Analysis',
] as const;
