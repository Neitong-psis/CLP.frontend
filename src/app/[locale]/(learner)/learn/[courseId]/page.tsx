import { notFound } from 'next/navigation';
import { ALL_COURSES, EXPLORE_COURSES, MOCK_USER } from '@/constants/learner';
import {
  COURSE_MODULES_MAP,
  REVIEW_MODULES,
  LEARNER_ITEM_STATUSES,
  flattenItems,
} from './_lib/content';
import LearnerCoursePlayer from '@/components/pages/learner/learn/LearnerCoursePlayer';
import { slugify } from '@/lib/utils/slugify';
import type { LearnerItemStatus } from './_lib/content';

interface PageProps {
  params: Promise<{ courseId: string; locale: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export default async function CoursePlayerPage({
  params,
  searchParams,
}: PageProps) {
  const { courseId } = await params;
  const { mode } = await searchParams;

  // Resolve course by title slug across all known courses
  const course = [...ALL_COURSES, ...EXPLORE_COURSES].find(
    (c) => slugify(c.title) === courseId,
  );
  if (!course) notFound();

  // Resolve modules using the course's actual ID
  const modules = COURSE_MODULES_MAP[course.id] ?? REVIEW_MODULES;

  // Determine start item
  const allItems = flattenItems(modules);
  const isReplay = mode === 'replay';

  let startItemId: string;
  if (isReplay) {
    startItemId = allItems[0]?.id ?? '';
  } else {
    // Resume: first item that is 'ready' or 'unread'
    const firstIncomplete = allItems.find((item) => {
      const status: LearnerItemStatus =
        LEARNER_ITEM_STATUSES[item.id] ?? 'unread';
      return status === 'ready' || status === 'unread';
    });
    startItemId = firstIncomplete?.id ?? allItems[0]?.id ?? '';
  }

  return (
    <LearnerCoursePlayer
      course={course}
      modules={modules}
      startItemId={startItemId}
      isReplay={isReplay}
      userEmail={MOCK_USER.email}
    />
  );
}
