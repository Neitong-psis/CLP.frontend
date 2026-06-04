'use client';

import { FEATURES } from '@/constants/homepage';
import { type LucideIcon } from 'lucide-react';
import SectionHeader from './HeaderSection';

// ─── Per-feature illustrations (light palette) ───────────────────────────────

const ILLUSTRATIONS = [
  // Expert Mentors — people nodes connected
  <svg
    key="mentors"
    viewBox="0 0 280 180"
    fill="none"
    className="h-full w-full"
  >
    <circle
      cx="80"
      cy="90"
      r="42"
      fill="#00003e08"
      stroke="#00003e0f"
      strokeWidth="1"
    />
    <circle
      cx="80"
      cy="90"
      r="27"
      fill="#00003e0c"
      stroke="#00003e18"
      strokeWidth="1"
    />
    <circle
      cx="180"
      cy="58"
      r="32"
      fill="#00003e06"
      stroke="#00003e0c"
      strokeWidth="1"
    />
    <circle
      cx="180"
      cy="58"
      r="20"
      fill="#00003e0a"
      stroke="#00003e15"
      strokeWidth="1"
    />
    <circle
      cx="224"
      cy="128"
      r="24"
      fill="#00003e06"
      stroke="#00003e0c"
      strokeWidth="1"
    />
    <circle
      cx="224"
      cy="128"
      r="14"
      fill="#00003e0a"
      stroke="#00003e15"
      strokeWidth="1"
    />
    <line
      x1="107"
      y1="80"
      x2="152"
      y2="66"
      stroke="#f4a30040"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
    <line
      x1="200"
      y1="72"
      x2="214"
      y2="110"
      stroke="#f4a30040"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
    <circle cx="80" cy="90" r="5" fill="#f4a300" opacity="0.7" />
    <circle cx="180" cy="58" r="4" fill="#f4a300" opacity="0.7" />
    <circle cx="224" cy="128" r="4" fill="#f4a300" opacity="0.7" />
  </svg>,

  // Hands-On Projects — task grid with highlighted cell
  <svg
    key="projects"
    viewBox="0 0 280 180"
    fill="none"
    className="h-full w-full"
  >
    {(
      [
        [28, 16],
        [96, 16],
        [164, 16],
        [232, 16],
        [28, 72],
        [96, 72],
        [164, 72],
        [232, 72],
        [28, 128],
        [96, 128],
        [164, 128],
        [232, 128],
      ] as [number, number][]
    ).map(([x, y], i) => (
      <rect
        key={i}
        x={x}
        y={y}
        width="52"
        height="40"
        rx="9"
        fill={i === 5 ? '#f4a30015' : '#00003e05'}
        stroke={i === 5 ? '#f4a30050' : '#00003e0f'}
        strokeWidth={i === 5 ? 1.5 : 1}
      />
    ))}
    <rect x="104" y="82" width="36" height="5" rx="2.5" fill="#f4a30070" />
    <rect x="104" y="92" width="26" height="4" rx="2" fill="#f4a30040" />
  </svg>,

  // Career-Focused — upward chart
  <svg key="career" viewBox="0 0 280 180" fill="none" className="h-full w-full">
    <line x1="30" y1="22" x2="30" y2="155" stroke="#00003e12" strokeWidth="1" />
    <line
      x1="30"
      y1="155"
      x2="258"
      y2="155"
      stroke="#00003e12"
      strokeWidth="1"
    />
    {[0, 1, 2, 3].map((i) => (
      <line
        key={i}
        x1="30"
        y1={155 - i * 42}
        x2="258"
        y2={155 - i * 42}
        stroke="#00003e08"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    ))}
    <polyline
      points="52,132 100,108 148,118 196,72 244,44"
      stroke="#00003e18"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="52,132 100,108 148,118 196,72 244,44"
      stroke="#f4a300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="6 3"
      opacity="0.7"
    />
    {(
      [
        [52, 132],
        [100, 108],
        [148, 118],
        [196, 72],
        [244, 44],
      ] as [number, number][]
    ).map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="5" fill="#f4a300" opacity="0.8" />
    ))}
  </svg>,

  // Certificates — layered badge
  <svg key="certs" viewBox="0 0 280 180" fill="none" className="h-full w-full">
    <rect
      x="85"
      y="20"
      width="110"
      height="90"
      rx="12"
      fill="#00003e05"
      stroke="#00003e10"
      strokeWidth="1"
    />
    <rect
      x="95"
      y="30"
      width="90"
      height="70"
      rx="8"
      fill="#00003e04"
      stroke="#f4a30025"
      strokeWidth="1"
    />
    <circle
      cx="140"
      cy="68"
      r="22"
      fill="#f4a30012"
      stroke="#f4a30040"
      strokeWidth="1.5"
    />
    <circle
      cx="140"
      cy="68"
      r="13"
      fill="#f4a30020"
      stroke="#f4a30055"
      strokeWidth="1"
    />
    <line
      x1="112"
      y1="114"
      x2="126"
      y2="148"
      stroke="#f4a30040"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="168"
      y1="114"
      x2="154"
      y2="148"
      stroke="#f4a30040"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="108" y="44" width="64" height="6" rx="3" fill="#00003e10" />
    <rect x="116" y="57" width="48" height="5" rx="2" fill="#00003e08" />
    <rect x="122" y="69" width="36" height="5" rx="2" fill="#00003e08" />
  </svg>,
];

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  const accents = [
    'bg-brand-gold/10 text-brand-gold ring-brand-gold/20 group-hover:bg-brand-gold group-hover:text-white',
    'bg-indigo-50 text-indigo-500 ring-indigo-200/60 group-hover:bg-indigo-500 group-hover:text-white',
    'bg-emerald-50 text-emerald-600 ring-emerald-200/60 group-hover:bg-emerald-500 group-hover:text-white',
    'bg-brand-navy/8 text-brand-navy ring-brand-navy/15 group-hover:bg-brand-navy group-hover:text-white',
  ];

  return (
    <div className="group border-brand-navy/8 hover:shadow-brand-navy/10 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {/* Illustration area */}
      <div className="relative h-44 w-full overflow-hidden bg-[#f4f5f9] p-3 pb-0">
        <div className="h-full w-full overflow-hidden rounded-xl bg-white/80">
          {ILLUSTRATIONS[index % ILLUSTRATIONS.length]}
        </div>
        {/* Icon badge */}
        <div
          className={`absolute bottom-0 left-1/2 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full shadow-md ring-[3px] ring-white transition-all duration-300 ${accents[index % accents.length]}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2 px-5 pt-10 pb-6 text-center">
        <h3 className="text-brand-navy text-[15px] leading-snug font-bold">
          {title}
        </h3>
        <p className="text-brand-navy/55 text-[13px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section className="bg-[#f8f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why AYLA"
          title="Built different. Built for you."
          description="Four reasons our students consistently outperform their peers."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
