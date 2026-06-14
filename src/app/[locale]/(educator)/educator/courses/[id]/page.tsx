'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, SearchX } from 'lucide-react';
import { EDUCATOR_COURSE_TASKS } from '@/constants/educator';
import { Button } from '@/components/ui/button';
import { CourseReview } from './_components/CourseReview';

export default function CourseReviewPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const task = EDUCATOR_COURSE_TASKS.find((t) => t.id === params.id);

  if (!task) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-3 bg-slate-50 px-6 py-20 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100">
          <SearchX className="h-6 w-6 text-slate-400" />
        </div>
        <div>
          <p className="text-brand-navy text-base font-bold">
            Course not found
          </p>
          <p className="mt-0.5 text-sm text-slate-500">
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
