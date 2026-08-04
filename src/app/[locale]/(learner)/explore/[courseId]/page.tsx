import { notFound } from 'next/navigation';
import { findCourse } from '@/lib/courses/catalog';
import {
  COURSE_MODULES_MAP,
  REVIEW_MODULES,
} from '../../learn/[courseId]/_lib/content';
import CoursePreviewPage from './_components/CoursePreviewPage';

interface PageProps {
  params: Promise<{ courseId: string; locale: string }>;
}

export default async function ExploreCoursePreviewPage({ params }: PageProps) {
  const { courseId } = await params;

  const course = findCourse(courseId);
  if (!course) notFound();

  const modules = COURSE_MODULES_MAP[course.id] ?? REVIEW_MODULES;

  return <CoursePreviewPage course={course} modules={modules} />;
}
