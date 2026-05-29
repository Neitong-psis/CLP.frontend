import { BackgroundBlobs } from '@/components/ui/backgrounds/BackgroundBlobs';
import { HeroContent } from './HeroContent';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden bg-white">
      <BackgroundBlobs />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,62,0.07)_1px,transparent_0)] mask-[radial-gradient(ellipse_60%_60%_at_50%_45%,#000_40%,transparent_75%)] bg-size-[32px_32px]"
      />

      <div
        aria-hidden
        className="from-brand-gold/6 pointer-events-none absolute inset-x-0 top-1/2 h-120 -translate-y-1/2 bg-linear-to-b to-transparent blur-2xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 lg:py-28">
        <HeroContent />
      </div>
    </section>
  );
}
