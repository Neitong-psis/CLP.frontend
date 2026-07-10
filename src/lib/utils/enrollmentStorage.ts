const LS_ENROLLED = 'qb_enrolled_courses';

export function readEnrolledIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_ENROLLED) ?? '[]') as string[];
  } catch {
    return [];
  }
}

export function addEnrolledId(id: string): string[] {
  const list = readEnrolledIds();
  if (list.includes(id)) return list;
  const next = [...list, id];
  localStorage.setItem(LS_ENROLLED, JSON.stringify(next));
  return next;
}
