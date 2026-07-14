'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourseTasks } from '@/context/CourseTasksContext';
import { CourseReview } from './_components/CourseReview';

export default function CourseReviewPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { tasks } = useCourseTasks();
  const task = tasks.find((t) => t.id === params.id);

  if (!task) {
    return (
      <div className="bg-background flex min-h-full flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <div className="bg-muted flex size-12 items-center justify-center rounded-2xl">
          <SearchX className="text-muted-foreground h-6 w-6" />
        </div>
        <div>
          <p className="text-foreground text-base font-bold">
            Course not found
          </p>
          <p className="text-muted-foreground mt-0.5 text-sm">
            This course may have been moved or removed.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-1.5"
          onClick={() => router.push('/educator/courses')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to My Courses
        </Button>
      </div>
    );
  }

  return <CourseReview task={task} />;
}
