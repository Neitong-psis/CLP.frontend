import { notFound } from 'next/navigation';
import { findCourse } from '@/lib/courses/catalog';
import {
  COURSE_MODULES_MAP,
  REVIEW_MODULES,
  lessonCount,
} from '../../learn/[courseId]/_lib/content';
import CheckoutPage from '@/components/pages/learner/checkout/CheckoutPage';

interface PageProps {
  params: Promise<{ courseId: string; locale: string }>;
}

export default async function CoursePurchasePage({ params }: PageProps) {
  const { courseId } = await params;

  const course = findCourse(courseId);
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
