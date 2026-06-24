function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 ${className ?? ''}`}
    />
  );
}

export function RightPanelSkeleton() {
  return (
    <div className="3xl:px-28 bg-brand-navy flex w-full flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:overflow-hidden lg:px-10 xl:px-14 2xl:px-20">
      <div className="3xl:max-w-[640px] w-full max-w-100 sm:max-w-115 lg:max-w-110 xl:max-w-120 2xl:max-w-135">
        {/* Mobile-only logo placeholder */}
        <div className="mb-6 flex justify-center lg:hidden">
          <div className="h-8 w-36 animate-pulse rounded-md bg-white/20" />
        </div>

        {/* Card */}
        <div className="3xl:px-16 3xl:py-14 rounded-2xl bg-white px-5 py-6 shadow-2xl shadow-black/40 sm:px-7 sm:py-7 xl:px-12 xl:py-9 2xl:rounded-3xl 2xl:px-14 2xl:py-12">
          {/* Heading */}
          <div className="mb-5 space-y-2.5 2xl:mb-6">
            <Shimmer className="h-7 w-3/4" />
            <Shimmer className="h-4 w-1/2 bg-slate-100" />
          </div>

          {/* Tab switcher */}
          <div className="mb-4 h-11 rounded-xl border border-slate-200 bg-slate-50 p-1 2xl:mb-5">
            <div className="flex h-full gap-1">
              <Shimmer className="flex-1 rounded-[10px] bg-white shadow-sm" />
              <Shimmer className="flex-1 rounded-[10px] bg-slate-100" />
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Shimmer className="h-3.5 w-10 bg-slate-300" />
              <Shimmer className="h-10 w-full bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Shimmer className="h-3.5 w-16 bg-slate-300" />
              <Shimmer className="h-10 w-full bg-slate-100" />
            </div>
            {/* Forgot password link */}
            <div className="flex justify-end">
              <Shimmer className="h-3 w-28 bg-slate-200" />
            </div>
          </div>

          {/* Submit button */}
          <Shimmer className="mt-5 h-11 w-full bg-slate-200" />

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <Shimmer className="h-3 w-4 bg-slate-200" />
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* OAuth buttons */}
          <div className="space-y-2.5">
            <Shimmer className="h-10 w-full bg-slate-100" />
            <Shimmer className="h-10 w-full bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
