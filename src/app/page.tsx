import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import HeroSection from '@/components/pages/landing/HeroSection';
import StatsBar from '@/components/pages/landing/statBar/StatsBar';
import ProgramsSection from '@/components/pages/landing/ProgramSection';
import TestimonialsSection from '@/components/pages/landing/Testimonial';
import CTASection from '@/components/pages/landing/CtaSection';
import TrustedBy from '@/components/pages/landing/TrustedBy';
import NewsSection from '@/components/pages/landing/NewsSection';
import FaqSection from '@/components/pages/landing/FaqSection';

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
