import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { NEWS_COLUMNS, type NewsCategory } from '@/constants/homepage';

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

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allItems = NEWS_COLUMNS.flatMap((col) => col.items);
  const item = allItems.find((n) => n.id === id);

  if (!item) notFound();

  const related = allItems
    .filter((n) => n.id !== item.id && n.category === item.category)
    .slice(0, 3);

  // Render content — split on \n\n for paragraphs, **bold** for bold text
  const renderContent = (text: string) =>
    text.split('\n\n').map((para, i) => {
      const parts = para
        .split(/(\*\*.*?\*\*)/g)
        .map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            part
          ),
        );
      return (
        <p
          key={i}
          className="text-brand-navy/70 mb-5 text-base leading-relaxed"
        >
          {parts}
        </p>
      );
    });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero image */}
        <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-125">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <div
              className={`h-full w-full bg-linear-to-br ${BG[item.category]}`}
            />
          )}
          <div className="from-brand-navy/70 via-brand-navy/20 absolute inset-0 bg-linear-to-t to-transparent" />
          {/* Title overlay at bottom of hero */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <span
                className={`mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${CATEGORY_COLOR[item.category]}`}
              >
                {item.category}
              </span>
              <h1 className="text-2xl leading-snug font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {item.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article */}
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Back */}
            <Link
              href="/news"
              className="group text-brand-navy/50 hover:text-brand-navy mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to News
            </Link>

            {/* Meta */}
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="text-brand-navy/40 flex items-center gap-1.5 text-[12px]">
                <Calendar className="h-3.5 w-3.5" />
                {item.date}
              </span>
              <span className="text-brand-navy/40 flex items-center gap-1.5 text-[12px]">
                <Clock className="h-3.5 w-3.5" />
                {item.readMin} min read
              </span>
              <span className="text-brand-navy/40 text-[12px]">
                · {item.source}
              </span>
            </div>

            {/* Divider */}
            <div className="bg-brand-gold mb-8 h-px w-16" />

            {/* Body */}
            <div className="prose-none">
              {item.content ? (
                renderContent(item.content)
              ) : (
                <p className="text-brand-navy/70 text-base leading-relaxed">
                  {item.excerpt}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-[#f8f9fc] py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-brand-navy mb-8 text-xl font-bold">
                Related Stories
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/news/${r.id}`}
                    className="group border-brand-navy/8 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      {r.image ? (
                        <Image
                          src={r.image}
                          alt={r.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className={`h-full w-full bg-linear-to-br ${BG[r.category]}`}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                      <p className="text-brand-navy/40 text-[11px]">{r.date}</p>
                      <h3 className="text-brand-navy group-hover:text-brand-navy/70 line-clamp-2 text-sm leading-snug font-bold">
                        {r.title}
                      </h3>
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
