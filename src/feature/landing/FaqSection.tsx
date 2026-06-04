'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS, type FAQItem } from '@/constants/homepage';
import SectionHeader from './HeaderSection';

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-brand-navy/20 shadow-brand-navy/8 bg-white shadow-md' : 'border-brand-navy/8 hover:border-brand-navy/15 bg-white'}`}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`text-[15px] leading-snug font-semibold transition-colors duration-200 ${isOpen ? 'text-brand-navy' : 'text-brand-navy/80 group-hover:text-brand-navy'}`}
        >
          {item.question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-brand-navy text-white' : 'bg-brand-navy/8 text-brand-navy/50 group-hover:bg-brand-navy/12'}`}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      {/* Animated answer panel */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="text-brand-navy/55 px-6 pb-5 text-sm leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-[#f8f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions? We've got answers."
          description="Everything you need to know before enrolling in an AYLA program."
        />

        <div className="mt-12 flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
