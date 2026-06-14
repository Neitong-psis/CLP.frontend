import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import {
  Search,
  Star,
  Clock,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Zap,
} from 'lucide-react';
import {
  ALL_COURSES,
  type Course,
  type CourseLevel,
} from '@/constants/learner';

const CATEGORIES = [
  'All',
  ...Array.from(new Set(ALL_COURSES.map((c) => c.category))),
];

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
      {/* Thumbnail placeholder */}
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
        <span className="text-brand-gold text-[11px] font-semibold tracking-widest uppercase">
          {course.category}
        </span>
        <h3 className="text-brand-navy group-hover:text-brand-navy/70 line-clamp-2 text-[15px] leading-snug font-bold transition-colors duration-200">
          {course.title}
        </h3>
        <p className="text-brand-navy/50 text-[12px]">{course.author}</p>

        <div className="border-brand-navy/6 mt-auto flex items-center justify-between border-t pt-3">
          <div className="text-brand-navy/50 flex items-center gap-1 text-[12px]">
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

export default function CoursesPage() {
  const categoryStats = CATEGORIES.slice(1).map((cat) => ({
    name: cat,
    count: ALL_COURSES.filter((c) => c.category === cat).length,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="bg-brand-navy pt-28 pb-24 sm:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="bg-brand-gold h-px w-6 sm:w-8" />
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                Explore
              </span>
              <span className="bg-brand-gold h-px w-6 sm:w-8" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Find your next course.
            </h1>
            <p className="mb-8 max-w-xl text-base text-white/55">
              Browse {ALL_COURSES.length}+ courses across leadership, STEM,
              communication, and more.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <Search className="text-brand-navy/40 absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses, topics, instructors..."
                className="focus:border-brand-gold/50 focus:ring-brand-gold/20 w-full rounded-full border border-white/15 bg-white/10 py-3 pr-4 pl-11 text-sm text-white backdrop-blur-sm placeholder:text-white/40 focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────────────── */}
        <div className="bg-brand-navy/95">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-white/8 sm:grid-cols-4">
              {[
                {
                  icon: BookOpen,
                  value: `${ALL_COURSES.length}+`,
                  label: 'Courses',
                },
                { icon: Users, value: '30K+', label: 'Learners' },
                { icon: Award, value: '95%', label: 'Completion Rate' },
                { icon: Zap, value: '4.8★', label: 'Avg. Rating' },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 py-5 text-center"
                >
                  <Icon className="text-brand-gold h-5 w-5" />
                  <span className="text-brand-gold text-xl font-bold">
                    {value}
                  </span>
                  <span className="text-[11px] font-semibold tracking-widest text-white/40 uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Categories + Grid ──────────────────────────────────── */}
        <section className="bg-[#f8f9fc] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Category chips */}
            <div className="mb-10 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={
                    cat === 'All'
                      ? '/courses'
                      : `/courses/category/${encodeURIComponent(cat)}`
                  }
                  className="border-brand-navy/12 text-brand-navy/60 hover:border-brand-gold/50 hover:text-brand-gold rounded-full border bg-white px-4 py-1.5 text-[12px] font-semibold shadow-sm transition-all duration-200"
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className="text-brand-navy/30 ml-1.5">
                      ({ALL_COURSES.filter((c) => c.category === cat).length})
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Course grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ALL_COURSES.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Browse by category ─────────────────────────────────── */}
        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-brand-navy text-xl font-bold">
                Browse by Category
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {categoryStats.map(({ name, count }) => (
                <Link
                  key={name}
                  href={`/courses/category/${encodeURIComponent(name)}`}
                  className="group border-brand-navy/8 hover:border-brand-gold/40 flex flex-col items-center gap-2 rounded-2xl border bg-[#f8f9fc] p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <span className="text-brand-navy group-hover:text-brand-gold text-lg font-bold transition-colors duration-200">
                    {name}
                  </span>
                  <span className="text-brand-navy/40 text-[11px]">
                    {count} courses
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
