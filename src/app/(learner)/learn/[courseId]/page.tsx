import { notFound } from 'next/navigation';
import { ALL_COURSES, COURSE_CONTENTS } from '@/config/learner';
import CoursePlayer from '@/components/pages/learner/my_learner/CoursePlayer';

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePlayerPage({ params }: PageProps) {
  const { courseId } = await params;

  const course = ALL_COURSES.find((c) => c.id === courseId);
  const content = COURSE_CONTENTS.find((c) => c.courseId === courseId);

  if (!course || !content) notFound();

  return <CoursePlayer course={course} content={content} />;
}
