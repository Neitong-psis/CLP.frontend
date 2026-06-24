import Logo from '@/components/common/Logo';

export default function LeftPanel() {
  return (
    <div className="3xl:w-[38%] 3xl:p-28 bg-brand-navy relative hidden flex-col items-center justify-center overflow-hidden p-10 lg:flex lg:w-[44%] lg:flex-none xl:w-[42%] xl:p-14 2xl:w-[40%] 2xl:p-20">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="3xl:h-[900px] 3xl:w-[900px] bg-brand-gold/10 pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full blur-3xl 2xl:h-175 2xl:w-175"
      />
      <div
        aria-hidden
        className="3xl:h-[800px] 3xl:w-[800px] bg-brand-gold/5 pointer-events-none absolute -right-20 -bottom-40 h-100 w-100 rounded-full blur-3xl 2xl:h-150 2xl:w-150"
      />

      {/* Centered content block */}
      <div className="3xl:space-y-14 relative flex flex-col items-center space-y-10 text-center 2xl:space-y-12">
        {/* Logo */}
        <Logo
          variant="light"
          size="lg"
          className="3xl:!w-[400px] w-65! xl:w-75! 2xl:w-85!"
        />

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

      {/* Copyright pinned to bottom-center */}
      <p className="3xl:bottom-28 3xl:text-base absolute bottom-10 text-xs text-white/25 xl:bottom-14 2xl:bottom-20 2xl:text-sm">
        © {new Date().getFullYear()} QBTech. All rights reserved.
      </p>
    </div>
  );
}
