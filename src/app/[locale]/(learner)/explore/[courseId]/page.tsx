import { notFound } from 'next/navigation';
import { ALL_COURSES, EXPLORE_COURSES } from '@/constants/learner';
import {
  COURSE_MODULES_MAP,
  REVIEW_MODULES,
} from '../../learn/[courseId]/_lib/content';
import { slugify } from '@/lib/utils/slugify';
import CoursePreview from './_components/CoursePreview';

interface PageProps {
  params: Promise<{ courseId: string; locale: string }>;
}

export default async function CoursePreviewPage({ params }: PageProps) {
  const { courseId } = await params;

  // Resolve by title slug across every course topic in the app (both the
  // Explore catalog and My Learning's seed list), mirroring the resolution
  // used by the course player at /learn/[courseId].
  const course = [...ALL_COURSES, ...EXPLORE_COURSES].find(
    (c) => slugify(c.title) === courseId,
  );
  if (!course) notFound();

  const modules = COURSE_MODULES_MAP[course.id] ?? REVIEW_MODULES;

  return <CoursePreview course={course} modules={modules} />;
}
