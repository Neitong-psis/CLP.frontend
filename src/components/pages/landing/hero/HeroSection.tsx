import { BackgroundBlobs } from '@/components/ui/backgrounds/BackgroundBlobs';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <BackgroundBlobs />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <HeroContent />
        <HeroVisual />
      </div>
    </section>
  );
}
