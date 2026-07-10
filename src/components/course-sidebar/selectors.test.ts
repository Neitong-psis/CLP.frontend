import { describe, expect, it } from 'vitest';
import { MOCK_COURSE, MOCK_CURRENT_ITEM_ID } from './mock-data';
import {
  buildModuleIndex,
  courseProgress,
  findItemLocation,
  formatDuration,
  formatItemProgress,
  itemDetail,
  itemMeta,
  itemProgressFraction,
  itemState,
  lessonProgress,
  lessonRowHeight,
  moduleProgress,
  moduleState,
} from './selectors';
import type {
  ContentItem,
  CourseModule,
  CourseSidebarLabels,
  Lesson,
} from './types';

const LABELS: CourseSidebarLabels = {
  courseContent: 'Course content',
  overallProgress: 'Overall progress',
  moduleLabel: (i) => `Module ${i + 1}`,
  moduleCompleted: (done, total) => `${done} of ${total} completed`,
  modulePercent: (percent) => `${percent}% complete`,
  lockedModule: 'Locked module',
  lockedLesson: 'Locked lesson',
  disabledModule: 'Not published',
  collapse: 'Collapse',
  expand: 'Expand',
  closeDrawer: 'Close',
  openDrawer: 'Open',
  itemTypes: {
    document: 'Reading',
    video: 'Video',
    quiz: 'Quiz',
    assignment: 'Assignment',
  },
  minutesShort: (m) => `${m} min`,
};

const item = (over: Partial<ContentItem> = {}): ContentItem => ({
  id: 'i1',
  title: 'Item',
  type: 'document',
  ...over,
});

const lesson = (over: Partial<Lesson> = {}): Lesson => ({
  id: 'l1',
  title: 'Lesson',
  items: [item()],
  ...over,
});

const mod = (over: Partial<CourseModule> = {}): CourseModule => ({
  id: 'm1',
  title: 'Module',
  lessons: [lesson()],
  ...over,
});

describe('lessonProgress', () => {
  it('reports 0% for an empty lesson instead of NaN', () => {
    expect(lessonProgress(lesson({ items: [] }))).toEqual({
      completed: 0,
      total: 0,
      percent: 0,
    });
  });

  it('rounds the percentage across a lesson bundling multiple items', () => {
    const l = lesson({
      items: [
        item({ id: 'a', completed: true }),
        item({ id: 'b', completed: true }),
        item({ id: 'c' }),
      ],
    });
    expect(lessonProgress(l)).toEqual({ completed: 2, total: 3, percent: 67 });
  });
});

describe('moduleProgress', () => {
  it('rolls up across every lesson’s items, not just lesson count', () => {
    // module-1 has 2 lessons totalling 3 items, 2 completed.
    const m1 = MOCK_COURSE.modules.find((m) => m.id === 'module-1')!;
    expect(moduleProgress(m1)).toEqual({ completed: 2, total: 3, percent: 67 });
  });

  it('reports 0% for a module with no items', () => {
    expect(moduleProgress(mod({ lessons: [] }))).toEqual({
      completed: 0,
      total: 0,
      percent: 0,
    });
  });
});

describe('itemState precedence', () => {
  it('ranks a locked lesson above everything for its items', () => {
    const i = item({ id: 'x', completed: true });
    expect(itemState(i, true, 'x')).toBe('locked');
  });

  it('ranks completed above current', () => {
    const i = item({ id: 'x', completed: true });
    expect(itemState(i, false, 'x')).toBe('completed');
  });

  it('ranks current above in-progress', () => {
    const i = item({ id: 'x', progress: { kind: 'percent', value: 40 } });
    expect(itemState(i, false, 'x')).toBe('current');
  });

  it('treats zero progress as not-started', () => {
    const i = item({
      id: 'x',
      progress: { kind: 'ratio', completed: 0, total: 5 },
    });
    expect(itemState(i, false, null)).toBe('not-started');
  });
});

describe('moduleState', () => {
  it('ranks disabled above locked', () => {
    const m = mod({ disabled: true, locked: true });
    expect(moduleState(m, moduleProgress(m), false)).toBe('disabled');
  });

  it('prefers active over completed so you-are-here survives a rewatch', () => {
    const m = mod({
      lessons: [lesson({ items: [item({ completed: true })] })],
    });
    expect(moduleState(m, moduleProgress(m), true)).toBe('active');
    expect(moduleState(m, moduleProgress(m), false)).toBe('completed');
  });
});

describe('buildModuleIndex', () => {
  it('rolls progress up across every lesson in the module', () => {
    const meta = buildModuleIndex(MOCK_COURSE, null).get('module-1');
    expect(meta?.progress).toEqual({ completed: 2, total: 3, percent: 67 });
  });

  it('keeps module numbering stable', () => {
    const index = buildModuleIndex(MOCK_COURSE, null);
    expect(index.get('module-3')?.index).toBe(2);
  });

  it('marks the module containing the current item as active', () => {
    const meta = buildModuleIndex(MOCK_COURSE, MOCK_CURRENT_ITEM_ID).get(
      'module-2',
    );
    expect(meta?.state).toBe('active');
  });
});

describe('findItemLocation', () => {
  it('finds an item nested two levels deep and reports its lesson + module', () => {
    const location = findItemLocation(MOCK_COURSE, 'item-responsive-quiz');
    expect(location?.lesson.id).toBe('lesson-responsive-design');
    expect(location?.module.id).toBe('module-1');
    expect(location?.moduleIndex).toBe(0);
  });

  it('returns null for an unknown id', () => {
    expect(findItemLocation(MOCK_COURSE, 'does-not-exist')).toBeNull();
  });
});

describe('itemMeta / itemDetail', () => {
  it('renders "type · duration" for an unlocked item', () => {
    const l = lesson();
    const i = item({ type: 'video', durationMinutes: 95 });
    expect(itemMeta(i, l, LABELS)).toBe('Video · 1h 35m');
  });

  it('renders just the type when there is no duration or detail', () => {
    const l = lesson();
    const i = item({ type: 'quiz' });
    expect(itemMeta(i, l, LABELS)).toBe('Quiz');
  });

  it('falls back to the lesson’s lock reason, ignoring the item entirely', () => {
    const l = lesson({ locked: true, lockedHint: 'Complete X to unlock' });
    const i = item({ type: 'video', durationMinutes: 10 });
    expect(itemMeta(i, l, LABELS)).toBe('Complete X to unlock');
  });

  it('uses the generic locked label when a lesson has no specific hint', () => {
    const l = lesson({ locked: true });
    expect(itemMeta(item(), l, LABELS)).toBe('Locked lesson');
  });

  it('prefers an explicit detail over a computed duration', () => {
    const i = item({ detail: 'Pending', durationMinutes: 10 });
    expect(itemDetail(i, LABELS)).toBe('Pending');
  });
});

describe('formatItemProgress', () => {
  it('renders a ratio for graded work', () => {
    const i = item({ progress: { kind: 'ratio', completed: 2, total: 5 } });
    expect(formatItemProgress(i, false)).toBe('2/5');
  });

  it('renders a percentage for watched media', () => {
    const i = item({ progress: { kind: 'percent', value: 60 } });
    expect(formatItemProgress(i, false)).toBe('60%');
  });

  it('shows nothing once completed or while the parent lesson is locked', () => {
    const done = item({
      completed: true,
      progress: { kind: 'percent', value: 60 },
    });
    const gated = item({ progress: { kind: 'percent', value: 60 } });
    expect(formatItemProgress(done, false)).toBeNull();
    expect(formatItemProgress(gated, true)).toBeNull();
  });
});

describe('itemProgressFraction', () => {
  it('clamps to 0-1', () => {
    expect(
      itemProgressFraction(item({ progress: { kind: 'percent', value: 150 } })),
    ).toBe(1);
    expect(
      itemProgressFraction(
        item({ progress: { kind: 'ratio', completed: 9, total: 3 } }),
      ),
    ).toBe(1);
  });
});

describe('formatDuration', () => {
  const short = (m: number) => `${m} min`;
  it.each([
    [50, '50 min'],
    [60, '1h'],
    [95, '1h 35m'],
  ])('formats %i minutes as %s', (minutes, expected) => {
    expect(formatDuration(minutes, short)).toBe(expected);
  });
});

describe('lessonRowHeight', () => {
  it('is deterministic from item count, single-item lesson', () => {
    expect(lessonRowHeight(lesson({ items: [item()] }))).toBe(52);
  });

  it('adds the group header once a lesson bundles more than one item', () => {
    const l = lesson({ items: [item({ id: 'a' }), item({ id: 'b' })] });
    expect(lessonRowHeight(l)).toBe(26 + 52 * 2);
  });
});

describe('courseProgress', () => {
  it('counts across every module, including locked and disabled ones', () => {
    const total = MOCK_COURSE.modules.flatMap((m) =>
      m.lessons.flatMap((l) => l.items),
    ).length;
    expect(total).toBe(11);
    expect(courseProgress(MOCK_COURSE)).toEqual({
      completed: 3,
      total: 11,
      percent: 27,
    });
  });
});
