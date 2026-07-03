import type { ContentSection, CourseInfo, Lesson, CourseModule } from './types';

let _seq = 0;
export const uid = () => String(++_seq);

export function makeSection(type: ContentSection['type']): ContentSection {
  return {
    id: uid(),
    type,
    text: '',
    imageUrl: '',
    videoTitle: '',
    videoUrl: '',
    question: '',
    answerFormat: 'single',
    options: ['A', 'B', 'C', 'D'].map(() => ({
      id: uid(),
      text: '',
      correct: false,
    })),
    assignmentDesc: '',
    dueDate: '',
    submissionType: '',
  };
}

export function makeLesson(index: number): Lesson {
  return { id: uid(), title: `Lesson ${index}`, expanded: true, sections: [] };
}

export function makeModule(index: number): CourseModule {
  return { id: uid(), title: `Module ${index}`, expanded: true, lessons: [] };
}

export function priceLabel(info: CourseInfo): string {
  if (info.pricingType === 'free') return 'Free';
  return info.price ? `$${info.price}` : '—';
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
