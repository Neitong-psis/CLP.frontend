import AdminLoginForm from '@/components/pages/admin/components/auth/AdminLoginForm';
import Logo from '@/components/common/Logo';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* Left panel */}
      <div className="3xl:w-[38%] 3xl:p-28 bg-brand-navy relative hidden flex-col items-center justify-center overflow-hidden *:p-10 lg:flex lg:w-[44%] lg:flex-none xl:w-[42%] xl:p-14 2xl:w-[40%] 2xl:p-20">
        <div
          aria-hidden
          className="bg-brand-gold/10 pointer-events-none absolute -top-40 -left-40 h-125 w-125 rounded-full blur-3xl 2xl:h-175 2xl:w-175"
        />
        <div
          aria-hidden
          className="bg-brand-gold/5 pointer-events-none absolute -right-20 -bottom-40 h-100 w-100 rounded-full blur-3xl 2xl:h-175 2xl:w-175"
        />
        <div className="relative flex flex-col items-center space-y-10 text-center 2xl:space-y-12">
          <Logo
            variant="light"
            size="lg"
            className="3xl:!w-[400px] w-65! xl:w-75! 2xl:w-85!"
          />
          <div className="space-y-6 2xl:space-y-8">
            <div className="inline-flex items-center justify-center gap-2">
              <span className="bg-brand-gold h-px w-8" />
              <span className="text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase 2xl:text-xs">
                Admin Portal
              </span>
              <span className="bg-brand-gold h-px w-8" />
            </div>
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-white xl:text-5xl 2xl:text-6xl">
              Platform
              <br />
              Administration
            </h1>
            <p className="mx-auto max-w-[26ch] text-base leading-relaxed text-white/55 2xl:text-lg">
              Manage courses, users, and platform settings from one place.
            </p>
          </div>
        </div>
        <p className="absolute bottom-10 text-xs text-white/25 xl:bottom-14 2xl:bottom-20 2xl:text-sm">
          © {new Date().getFullYear()} AYLA. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div className="3xl:px-28 bg-brand-navy flex w-full flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:overflow-hidden lg:px-10 xl:px-14 2xl:px-20">
        <div className="3xl:max-w-[640px] w-full max-w-100 sm:max-w-115 lg:max-w-110 xl:max-w-120 2xl:max-w-135">
          {/* Mobile logo */}
          <div className="mb-6 flex justify-center lg:hidden">
            <Logo variant="light" size="md" className="w-35! sm:w-45!" />
          </div>

          <div className="3xl:px-16 3xl:py-14 rounded-lg bg-white px-5 py-6 sm:px-7 sm:py-7 xl:px-12 xl:py-9 2xl:px-14 2xl:py-12">
            <div className="mb-5 2xl:mb-6">
              <h2 className="3xl:text-4xl text-brand-navy text-xl leading-tight font-bold sm:text-[1.6rem] 2xl:text-3xl">
                Admin Sign In
              </h2>
              <p className="3xl:text-lg text-brand-navy/45 mt-1.5 text-sm 2xl:mt-2 2xl:text-base">
                Enter your admin credentials to access the dashboard
              </p>
            </div>
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
