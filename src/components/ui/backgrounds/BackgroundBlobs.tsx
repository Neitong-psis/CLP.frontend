export function BackgroundBlobs() {
  return (
    <>
      <div
        aria-hidden
        className="bg-brand-gold/6 motion-safe:animate-fade-in pointer-events-none absolute -top-40 -right-40 h-150 w-150 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-brand-navy/6 motion-safe:animate-fade-in pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl motion-safe:delay-200"
      />
    </>
  );
}
