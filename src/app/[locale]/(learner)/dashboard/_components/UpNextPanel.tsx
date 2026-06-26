'use client';

import Link from 'next/link';
import {
  BookOpen,
  FileQuestion,
  ClipboardList,
  ChevronRight,
} from 'lucide-react';
import { UP_NEXT_ITEMS, type UpNextItemType } from '@/constants/learner';
import { useLearnerDashboardT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';

interface TypeMeta {
  icon: React.ElementType;
  bg: string;
  fg: string;
}

const TYPE_META: Record<UpNextItemType, TypeMeta> = {
  lesson: {
    icon: BookOpen,
    bg: 'bg-brand-gold/10 dark:bg-brand-gold/20',
    fg: 'text-brand-gold',
  },
  quiz: {
    icon: FileQuestion,
    bg: 'bg-brand-gold/10 dark:bg-brand-gold/20',
    fg: 'text-brand-gold',
  },
  assignment: {
    icon: ClipboardList,
    bg: 'bg-brand-gold/10 dark:bg-brand-gold/20',
    fg: 'text-brand-gold',
  },
};

export default function UpNextPanel() {
  const t = useLearnerDashboardT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        'border-border bg-card rounded-2xl border p-5 shadow-sm transition-all duration-500 ease-out',
        entranceClass(inView, 'sm'),
      )}
      style={entranceStyle(inView, 80)}
    >
      <h3 className="text-foreground mb-4 text-base font-bold">
        {t('upNext')}
      </h3>

      <div className="space-y-1">
        {UP_NEXT_ITEMS.map((item, i) => {
          const { icon: Icon, bg, fg } = TYPE_META[item.type];

          return (
            <div
              key={item.id}
              className={cn(
                'transition-all duration-500 ease-out',
                entranceClass(inView, 'sm'),
              )}
              style={entranceStyle(inView, 120 + i * 60)}
            >
              <Link
                href={item.href}
                className="group hover:bg-muted flex items-center gap-3 rounded-xl p-3 transition-all duration-150 hover:-translate-x-0.5"
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110',
                    bg,
                  )}
                >
                  <Icon className={cn('h-4 w-4', fg)} aria-hidden />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                    {t(`upNextItems.${item.id}.label`)}
                  </p>
                  <p className="text-foreground group-hover:text-brand-gold mt-0.5 truncate text-sm font-semibold transition-colors duration-150">
                    {t(`upNextItems.${item.id}.title`)}
                  </p>
                </div>

                <ChevronRight
                  className="text-muted-foreground/40 group-hover:text-brand-gold/60 h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
