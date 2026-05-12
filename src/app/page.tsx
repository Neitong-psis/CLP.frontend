export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          MOOC Platform
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Learn faster with curated courses and progress tracking.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          This is the starting point for the EduHub learning experience. Replace
          this section with featured courses, onboarding, and personalization.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Course discovery",
          "Adaptive learning paths",
          "Progress dashboards",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{item}</h2>
            <p className="mt-2 text-sm text-slate-600">
              Placeholder content to validate layout spacing and typography.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
