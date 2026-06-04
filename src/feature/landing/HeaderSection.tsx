'use client';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  variant?: 'light' | 'dark';
}

export default function HeaderSection({
  eyebrow,
  title,
  description,
  variant = 'light',
}: SectionHeaderProps) {
  const isDark = variant === 'dark';
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 inline-flex items-center gap-2 sm:mb-3">
        <span className="bg-brand-gold h-px w-6 sm:w-8" />
        <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase sm:text-[11px]">
          {eyebrow}
        </span>
        <span className="bg-brand-gold h-px w-6 sm:w-8" />
      </div>
      <h2
        className={`text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl ${
          isDark ? 'text-white' : 'text-brand-navy'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed sm:mt-4 sm:text-base ${
            isDark ? 'text-white/60' : 'text-brand-navy/60'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
