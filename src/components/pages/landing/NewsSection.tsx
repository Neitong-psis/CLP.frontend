'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {
  NEWS_COLUMNS,
  type NewsItem,
  type NewsCategory,
} from '@/constants/homepage';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';

// ─── Category badge ──────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<NewsCategory, string> = {
  Announcement: 'bg-brand-gold text-white',
  News: 'bg-brand-navy text-white',
  Event: 'bg-brand-gold text-white',
  Achievement: 'bg-emerald-500 text-white',
};

function CategoryBadge({ category }: { category: NewsCategory }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${CATEGORY_COLOR[category]}`}
    >
      {category}
    </span>
  );
}

// ─── Image placeholder ───────────────────────────────────────────────────────────

function ImagePlaceholder({
  alt,
  category,
}: {
  alt: string;
  category: NewsCategory;
}) {
  const bg: Record<NewsCategory, string> = {
    Announcement: 'from-brand-gold/40 to-brand-gold/10',
    News: 'from-brand-navy/25 to-brand-navy/8',
    Event: 'from-indigo-300 to-indigo-100',
    Achievement: 'from-emerald-200 to-emerald-50',
  };
  return (
    <div
      className={`flex h-full w-full items-end bg-linear-to-br ${bg[category]} p-4`}
      role="img"
      aria-label={alt}
    >
      <span className="text-brand-navy/35 line-clamp-2 text-[11px] leading-relaxed">
        {alt}
      </span>
    </div>
  );
}

// ─── News card ───────────────────────────────────────────────────────────────────

function NewsCard({
  item,
  index,
  isInView,
}: {
  item: NewsItem;
  index: number;
  isInView: boolean;
}) {
  return (
    <Link
      href={`/news/${item.id}`}
      className={`group hover:shadow-brand-navy/15 relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${entranceClass(isInView, 'md')}`}
      style={entranceStyle(isInView, index * 100)}
    >
      {/* Image */}
      <div className="p-3 pb-0">
        <div className="relative h-52 w-full overflow-hidden rounded-xl">
          <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 768px) 340px, 85vw"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder alt={item.imageAlt} category={item.category} />
            )}
          </div>
          <div className="from-brand-navy/30 absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute top-3 right-3 translate-y-0 transition-transform duration-300 group-hover:translate-y-1">
            <CategoryBadge category={item.category} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6 pt-5">
        <p className="text-brand-navy/40 text-[11px] font-semibold">
          {item.date}
        </p>
        <h4 className="text-brand-navy group-hover:text-brand-navy/70 text-lg leading-snug font-bold transition-colors duration-300">
          {item.title}
        </h4>
        <p className="text-brand-navy/55 flex-1 translate-y-1 text-sm leading-relaxed opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {item.excerpt}
        </p>
        <div className="text-brand-navy/50 group-hover:text-brand-navy flex items-center gap-1.5 text-sm font-bold transition-all duration-300 group-hover:gap-2.5">
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────────

export default function NewsSection() {
  const [ref, isInView] = useInView<HTMLElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const allItems: NewsItem[] = NEWS_COLUMNS.flatMap((col) => col.items);
  const [activeDot, setActiveDot] = useState(0);

  const getCardW = () => {
    const el = scrollRef.current;
    if (!el) return 360;
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return 360;
    const gap = parseInt(getComputedStyle(el).gap) || 20;
    return firstCard.getBoundingClientRect().width + gap;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = getCardW();
      const dot = Math.round(el.scrollLeft / cardW);
      setActiveDot(Math.min(dot, allItems.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [allItems.length]);

  const scrollTo = (index: number) => {
    const cardW = getCardW();
    scrollRef.current?.scrollTo({ left: index * cardW, behavior: 'smooth' });
  };

  const prev = () =>
    scrollRef.current?.scrollBy({ left: -getCardW(), behavior: 'smooth' });
  const next = () =>
    scrollRef.current?.scrollBy({ left: getCardW(), behavior: 'smooth' });

  return (
    <section ref={ref} className="bg-[#f8f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand-gold mb-2 text-[11px] font-bold tracking-[0.2em] uppercase">
              Stay Updated
            </p>
            <h2 className="text-brand-navy text-4xl font-bold tracking-tight sm:text-5xl">
              News &amp; Events
            </h2>
          </div>

          <Link
            href="/news"
            className="group border-brand-navy/20 text-brand-navy hover:border-brand-navy relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-px focus:outline-none"
          >
            <span
              aria-hidden
              className="bg-brand-navy absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
            />
            <span className="relative transition-colors duration-300 group-hover:text-white">
              View All Updates
            </span>
            <ArrowRight className="relative h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
          </Link>
        </div>

        {/* Scroll container */}
        <div className="relative">
          {/* Right fade edge */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-[#f8f9fc] to-transparent" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
            }}
          >
            {allItems.map((item, i) => (
              <div
                key={item.id}
                className="w-85 shrink-0"
                style={{ scrollSnapAlign: 'start' }}
              >
                <NewsCard item={item} index={i} isInView={isInView} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="mt-8 flex items-center justify-between">
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="group border-brand-navy/20 text-brand-navy/50 hover:border-brand-navy relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 hover:-translate-y-px focus:outline-none"
          >
            <span
              aria-hidden
              className="bg-brand-navy absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
            />
            <ArrowLeft className="relative h-4 w-4 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-white" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {allItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Scroll to item ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeDot
                    ? 'bg-brand-navy h-2.5 w-8'
                    : 'bg-brand-navy/20 hover:bg-brand-navy/40 h-2.5 w-2.5'
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next"
            className="group border-brand-navy/20 text-brand-navy/50 hover:border-brand-navy relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 hover:-translate-y-px focus:outline-none"
          >
            <span
              aria-hidden
              className="bg-brand-navy absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
            />
            <ArrowRight className="relative h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
