import EducatorTopBar from '@/components/common/TopBar';
import { CourseWorkspace } from '@/components/pages/educator/courses/CourseWorkspace';

export default function EducatorCoursesPage() {
  return (
    <div className="flex min-h-full flex-col bg-[#f5f5f7]">
      <EducatorTopBar
        role="educator"
        title="My Courses"
        subtitle="Live workspace synced from your account"
      />

      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <CourseWorkspace />
      </main>
    </div>
  );
}
