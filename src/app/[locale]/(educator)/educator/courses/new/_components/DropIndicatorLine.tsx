'use client';

export function DropIndicatorLine() {
  return (
    <div className="animate-in fade-in relative z-20 -my-1.5 h-3 duration-150">
      <div className="bg-brand-gold absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full" />
      <div className="bg-brand-gold shadow-brand-gold/60 absolute inset-x-2 top-1/2 h-0.5 -translate-y-1/2 rounded-full shadow-[0_0_6px_1px]" />
    </div>
  );
}
