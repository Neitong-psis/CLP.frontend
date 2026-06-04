import { HeroContent } from './hero/HeroContent';

export default function HeroSection() {
  return (
    <section className="bg-brand-navy relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gold radial glow — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-160 w-160 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(244,163,0,0.22) 0%, rgba(244,163,0,0.08) 40%, transparent 68%)',
        }}
      />

      {/* Indigo accent — bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-120 w-120 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 50%, transparent 72%)',
        }}
      />

      {/* Warm centre glow behind headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-96 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(244,163,0,0.09) 0%, transparent 100%)',
        }}
      />

      {/* Dot grid — fades out towards edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage:
            'radial-gradient(ellipse 70% 70% at 50% 42%, #000 25%, transparent 78%)',
        }}
      />

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="from-brand-navy pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t to-transparent"
      />

      {/*
        Padding accounts for the floating header at each breakpoint:
          mobile  : header ≈ 64px  → pt-24 (96px)
          sm/md   : header ≈ 72px  → pt-28 (112px)
          lg+     : header ≈ 80px  → pt-36 (144px)
        Bottom padding gives breathing room above the fold edge.
      */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10 lg:pb-32"
        style={{
          paddingTop: 'max(7rem, calc(6rem + env(safe-area-inset-top, 0px)))',
        }}
      >
        <HeroContent />
      </div>
    </section>
  );
}
