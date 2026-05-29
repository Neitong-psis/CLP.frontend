'use client';

import { useState } from 'react';
import EducatorTopBar from '@/components/common/TopBar';
import CreateCourseWizard from '@/components/pages/educator/courses/CreateCourseWizard';
import { CourseTable } from '@/components/pages/educator/courses/CourseTable';

export default function EducatorCoursesPage() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="My Courses"
        subtitle={`Manage and track your teaching materials`}
      />

      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <CourseTable onAddCourse={() => setWizardOpen(true)} />
      </main>

      {wizardOpen && (
        <CreateCourseWizard onClose={() => setWizardOpen(false)} />
      )}
    </div>
  );
}
