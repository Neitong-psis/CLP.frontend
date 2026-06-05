import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { HeroStat } from '@/constants/hero';

interface QuoteCardProps {
  quote: string;
  badge: string;
  author: {
    name: string;
    initial: string;
    role: string;
  };
  stats: readonly HeroStat[];
}

const STAT_EMPHASIS = {
  navy: 'text-brand-navy',
  gold: 'text-brand-gold',
  white: 'text-white',
} as const;

export function QuoteCard({ quote, badge, author, stats }: QuoteCardProps) {
  return (
    <article className="bg-brand-navy relative rounded-lg p-8 transition-[translate] duration-500 ease-out hover:-translate-y-2">
      <header className="mb-6 flex items-center justify-between">
        <span className="bg-brand-gold/20 rounded-lg p-3">
          <Quote aria-hidden className="text-brand-gold h-5 w-5" />
        </span>
        <span className="text-brand-gold rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase">
          {badge}
        </span>
      </header>

      <blockquote className="mb-6 text-base leading-relaxed font-medium text-white/90">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="bg-brand-gold/25 text-brand-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
        >
          {author.initial}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{author.name}</p>
          <p className="text-xs text-white/50">{author.role}</p>
        </div>
      </figcaption>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd
              className={cn(
                'text-2xl font-bold',
                STAT_EMPHASIS[stat.emphasis ?? 'white'],
              )}
            >
              {stat.value}
            </dd>
            <p className="text-xs text-white/45">{stat.label}</p>
          </div>
        ))}
      </dl>
    </article>
  );
}
