'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import type { AdminCourseRow } from '@/constants/admin';
import type { ReviewFeedbackItem } from '@/constants/educator';
import { CourseReviewOverlay } from '../_components/review/CourseReviewOverlay';

export default function AdminCourseReviewPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const title = searchParams.get('title');
  const instructor = searchParams.get('instructor') ?? '';
  const category = searchParams.get('category') ?? '';
  const level = searchParams.get('level') ?? '';
  const status =
    (searchParams.get('status') as AdminCourseRow['status']) ?? 'Pending';

  if (!title) {
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
          onClick={() => router.push('/admin/courses')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </Button>
      </div>
    );
  }

  const course: AdminCourseRow = {
    id: params.id,
    title,
    instructor,
    category,
    level,
    status,
    enrolled: 0,
    rating: 0,
    createdAt: '',
  };

  function handleApprove(c: AdminCourseRow, feedback: ReviewFeedbackItem[]) {
    toast(
      feedback.length > 0
        ? `"${c.title}" approved and published, with feedback on ${feedback.length} item(s).`
        : `"${c.title}" approved and published.`,
      'success',
    );
    router.push('/admin/courses');
  }

  function handleReject(c: AdminCourseRow, feedback: ReviewFeedbackItem[]) {
    toast(
      `Feedback on ${feedback.length} item(s) sent to ${c.instructor}. "${c.title}" stays pending.`,
      'error',
    );
    router.push('/admin/courses');
  }

  return (
    <CourseReviewOverlay
      course={course}
      onApprove={handleApprove}
      onReject={handleReject}
      onClose={() => router.push('/admin/courses')}
    />
  );
}
