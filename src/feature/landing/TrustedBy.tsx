'use client';

import { useEffect, useRef, type ReactElement } from 'react';

// All logos render into a fixed 120×40 viewBox so they're visually the same
// weight in the marquee — no giant Cambridge dwarfing tiny ACARA.
const FIXED_W = 120;
const FIXED_H = 40;

function CambridgeLogo(): ReactElement {
  return (
    <svg
      viewBox={`0 0 ${FIXED_W} ${FIXED_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cambridge"
    >
      <text
        x="60"
        y="18"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="13"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="0.5"
      >
        CAMBRIDGE
      </text>
      <text
        x="60"
        y="34"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="9"
        fontStyle="italic"
        fill="currentColor"
        opacity="0.65"
      >
        ASSESSMENT
      </text>
    </svg>
  );
}

function MoeysLogo(): ReactElement {
  return (
    <svg
      viewBox={`0 0 ${FIXED_W} ${FIXED_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MoEYS"
    >
      <text
        x="60"
        y="24"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="20"
        fontWeight="800"
        fill="currentColor"
        letterSpacing="0.5"
      >
        MoEYS
      </text>
      <text
        x="60"
        y="35"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="7.5"
        fill="currentColor"
        opacity="0.55"
      >
        Cambodia
      </text>
    </svg>
  );
}

function StemLogo(): ReactElement {
  return (
    <svg
      viewBox={`0 0 ${FIXED_W} ${FIXED_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="STEM Alliance"
    >
      <text
        x="60"
        y="22"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="17"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="1"
      >
        STEM
      </text>
      <text
        x="60"
        y="34"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="11"
        fontWeight="400"
        fill="currentColor"
        opacity="0.7"
      >
        Alliance
      </text>
    </svg>
  );
}

function IeltsLogo(): ReactElement {
  return (
    <svg
      viewBox={`0 0 ${FIXED_W} ${FIXED_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IELTS"
    >
      <polygon points="12,8 16,18 8,18" fill="currentColor" opacity="0.85" />
      <text
        x="26"
        y="20"
        fontFamily="Arial,sans-serif"
        fontSize="14"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="1"
      >
        IELTS
      </text>
      <text
        x="26"
        y="32"
        fontFamily="Arial,sans-serif"
        fontSize="7.5"
        fill="currentColor"
        opacity="0.55"
      >
        Official Partner
      </text>
    </svg>
  );
}

const LOGOS: { name: string; Component: () => ReactElement }[] = [
  { name: 'Cambridge', Component: CambridgeLogo },
  { name: 'IELTS', Component: IeltsLogo },
  { name: 'MoEYS', Component: MoeysLogo },
  { name: 'STEM Alliance', Component: StemLogo },
];

export default function TrustedBy() {
  const groupRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // After mount, read the exact pixel width of one group and drive the
  // animation with a CSS custom property — no rounding, no -50% guessing.
  useEffect(() => {
    const group = groupRef.current;
    const track = trackRef.current;
    if (!group || !track) return;

    const w = group.getBoundingClientRect().width;
    track.style.setProperty('--marquee-w', `${w}px`);
  }, []);

  return (
    <section className="bg-[#f8f9fc] py-8">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2">
          <span className="bg-brand-gold h-px w-6 sm:w-8" />
          <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase sm:text-[11px]">
            Partnered With
          </span>
          <span className="bg-brand-gold h-px w-6 sm:w-8" />
        </div>
      </div>

      {/* <div className="mx-auto mb-6 h-px w-24 bg-brand-navy/30" /> */}

      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-[#f8f9fc] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-[#f8f9fc] to-transparent"
        />

        {/*
          The track holds two identical groups. The CSS custom property
          --marquee-w is set by useEffect to the exact pixel width of group 1.
          The keyframe translates by that exact amount, then snaps back to 0.
          Because group 2 is identical the snap is invisible — true infinite loop.
        */}
        <div
          ref={trackRef}
          className="flex items-center"
          style={{
            animation: 'marquee-px 30s linear infinite',
            willChange: 'transform',
          }}
        >
          {/* Group 1 — measured */}
          <div ref={groupRef} className="flex shrink-0 items-center">
            {LOGOS.map(({ name, Component }) => (
              <div
                key={name}
                className="flex shrink-0 items-center justify-center px-10"
              >
                <div style={{ width: FIXED_W, height: FIXED_H }}>
                  <Component />
                </div>
              </div>
            ))}
          </div>

          {/* Group 2 — exact duplicate, aria-hidden */}
          <div aria-hidden className="flex shrink-0 items-center">
            {LOGOS.map(({ name, Component }) => (
              <div
                key={name}
                className="flex shrink-0 items-center justify-center px-10"
              >
                <div style={{ width: FIXED_W, height: FIXED_H }}>
                  <Component />
                </div>
              </div>
            ))}
          </div>

          {/* Group 3 — extra padding at end, aria-hidden */}
          <div aria-hidden className="flex shrink-0 items-center">
            {LOGOS.map(({ name, Component }) => (
              <div
                key={name}
                className="flex shrink-0 items-center justify-center px-10"
              >
                <div style={{ width: FIXED_W, height: FIXED_H }}>
                  <Component />
                </div>
              </div>
            ))}
          </div>

          {/* Group 4 — extra padding at end, aria-hidden */}
          <div aria-hidden className="flex shrink-0 items-center">
            {LOGOS.map(({ name, Component }) => (
              <div
                key={name}
                className="flex shrink-0 items-center justify-center px-10"
              >
                <div style={{ width: FIXED_W, height: FIXED_H }}>
                  <Component />
                </div>
              </div>
            ))}
          </div>

          {/* Group 5 — extra padding at end, aria-hidden */}
          <div aria-hidden className="flex shrink-0 items-center">
            {LOGOS.map(({ name, Component }) => (
              <div
                key={name}
                className="flex shrink-0 items-center justify-center px-10"
              >
                <div style={{ width: FIXED_W, height: FIXED_H }}>
                  <Component />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-brand-navy/10" />
      </div> */}
    </section>
  );
}
