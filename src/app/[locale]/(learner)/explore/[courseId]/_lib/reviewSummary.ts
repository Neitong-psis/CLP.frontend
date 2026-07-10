// Deterministic mock instructor + review data for the course preview page.
// Real review/instructor records don't exist yet, so figures are derived from
// the course itself (id, author, rating) to stay stable across renders and
// distinct across the catalog.
import { ALL_COURSES, EXPLORE_COURSES, type Course } from '@/constants/learner';

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

const ACADEMIC_KEYS = [
  'credentialAcademic1',
  'credentialAcademic2',
  'credentialAcademic3',
] as const;
const CAREER_KEYS = [
  'credentialCareer1',
  'credentialCareer2',
  'credentialCareer3',
] as const;
const TEACHING_KEYS = [
  'credentialTeaching1',
  'credentialTeaching2',
  'credentialTeaching3',
] as const;

const QUOTE_TEMPLATE_KEYS = [
  'quoteTemplate1',
  'quoteTemplate2',
  'quoteTemplate3',
  'quoteTemplate4',
] as const;

const TESTIMONIAL_STARS = [5, 5, 4] as const;

const REVIEWER_POOL = [
  { name: 'Dara P.', role: 'Product lead' },
  { name: 'Kimheng S.', role: 'Data analyst' },
  { name: 'Miguel A.', role: 'Engineering manager' },
  { name: 'Sokha C.', role: 'Team lead' },
  { name: 'Phally N.', role: 'Operations manager' },
  { name: 'Ratana K.', role: 'Marketing lead' },
  { name: 'James O.', role: 'Consultant' },
  { name: 'Leakena S.', role: 'Program manager' },
] as const;

const RECENT_MONTHS = ['Jun 2026', 'May 2026', 'Apr 2026', 'Mar 2026'] as const;

export interface InstructorProfile {
  credentialKeys: readonly [string, string, string];
  coursesCount: number;
  learnersCount: number;
  avgRating: number;
  years: number;
  otherCourses: Course[];
}

export interface TestimonialEntry {
  templateKey: string;
  moduleTitle: string;
  name: string;
  role: string;
  date: string;
  stars: number;
}

export interface RatingRow {
  stars: number;
  percent: number;
}

export interface ReviewSummary {
  ratingsCount: number;
  writtenReviewsCount: number;
  breakdown: RatingRow[];
  testimonials: TestimonialEntry[];
}

export function getInstructorProfile(course: Course): InstructorProfile {
  const seed = hashString(course.id + course.author);

  const catalog = [...ALL_COURSES, ...EXPLORE_COURSES];
  const byAuthor = catalog.filter((c) => c.author === course.author);
  const otherCourses = byAuthor.filter((c) => c.id !== course.id).slice(0, 2);

  const avgRating =
    byAuthor.length > 0
      ? Math.round(
          (byAuthor.reduce((sum, c) => sum + c.rating, 0) / byAuthor.length) *
            10,
        ) / 10
      : course.rating;

  return {
    credentialKeys: [
      ACADEMIC_KEYS[seed % ACADEMIC_KEYS.length],
      CAREER_KEYS[(seed >>> 3) % CAREER_KEYS.length],
      TEACHING_KEYS[(seed >>> 6) % TEACHING_KEYS.length],
    ],
    coursesCount: Math.max(1, byAuthor.length),
    learnersCount: 500 + (seed % 30000),
    avgRating,
    years: 4 + (seed % 14),
    otherCourses,
  };
}

function ratingBreakdown(rating: number): number[] {
  if (rating >= 4.8) return [84, 12, 2, 1, 1];
  if (rating >= 4.5) return [78, 15, 4, 2, 1];
  if (rating >= 4.0) return [65, 20, 8, 4, 3];
  return [50, 25, 15, 6, 4];
}

export function getReviewSummary(
  course: Course,
  moduleTitles: string[],
): ReviewSummary {
  const seed = hashString(course.id + course.title);
  const ratingsCount = 80 + (seed % 1800);
  const writtenReviewsCount = Math.round(ratingsCount * 0.15) + (seed % 20);

  const breakdown = ratingBreakdown(course.rating).map((percent, i) => ({
    stars: 5 - i,
    percent,
  }));

  const titles = moduleTitles.length > 0 ? moduleTitles : [course.title];

  const testimonials = TESTIMONIAL_STARS.map((stars, i) => {
    const reviewer = REVIEWER_POOL[(seed + i * 3) % REVIEWER_POOL.length];
    return {
      templateKey: QUOTE_TEMPLATE_KEYS[(seed + i) % QUOTE_TEMPLATE_KEYS.length],
      moduleTitle: titles[i % titles.length],
      name: reviewer.name,
      role: reviewer.role,
      date: RECENT_MONTHS[i % RECENT_MONTHS.length],
      stars,
    };
  });

  return { ratingsCount, writtenReviewsCount, breakdown, testimonials };
}
