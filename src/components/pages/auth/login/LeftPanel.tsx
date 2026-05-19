import Logo from "@/components/common/Logo";

export default function LeftPanel() {
  return (
    <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-[#00003e] p-10 lg:flex lg:w-[44%] lg:flex-none xl:w-[42%] xl:p-14 2xl:w-[40%] 2xl:p-20 3xl:w-[38%] 3xl:p-28">
      {/* Dot-grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#f4a300]/10 blur-3xl 2xl:h-[700px] 2xl:w-[700px] 3xl:h-[900px] 3xl:w-[900px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-[#f4a300]/5 blur-3xl 2xl:h-[600px] 2xl:w-[600px] 3xl:h-[800px] 3xl:w-[800px]"
      />

      {/* Centered content block */}
      <div className="relative flex flex-col items-center space-y-10 text-center 2xl:space-y-12 3xl:space-y-14">
        {/* Logo */}
        <Logo
          variant="light"
          size="lg"
          className="!w-[260px] xl:!w-[300px] 2xl:!w-[340px] 3xl:!w-[400px]"
        />

        {/* Hero copy */}
        <div className="space-y-6 2xl:space-y-8 3xl:space-y-10">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#f4a300]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f4a300] 2xl:text-xs 3xl:text-sm">
              Welcome back
            </span>
            <span className="h-px w-8 bg-[#f4a300]" />
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white xl:text-5xl 2xl:text-6xl 3xl:text-7xl">
            Excellence in
            <br />
            Education
          </h1>

          <p className="mx-auto max-w-[26ch] text-base leading-relaxed text-white/55 2xl:text-lg 3xl:text-xl">
            Empowering young leaders through world-class curriculum and
            innovative learning.
          </p>
        </div>
      </div>

      {/* Copyright pinned to bottom-center */}
      <p className="absolute bottom-10 text-xs text-white/25 xl:bottom-14 2xl:bottom-20 2xl:text-sm 3xl:bottom-28 3xl:text-base">
        © {new Date().getFullYear()} AYLA. All rights reserved.
      </p>
    </div>
  );
}
