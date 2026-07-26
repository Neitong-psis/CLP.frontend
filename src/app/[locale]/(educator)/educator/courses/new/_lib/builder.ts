import type {
  ContentSection,
  CourseInfo,
  Lesson,
  CourseModule,
  QuizOption,
  QuizQuestion,
} from './types';

let _seq = 0;
export const uid = () => String(++_seq);

export function makeQuizQuestion(): QuizQuestion {
  return {
    id: uid(),
    question: '',
    options: ['A', 'B', 'C', 'D'].map(() => ({
      id: uid(),
      text: '',
      correct: false,
    })),
  };
}

export function makeSection(type: ContentSection['type']): ContentSection {
  return {
    id: uid(),
    type,
    text: '',
    imageUrl: '',
    videoTitle: '',
    videoUrl: '',
    videoFileName: '',
    videoDescription: '',
    quizQuestions: type === 'quiz' ? [makeQuizQuestion()] : [],
    assignmentDesc: '',
    dueDate: '',
    submissionType: '',
  };
}

/** Single correct answer → single choice; more than one → multiple choice.
 *  No manual toggle — the format is inferred from what the educator marked. */
export function deriveAnswerFormat(
  options: QuizOption[],
): 'single' | 'multiple' | undefined {
  const correctCount = options.filter((o) => o.correct).length;
  if (correctCount === 0) return undefined;
  return correctCount > 1 ? 'multiple' : 'single';
}

export function makeLesson(index: number): Lesson {
  return { id: uid(), title: `Lesson ${index}`, expanded: true, sections: [] };
}

export function makeModule(index: number): CourseModule {
  return { id: uid(), title: `Module ${index}`, expanded: true, lessons: [] };
}

/** Groups a digit string into thousands with the given separator, e.g.
 *  `formatThousands('2222222', ',')` → `'2,222,222'`. Non-digits are stripped
 *  first, so it also doubles as a paste-safe sanitizer. */
export function formatThousands(value: string, separator: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function priceLabel(info: CourseInfo): string {
  if (info.pricingType === 'free') return 'Free';
  const formatted = info.price ? formatThousands(info.price, ',') : '0';
  return info.currency === 'KHR' ? `${formatted} KHR` : `$${formatted}`;
}

/** A text lesson with its intro paragraph pre-filled — used to seed draft content. */
function draftLesson(title: string, text: string): Lesson {
  const section = makeSection('text');
  section.text = text;
  return { id: uid(), title, expanded: true, sections: [section] };
}

/**
 * Rehydrate an "In Writing" draft into the wizard: map the task's headline fields
 * onto the info form and seed a couple of starter modules so the content step
 * opens with work already in progress instead of a blank canvas.
 */
export function makeDraftFromTask(task: {
  title: string;
  description: string;
  category: string;
  price: string;
}): { info: CourseInfo; modules: CourseModule[] } {
  const isFree = task.price.trim().toLowerCase() === 'free';
  const info: CourseInfo = {
    title: task.title,
    subtitle: task.description,
    description: task.description,
    category: task.category,
    level: 'Beginner',
    pricingType: isFree ? 'free' : 'paid',
    price: isFree ? '' : task.price.replace(/[^0-9.]/g, ''),
    currency: 'USD',
    promoCode: '',
    thumbnail: '',
  };

  const modules: CourseModule[] = [
    {
      id: uid(),
      title: 'Getting Started',
      expanded: true,
      lessons: [
        draftLesson(
          'Course Introduction',
          'Welcome to the course. This lesson introduces the goals, the structure, and what you will be able to do by the end.',
        ),
        draftLesson(
          'What You Will Need',
          'A quick overview of prerequisites, tools, and how to get the most out of each module.',
        ),
      ],
    },
    {
      id: uid(),
      title: 'Core Concepts',
      expanded: true,
      lessons: [
        draftLesson(
          'Key Fundamentals',
          'We break down the core ideas step by step, with practical, real-world examples to anchor each concept.',
        ),
      ],
    },
  ];

  return { info, modules };
}

/** Swap an item with its neighbor; returns the same array if the move is out of range. */
export function moveItem<T>(arr: T[], index: number, dir: 'up' | 'down'): T[] {
  const target = dir === 'up' ? index - 1 : index + 1;
  if (target < 0 || target >= arr.length) return arr;
  const next = [...arr];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Inserts `item` immediately before/after the element with `anchorId`.
 *  Appends to the end if the anchor isn't found (e.g. an empty drop target). */
export function insertByAnchor<T extends { id: string }>(
  list: T[],
  item: T,
  anchorId: string,
  position: 'before' | 'after',
): T[] {
  const anchorIndex = list.findIndex((x) => x.id === anchorId);
  if (anchorIndex === -1) return [...list, item];
  const next = [...list];
  next.splice(position === 'before' ? anchorIndex : anchorIndex + 1, 0, item);
  return next;
}

/** Moves the element with `id` to sit immediately before/after `anchorId` within the same list. */
export function reorderByAnchor<T extends { id: string }>(
  list: T[],
  id: string,
  anchorId: string,
  position: 'before' | 'after',
): T[] {
  const item = list.find((x) => x.id === id);
  if (!item) return list;
  return insertByAnchor(
    list.filter((x) => x.id !== id),
    item,
    anchorId,
    position,
  );
}
