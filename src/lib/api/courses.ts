// Server-side (Docker): use internal service URL. Client-side: use public URL.
const BASE_URL =
  (typeof window === 'undefined' ? process.env.API_URL : undefined) ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3000/api';

export interface ApiCourse {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  thumbnail?: string | null;
  isPublished: boolean;
  slug?: string | null;
  subtitle?: string | null;
  level?: string | null;
  duration?: string | null;
  tags?: string[] | null;
  workStatus?: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  meta?: Record<string, unknown> | null;
}

export interface ApiLesson {
  id: string;
  title: string;
  type: 'video' | 'quiz';
  duration: string;
  videoId?: string;
}

export interface ApiSection {
  id: string;
  title: string;
  lessons: ApiLesson[];
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ApiEducator {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export interface CreateCoursePayload {
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  slug?: string;
  subtitle?: string;
  level?: string;
  duration?: string;
  tags?: string[];
  status?: string;
  categoryId?: string;
  instructorId?: string;
}

export interface SyncCurriculumPayload {
  modules: Array<{
    id?: string;
    title: string;
    lessons: Array<{
      id?: string;
      title: string;
      sections: Array<{
        type: string;
        text?: string;
        videoTitle?: string;
        videoUrl?: string;
        question?: string;
        answerFormat?: string;
        options?: Array<{ id: string; text: string; correct: boolean }>;
        assignmentDesc?: string;
        dueDate?: string;
        submissionType?: string;
      }>;
    }>;
  }>;
}

export async function fetchPublishedCourses(limit = 20): Promise<ApiCourse[]> {
  try {
    const res = await fetch(`${BASE_URL}/v1/courses?page=1&limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const body: { data: ApiCourse[] } = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

export async function fetchCourse(id: string): Promise<ApiCourse | null> {
  try {
    const res = await fetch(`${BASE_URL}/v1/courses/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchCourseContent(id: string): Promise<ApiSection[]> {
  try {
    const res = await fetch(`${BASE_URL}/v1/courses/${id}/content`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function uploadThumbnail(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE_URL}/v1/files`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to upload thumbnail');
  const data: { file: { path: string } } = await res.json();
  return data.file.path;
}

export async function createCourse(
  payload: CreateCoursePayload,
): Promise<ApiCourse> {
  const res = await fetch(`${BASE_URL}/v1/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ?? 'Failed to create course',
    );
  }
  return res.json();
}

export async function syncCourseCurriculum(
  courseId: string,
  payload: SyncCurriculumPayload,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/v1/courses/${courseId}/curriculum`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to sync curriculum');
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const res = await fetch(`${BASE_URL}/v1/categories?page=1&limit=50`);
    if (!res.ok) return [];
    const body: { data: ApiCategory[] } = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

const EDUCATOR_ROLE_ID = 'e3e6012e-9d29-4e78-831d-d2427a1dfa02';

export async function fetchEducators(): Promise<ApiEducator[]> {
  try {
    const filters = JSON.stringify({ roles: [{ id: EDUCATOR_ROLE_ID }] });
    const res = await fetch(
      `${BASE_URL}/v1/users?filters=${encodeURIComponent(filters)}&limit=50`,
      { headers: authHeaders() },
    );
    if (!res.ok) return [];
    const body: { data: ApiEducator[] } = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}
