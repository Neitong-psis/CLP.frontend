import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import HeroSection from '@/components/pages/landing/HeroSection';
import StatsBar from '@/components/pages/landing/statBar/StatsBar';
import ProgramsSection from '@/components/pages/landing/ProgramSection';
import WhyChooseUsSection from '@/components/pages/landing/WhyChooseUs';
import TestimonialsSection from '@/components/pages/landing/Testimonial';
import CTASection from '@/components/pages/landing/CtaSection';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden scroll-smooth bg-gray-50">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <ProgramsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
