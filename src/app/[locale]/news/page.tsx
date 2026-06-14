import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import {
  NEWS_COLUMNS,
  type NewsItem,
  type NewsCategory,
} from '@/constants/homepage';

const CATEGORY_COLOR: Record<NewsCategory, string> = {
  Announcement: 'bg-brand-gold text-white',
  News: 'bg-brand-navy text-white',
  Event: 'bg-brand-gold text-white',
  Achievement: 'bg-emerald-500 text-white',
};

const BG: Record<NewsCategory, string> = {
  Announcement: 'from-brand-gold/30 to-brand-gold/10',
  News: 'from-brand-navy/20 to-brand-navy/5',
  Event: 'from-indigo-200 to-indigo-50',
  Achievement: 'from-emerald-200 to-emerald-50',
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

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.id}`}
      className="group border-brand-navy/8 hover:shadow-brand-navy/10 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative h-52 w-full overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full bg-linear-to-br ${BG[item.category]}`}
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/8" />
        <div className="absolute top-3 right-3">
          <CategoryBadge category={item.category} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="text-brand-navy/40 flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {item.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {item.readMin} min read
          </span>
        </div>
        <h3 className="text-brand-navy group-hover:text-brand-navy/70 text-base leading-snug font-bold transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-brand-navy/55 line-clamp-2 flex-1 text-[13px] leading-relaxed">
          {item.excerpt}
        </p>
        <div className="text-brand-navy/50 group-hover:text-brand-navy flex items-center gap-1.5 text-[12px] font-bold transition-all duration-200 group-hover:gap-2">
          Read More <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.id}`}
      className="group border-brand-navy/10 shadow-brand-navy/20 relative col-span-full flex flex-col overflow-hidden rounded-3xl border bg-white shadow-2xl transition-all duration-300 hover:shadow-[0_32px_64px_rgba(0,0,62,0.18)] lg:flex-row"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden lg:h-auto lg:w-2/5">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full bg-linear-to-br ${BG[item.category]}`}
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/8" />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={item.category} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center gap-4 p-8 lg:p-10">
        <span className="text-brand-navy/40 flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {item.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {item.readMin} min read
          </span>
          <span>·</span>
          <span>{item.source}</span>
        </span>
        <h2 className="text-brand-navy group-hover:text-brand-navy/70 text-2xl leading-snug font-bold transition-colors duration-200 sm:text-3xl">
          {item.title}
        </h2>
        <p className="text-brand-navy/55 line-clamp-3 text-sm leading-relaxed">
          {item.excerpt}
        </p>
        <div className="group/btn border-brand-navy/20 text-brand-navy hover:border-brand-navy relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300">
          <span
            aria-hidden
            className="bg-brand-navy absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover/btn:translate-y-0"
          />
          <span className="relative transition-colors duration-300 group-hover/btn:text-white">
            Read Full Story
          </span>
          <ArrowRight className="relative h-4 w-4 transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
        </div>
      </div>
    </Link>
  );
}

export default function NewsPage() {
  const allItems: NewsItem[] = NEWS_COLUMNS.flatMap((col) => col.items);
  const [featured, ...rest] = allItems;

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Header />
      <main>
        {/* Hero — navy, extra bottom padding to give room for the overlapping card */}
        <section className="bg-brand-navy pt-28 pb-32 sm:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="bg-brand-gold h-px w-6 sm:w-8" />
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase sm:text-[11px]">
                News & Events
              </span>
              <span className="bg-brand-gold h-px w-6 sm:w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Stay in the loop.
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/55">
              Program updates, upcoming events, and student achievements from
              AYLA.
            </p>
          </div>
        </section>

        {/* More Stories — light background, featured card overlaps from above */}
        <section className="bg-[#f8f9fc] pt-0 pb-12 sm:pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Featured card — pulled up to straddle the navy/light boundary */}
            <div className="-mt-20 mb-12">
              <FeaturedCard item={featured} />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Divider with label */}
            <div className="mb-8 flex items-center gap-4">
              <span className="text-brand-navy text-sm font-bold">
                More Stories
              </span>
              <div className="bg-brand-navy/10 h-px flex-1" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
