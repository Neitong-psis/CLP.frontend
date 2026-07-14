import Link from 'next/link';
import Logo from '@/components/common/Logo';

export default function LeftPanel() {
  return (
    <div className="3xl:w-[38%] 3xl:p-28 bg-brand-navy relative hidden flex-col items-center overflow-hidden p-10 lg:flex lg:w-[44%] lg:flex-none xl:w-[42%] xl:p-14 2xl:w-[40%] 2xl:p-20">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="3xl:h-[900px] 3xl:w-[900px] bg-brand-gold/10 pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full blur-3xl 2xl:h-175 2xl:w-175"
      />
      <div
        aria-hidden
        className="3xl:h-[800px] 3xl:w-[800px] bg-brand-gold/5 pointer-events-none absolute -right-20 -bottom-40 h-100 w-100 rounded-full blur-3xl 2xl:h-150 2xl:w-150"
      />

      {/* Centered content block — flex-1 so it yields space to the copyright
          sibling below instead of centering blindly and risking overlap. */}
      <div className="3xl:space-y-14 relative flex flex-1 flex-col items-center justify-center space-y-10 text-center lg:space-y-[clamp(1rem,4vh,2.5rem)] 2xl:space-y-12">
        {/* Logo */}
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          aria-label="Go to homepage"
        >
          <Logo
            variant="light"
            size="lg"
            className="3xl:h-28 h-16 xl:h-20 2xl:h-24"
          />
        </Link>

        {/* Hero copy */}
        <div className="3xl:space-y-10 space-y-6 2xl:space-y-8">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="bg-brand-gold h-px w-8" />
            <span className="3xl:text-sm text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase 2xl:text-xs">
              Welcome back
            </span>
            <span className="bg-brand-gold h-px w-8" />
          </div>

          <h1 className="3xl:text-7xl text-4xl leading-[1.1] font-bold tracking-tight text-white xl:text-5xl 2xl:text-6xl">
            Excellence in
            <br />
            Education
          </h1>

          <p className="3xl:text-xl mx-auto max-w-[26ch] text-base leading-relaxed text-white/55 2xl:text-lg">
            Empowering young leaders through world-class curriculum and
            innovative learning.
          </p>
        </div>
      </div>

      {/* Copyright — normal flow (not absolute), so it can never overlap the
          content above it on short viewports; it just claims its own row. */}
      <p className="relative mt-4 text-xs text-white/25 2xl:text-sm">
        © {new Date().getFullYear()} QBTech. All rights reserved.
      </p>
    </div>
  );
}
