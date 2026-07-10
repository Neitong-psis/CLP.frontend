import { notFound } from 'next/navigation';
import { ALL_COURSES, EXPLORE_COURSES } from '@/constants/learner';
import {
  COURSE_MODULES_MAP,
  REVIEW_MODULES,
  lessonCount,
} from '../../learn/[courseId]/_lib/content';
import { slugify } from '@/lib/utils/slugify';
import CheckoutPage from '@/components/pages/learner/checkout/CheckoutPage';

interface PageProps {
  params: Promise<{ courseId: string; locale: string }>;
}

export default async function CoursePurchasePage({ params }: PageProps) {
  const { courseId } = await params;

  const course = [...ALL_COURSES, ...EXPLORE_COURSES].find(
    (c) => slugify(c.title) === courseId,
  );
  if (!course) notFound();

  const modules = COURSE_MODULES_MAP[course.id] ?? REVIEW_MODULES;
  const totalLessons = modules.reduce((sum, m) => sum + lessonCount(m), 0);

  return (
    <CheckoutPage
      course={course}
      totalModules={modules.length}
      totalLessons={totalLessons}
    />
  );
}
