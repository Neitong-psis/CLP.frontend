import HeroSection from '@/components/pages/landing/HeroSection';
import StatsBar from '@/components/pages/landing/statBar/StatsBar';
import ProgramsSection from '@/components/pages/landing/ProgramSection';
import WhyChooseUsSection from '@/components/pages/landing/WhyChooseUs';
import TestimonialsSection from '@/components/pages/landing/Testimonial';
import CTASection from '@/components/pages/landing/CtaSection';

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
