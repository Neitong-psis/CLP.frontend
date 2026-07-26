import type { CourseInfo, CourseModule } from './types';

const PREFIX = 'qb_course_draft_content_';

export interface DraftContent {
  info: CourseInfo;
  modules: CourseModule[];
}

export function loadDraftContent(id: string): DraftContent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PREFIX + id);
    if (!raw) return null;
    return JSON.parse(raw) as DraftContent;
  } catch {
    return null;
  }
}

export function saveDraftContent(id: string, content: DraftContent): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFIX + id, JSON.stringify(content));
  } catch {}
}
