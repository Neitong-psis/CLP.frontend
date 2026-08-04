import { notFound } from 'next/navigation';
import { CATALOG, findCourse } from '@/lib/courses/catalog';
import {
  COURSE_MODULES_MAP,
  REVIEW_MODULES,
} from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import PublicCoursePreviewPage from './_components/PublicCoursePreviewPage';

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { courseId } = await params;

  const course = findCourse(courseId);
  if (!course) notFound();

  const modules = COURSE_MODULES_MAP[course.id] ?? REVIEW_MODULES;
  const related = CATALOG.filter(
    (c) => c.category === course.category && c.id !== course.id,
  ).slice(0, 3);

  return (
    <PublicCoursePreviewPage
      course={course}
      modules={modules}
      related={related}
    />
  );
}
