import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { ArrowLeft } from 'lucide-react';
import { CATALOG, courseSlug, courseCategories } from '@/lib/courses/catalog';
import CourseCard from '@/components/course/CourseCard';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const courses = CATALOG.filter((c) => c.category === decoded);
  if (courses.length === 0) notFound();

  const allCategories = courseCategories(CATALOG).filter((c) => c !== 'All');

  return (
    <div className="bg-background min-h-screen">
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
        <section className="bg-background py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar — other categories */}
              <aside className="hidden w-56 shrink-0 lg:block">
                <h3 className="text-muted-foreground mb-4 text-[11px] font-bold tracking-widest uppercase">
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
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {cat}
                      <span className="text-[11px] opacity-50">
                        {CATALOG.filter((c) => c.category === cat).length}
                      </span>
                    </Link>
                  ))}
                </div>
              </aside>

              {/* Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      href={`/courses/${courseSlug(course)}`}
                      action={{
                        kind: 'link',
                        href: `/checkout/${courseSlug(course)}`,
                      }}
                    />
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
