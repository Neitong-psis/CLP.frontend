import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import HeroSection from '@/feature/landing/HeroSection';
import StatsBar from '@/feature/landing/statBar/StatsBar';
import ProgramsSection from '@/feature/landing/ProgramSection';
import TestimonialsSection from '@/feature/landing/Testimonial';
import CTASection from '@/feature/landing/CtaSection';
import TrustedBy from '@/feature/landing/TrustedBy';
import NewsSection from '@/feature/landing/NewsSection';
import FaqSection from '@/feature/landing/FaqSection';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden scroll-smooth bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustedBy />
        <StatsBar />
        <ProgramsSection />
        {/* <WhyChooseUsSection /> */}
        <NewsSection />
        <TestimonialsSection />
        <FaqSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
