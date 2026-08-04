'use client';

import { type Course } from '@/constants/learner';
import { type ReviewModule } from '../../../learn/[courseId]/_lib/content';
import { slugify } from '@/lib/utils/slugify';
import { useCourseCatalogT } from '@/i18n';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import CoursePreview from '@/components/course/CoursePreview';

export default function CoursePreviewPage({
  course,
  modules,
}: {
  course: Course;
  modules: ReviewModule[];
}) {
  const t = useCourseCatalogT();
  const slug = slugify(course.title);

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="learner"
        title={course.title}
        subtitle={t('preview.subtitle')}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <CoursePreview
          course={course}
          modules={modules}
          mode="learner"
          checkoutHref={`/checkout/${slug}`}
          learnHref={`/learn/${slug}`}
          previewLessonHref={`/learn/${slug}?mode=replay`}
          otherCourseHref={(oc) => `/explore/${slugify(oc.title)}`}
        />
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
