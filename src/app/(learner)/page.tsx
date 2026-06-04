import HeroSection from '@/feature/landing/HeroSection';
import StatsBar from '@/feature/landing/statBar/StatsBar';
import ProgramsSection from '@/feature/landing/ProgramSection';
import WhyChooseUsSection from '@/feature/landing/WhyChooseUs';
import TestimonialsSection from '@/feature/landing/Testimonial';
import CTASection from '@/feature/landing/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ProgramsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
