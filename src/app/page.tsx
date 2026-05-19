import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/pages/homepage/hero";
import StatsBar from "@/components/pages/homepage/statsBar";
import ProgramsSection from "@/components/pages/homepage/programSection";
import WhyChooseUsSection from "@/components/pages/homepage/whyChooseUsSection";
import TestimonialsSection from "@/components/pages/homepage/testimonial";
import CTASection from "@/components/pages/homepage/ctaSection";

export default function Home() {
  return (
    <>
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
    </>
  );
}
