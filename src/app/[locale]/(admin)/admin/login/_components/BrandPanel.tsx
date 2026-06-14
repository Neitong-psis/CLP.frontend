import Logo from '@/components/common/Logo';

export default function BrandPanel() {
  return (
    <div className="bg-brand-navy 3xl:w-[38%] 3xl:px-28 3xl:py-28 relative hidden flex-col items-center overflow-hidden lg:flex lg:w-[44%] lg:flex-none lg:px-10 lg:py-12 xl:w-[42%] xl:px-14 xl:py-16 2xl:w-[40%] 2xl:px-20 2xl:py-20">
      <div
        aria-hidden
        className="bg-brand-gold/10 pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full blur-3xl 2xl:h-175 2xl:w-175"
      />
      <div
        aria-hidden
        className="bg-brand-gold/5 pointer-events-none absolute -right-20 -bottom-40 h-100 w-100 rounded-full blur-3xl 2xl:h-175 2xl:w-175"
      />

      {/* Main content — flex-1 fills remaining height, justify-center vertically centers it */}
      <div className="relative flex flex-1 flex-col items-center justify-center space-y-6 text-center xl:space-y-10 2xl:space-y-12">
        <Logo
          variant="light"
          size="lg"
          className="3xl:!w-[400px] w-52! xl:w-72! 2xl:w-85!"
        />
        <div className="space-y-4 xl:space-y-6 2xl:space-y-8">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="bg-brand-gold h-px w-8" />
            <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase 2xl:text-xs">
              Admin Portal
            </span>
            <span className="bg-brand-gold h-px w-8" />
          </div>
          <h1 className="3xl:text-6xl text-[1.75rem] leading-[1.1] font-bold tracking-tight text-white xl:text-4xl 2xl:text-5xl">
            Platform
            <br />
            Administration
          </h1>
          <p className="mx-auto max-w-[26ch] text-sm leading-relaxed text-white/55 xl:text-base 2xl:text-lg">
            Manage courses, users, and platform settings from one place.
          </p>
        </div>
      </div>

      {/* Copyright sits in flex flow — can never overlap the content above */}
      <p className="relative mt-6 text-xs text-white/25 2xl:text-sm">
        © {new Date().getFullYear()} QBTech. All rights reserved.
      </p>
    </div>
  );
}
