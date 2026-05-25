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
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="h-px w-8 bg-[#f4a300]" />
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#f4a300] uppercase">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-[#f4a300]" />
      </div>
      <h2
        className={`text-3xl leading-tight font-bold tracking-tight sm:text-4xl ${
          isDark ? 'text-white' : 'text-[#00003e]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            isDark ? 'text-white/60' : 'text-[#00003e]/60'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
