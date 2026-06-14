import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  BookOpen,
  Users,
  Award,
  PlayCircle,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import {
  ALL_COURSES,
  COURSE_CONTENTS,
  type CourseLevel,
} from '@/constants/learner';

const LEVEL_COLOR: Record<CourseLevel, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-brand-gold/15 text-brand-navy',
  Advanced: 'bg-brand-navy/10 text-brand-navy',
};

export default async function CourseFeaturePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = ALL_COURSES.find((c) => c.id === courseId);
  if (!course) notFound();

  const content = COURSE_CONTENTS.find((c) => c.courseId === courseId);
  const related = ALL_COURSES.filter(
    (c) => c.category === course.category && c.id !== course.id,
  ).slice(0, 3);

  const totalLessons =
    content?.sections.reduce((acc, s) => acc + s.lessons.length, 0) ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="bg-brand-navy pt-28 pb-16 sm:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/courses"
              className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to Courses
            </Link>

            <div className="grid gap-10 lg:grid-cols-3">
              {/* Left — course info */}
              <div className="lg:col-span-2">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-brand-gold text-[11px] font-bold tracking-widest uppercase">
                    {course.category}
                  </span>
                  <span className="text-white/20">·</span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${LEVEL_COLOR[course.level]}`}
                  >
                    {course.level}
                  </span>
                </div>
                <h1 className="mb-4 text-3xl leading-snug font-bold tracking-tight text-white sm:text-4xl">
                  {course.title}
                </h1>
                <p className="mb-6 text-base text-white/60">
                  A comprehensive course covering all the essential concepts and
                  practical skills you need to excel in{' '}
                  {course.category.toLowerCase()}.
                </p>

                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-1.5">
                    <Star className="fill-brand-gold text-brand-gold h-4 w-4" />
                    <span className="font-bold text-white">
                      {course.rating}
                    </span>
                    <span className="text-sm text-white/40">
                      (2.4k reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/50">
                    <Users className="h-4 w-4" />
                    8,300+ enrolled
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/50">
                    <Clock className="h-4 w-4" />
                    {course.hours} hours
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/50">
                    <BookOpen className="h-4 w-4" />
                    {totalLessons || 'Multiple'} lessons
                  </div>
                </div>

                <p className="mt-4 text-[13px] text-white/40">
                  Created by{' '}
                  <span className="font-semibold text-white/70">
                    {course.author}
                  </span>
                </p>
              </div>

              {/* Right — enroll card */}
              <div className="lg:row-span-2">
                <div className="shadow-brand-navy/30 sticky top-24 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
                  {/* Preview area */}
                  <div className="relative flex h-44 items-center justify-center bg-[#f0f2f8]">
                    <div className="bg-brand-navy flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
                      <PlayCircle className="text-brand-gold h-8 w-8" />
                    </div>
                    <span className="text-brand-navy/40 absolute bottom-3 text-[11px] font-semibold">
                      Preview this course
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="mb-5 flex items-baseline gap-2">
                      <span className="text-brand-navy text-3xl font-bold">
                        Free
                      </span>
                      <span className="text-brand-navy/40 text-sm">
                        with AYLA membership
                      </span>
                    </div>

                    <Link
                      href={`/auth`}
                      className="group bg-brand-gold text-brand-navy hover:shadow-brand-gold/30 mb-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Enroll Now
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      href={`/auth`}
                      className="border-brand-navy/15 text-brand-navy/60 hover:border-brand-navy/30 hover:text-brand-navy flex w-full items-center justify-center rounded-full border py-3 text-sm font-semibold transition-all duration-200"
                    >
                      Try for Free
                    </Link>

                    <ul className="mt-5 flex flex-col gap-2">
                      {[
                        `${course.hours} hours of content`,
                        `${totalLessons || 'Multiple'} lessons`,
                        'Certificate of completion',
                        'Lifetime access',
                        'Mobile & desktop',
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-brand-navy/55 flex items-center gap-2 text-[12px]"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Curriculum ───────────────────────────────────── */}
        {content && (
          <section className="bg-[#f8f9fc] py-14">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="bg-brand-gold h-px w-6" />
                <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                  Curriculum
                </span>
              </div>
              <h2 className="text-brand-navy mb-8 text-2xl font-bold">
                Course Content
              </h2>

              <div className="flex flex-col gap-3">
                {content.sections.map((section, si) => (
                  <div
                    key={section.id}
                    className="border-brand-navy/8 overflow-hidden rounded-xl border bg-white"
                  >
                    <div className="border-brand-navy/6 bg-brand-navy/2 flex items-center justify-between border-b px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="bg-brand-navy/8 text-brand-navy/50 flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold">
                          {si + 1}
                        </span>
                        <h3 className="text-brand-navy text-sm font-bold">
                          {section.title}
                        </h3>
                      </div>
                      <span className="text-brand-navy/40 text-[11px]">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-brand-navy/5 flex flex-col divide-y">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 px-5 py-3"
                        >
                          {lesson.type === 'video' ? (
                            <PlayCircle className="text-brand-navy/30 h-4 w-4 shrink-0" />
                          ) : (
                            <Award className="text-brand-gold/60 h-4 w-4 shrink-0" />
                          )}
                          <span className="text-brand-navy/70 flex-1 text-[13px]">
                            {lesson.title}
                          </span>
                          <span className="text-brand-navy/35 text-[11px]">
                            {lesson.duration}
                          </span>
                          {lesson.completed && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related courses ───────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-white py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-brand-navy text-xl font-bold">
                  More in {course.category}
                </h2>
                <Link
                  href={`/courses/category/${encodeURIComponent(course.category)}`}
                  className="text-brand-navy/50 hover:text-brand-gold flex items-center gap-1 text-sm font-semibold transition-colors duration-200"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/courses/${r.id}`}
                    className="group border-brand-navy/8 hover:border-brand-gold/30 flex flex-col overflow-hidden rounded-2xl border bg-[#f8f9fc] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-36 items-center justify-center bg-[#eef0f8]">
                      <BookOpen
                        className="text-brand-navy/15 h-10 w-10"
                        strokeWidth={1}
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                      <h3 className="text-brand-navy group-hover:text-brand-navy/70 line-clamp-2 text-[14px] leading-snug font-bold transition-colors duration-200">
                        {r.title}
                      </h3>
                      <div className="text-brand-navy/40 flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Star className="fill-brand-gold text-brand-gold h-3 w-3" />
                          {r.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {r.hours}h
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
