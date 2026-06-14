import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { Star, Clock, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import {
  ALL_COURSES,
  type Course,
  type CourseLevel,
} from '@/constants/learner';

const LEVEL_COLOR: Record<CourseLevel, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-brand-gold/15 text-brand-navy',
  Advanced: 'bg-brand-navy/10 text-brand-navy',
};

function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group border-brand-navy/8 hover:shadow-brand-navy/10 hover:border-brand-gold/30 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative h-44 w-full overflow-hidden bg-[#f0f2f8]">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="text-brand-navy/15 h-12 w-12" strokeWidth={1} />
        </div>
        <div className="from-brand-navy/5 to-brand-gold/8 absolute inset-0 bg-linear-to-br transition-opacity duration-300 group-hover:opacity-70" />
        <div className="absolute top-3 left-3">
          <span
            className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-wide ${LEVEL_COLOR[course.level]}`}
          >
            {course.level}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-brand-navy group-hover:text-brand-navy/70 line-clamp-2 text-[15px] leading-snug font-bold transition-colors duration-200">
          {course.title}
        </h3>
        <p className="text-brand-navy/50 text-[12px]">{course.author}</p>
        <div className="border-brand-navy/6 mt-auto flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-1 text-[12px]">
            <Star className="fill-brand-gold text-brand-gold h-3.5 w-3.5" />
            <span className="text-brand-navy font-semibold">
              {course.rating}
            </span>
          </div>
          <div className="text-brand-navy/50 flex items-center gap-1 text-[12px]">
            <Clock className="h-3.5 w-3.5" />
            {course.hours}h
          </div>
          <ArrowRight className="text-brand-navy/20 group-hover:text-brand-gold h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const courses = ALL_COURSES.filter((c) => c.category === decoded);
  if (courses.length === 0) notFound();

  const allCategories = Array.from(new Set(ALL_COURSES.map((c) => c.category)));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ───────────────────────────────────────── */}
        <section className="bg-brand-navy pt-28 pb-16 sm:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/courses"
              className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All Courses
            </Link>
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="bg-brand-gold h-px w-6" />
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                Category
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {decoded}
            </h1>
            <p className="mt-3 text-base text-white/50">
              {courses.length} course{courses.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </section>

        {/* ── Content ────────────────────────────────────── */}
        <section className="bg-[#f8f9fc] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar — other categories */}
              <aside className="hidden w-56 shrink-0 lg:block">
                <h3 className="text-brand-navy/40 mb-4 text-[11px] font-bold tracking-widest uppercase">
                  Categories
                </h3>
                <div className="flex flex-col gap-1">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/courses/category/${encodeURIComponent(cat)}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                        cat === decoded
                          ? 'bg-brand-navy text-white'
                          : 'text-brand-navy/60 hover:bg-brand-navy/5 hover:text-brand-navy'
                      }`}
                    >
                      {cat}
                      <span className="text-[11px] opacity-50">
                        {ALL_COURSES.filter((c) => c.category === cat).length}
                      </span>
                    </Link>
                  ))}
                </div>
              </aside>

              {/* Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
