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

/** Swap an item with its neighbor; returns the same array if the move is out of range. */
export function moveItem<T>(arr: T[], index: number, dir: 'up' | 'down'): T[] {
  const target = dir === 'up' ? index - 1 : index + 1;
  if (target < 0 || target >= arr.length) return arr;
  const next = [...arr];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
