'use client';

import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { BookOpen, Users, Award, Zap } from 'lucide-react';
import { CATALOG, courseSlug, courseCategories } from '@/lib/courses/catalog';
import CourseBrowser from '@/components/course/CourseBrowser';

const CATEGORIES = courseCategories(CATALOG);

export default function CoursesPage() {
  const categoryStats = CATEGORIES.slice(1).map((cat) => ({
    name: cat,
    count: CATALOG.filter((c) => c.category === cat).length,
  }));

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="bg-brand-navy pt-28 pb-16 sm:pt-32">
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
            <p className="max-w-xl text-base text-white/55">
              Browse {CATALOG.length}+ courses across leadership, STEM,
              communication, and more.
            </p>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────────────── */}
        <div className="bg-brand-navy/95">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-white/8 sm:grid-cols-4">
              {[
                {
                  icon: BookOpen,
                  value: `${CATALOG.length}+`,
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

        {/* ── Browse ─────────────────────────────────────────────── */}
        <section className="bg-background py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CourseBrowser
              courses={CATALOG}
              categories={CATEGORIES}
              mode="public"
              previewHref={(course) => `/courses/${courseSlug(course)}`}
              checkoutHref={(course) => `/checkout/${courseSlug(course)}`}
              pageSize={12}
            />
          </div>
        </section>

        {/* ── Browse by category ─────────────────────────────────── */}
        <section className="bg-card border-border border-t py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-foreground text-xl font-bold">
                Browse by Category
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {categoryStats.map(({ name, count }) => (
                <Link
                  key={name}
                  href={`/courses/category/${encodeURIComponent(name)}`}
                  className="group border-border hover:border-brand-gold/40 bg-background flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-foreground group-hover:text-brand-gold text-lg font-bold transition-colors duration-200">
                    {name}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
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
