'use client';

import Link from 'next/link';
import { ArrowLeft, Star, Clock, ChevronRight } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { type Course } from '@/constants/learner';
import { courseSlug } from '@/lib/courses/catalog';
import { type ReviewModule } from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import CoursePreview from '@/components/course/CoursePreview';

export default function PublicCoursePreviewPage({
  course,
  modules,
  related,
}: {
  course: Course;
  modules: ReviewModule[];
  related: Course[];
}) {
  const slug = courseSlug(course);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* Navy band under the fixed header — the header renders white nav
          links/text until the user scrolls, so it needs a dark backdrop to
          stay legible at the top of the page (matches the hero on /courses
          and /courses/category; this page has no other hero to serve that role). */}
      <div className="bg-brand-navy pt-24 pb-8 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Courses
          </Link>
        </div>
      </div>
      <main className="pt-8 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CoursePreview
            course={course}
            modules={modules}
            mode="public"
            checkoutHref={`/checkout/${slug}`}
            otherCourseHref={(oc) => `/courses/${courseSlug(oc)}`}
          />
        </div>

        {/* ── Related courses ───────────────────────────────── */}
        {related.length > 0 && (
          <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-foreground text-xl font-bold">
                More in {course.category}
              </h2>
              <Link
                href={`/courses/category/${encodeURIComponent(course.category)}`}
                className="text-muted-foreground hover:text-brand-gold flex items-center gap-1 text-sm font-semibold transition-colors duration-200"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/courses/${courseSlug(r)}`}
                  className="group border-border bg-card hover:border-brand-gold/30 flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-36 items-center justify-center bg-[#eef0f8] dark:bg-white/5">
                    <span className="text-brand-navy/15 text-3xl font-black dark:text-white/15">
                      {r.title.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-foreground group-hover:text-brand-gold line-clamp-2 text-[14px] leading-snug font-bold transition-colors duration-200">
                      {r.title}
                    </h3>
                    <div className="text-muted-foreground flex items-center gap-3 text-[11px]">
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
        )}
      </main>
      <Footer />
    </div>
  );
}
