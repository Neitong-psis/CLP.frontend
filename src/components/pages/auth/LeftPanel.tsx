import Logo from '@/components/common/Logo';
import { LEFT_PANEL_COPY } from '@/constants/auth';

export default function LeftPanel() {
  return (
    <div className="3xl:w-[38%] 3xl:p-28 bg-brand-navy relative hidden flex-col items-center justify-center overflow-hidden p-10 lg:flex lg:w-[44%] lg:flex-none xl:w-[42%] xl:p-14 2xl:w-[40%] 2xl:p-20">
      <div
        aria-hidden
        className="3xl:h-[900px] 3xl:w-[900px] bg-brand-gold/10 pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl 2xl:h-[700px] 2xl:w-[700px]"
      />
      <div
        aria-hidden
        className="3xl:h-[800px] 3xl:w-[800px] bg-brand-gold/5 pointer-events-none absolute -right-20 -bottom-40 h-[400px] w-[400px] rounded-full blur-3xl 2xl:h-[600px] 2xl:w-[600px]"
      />

      <div className="3xl:space-y-14 relative flex flex-col items-center space-y-10 text-center 2xl:space-y-12">
        <Logo
          variant="light"
          size="lg"
          className="3xl:!w-[400px] !w-[260px] xl:!w-[300px] 2xl:!w-[340px]"
        />

        <div className="3xl:space-y-10 space-y-6 2xl:space-y-8">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="bg-brand-gold h-px w-8" />
            <span className="3xl:text-sm text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase 2xl:text-xs">
              {LEFT_PANEL_COPY.badge}
            </span>
            <span className="bg-brand-gold h-px w-8" />
          </div>

          <h1 className="3xl:text-7xl text-4xl leading-[1.1] font-bold tracking-tight text-white xl:text-5xl 2xl:text-6xl">
            Excellence in
            <br />
            Education
          </h1>

          <p className="3xl:text-xl mx-auto max-w-[26ch] text-base leading-relaxed text-white/55 2xl:text-lg">
            {LEFT_PANEL_COPY.sub}
          </p>
        </div>
      </div>

      <p className="3xl:bottom-28 3xl:text-base absolute bottom-10 text-xs text-white/25 xl:bottom-14 2xl:bottom-20 2xl:text-sm">
        © {new Date().getFullYear()} {LEFT_PANEL_COPY.copyrightOwner}. All
        rights reserved.
      </p>
    </div>
  );
}
