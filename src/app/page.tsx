import Link from "next/link";
import { ArrowRight, Play, Quote, Star } from "lucide-react";
import { BRAND } from "@/config/brand";
import {
  HERO_STATS,
  PROGRAMS,
  FEATURES,
  TESTIMONIALS,
} from "@/config/homepage";

import HeroSection from "@/components/pages/homepage/hero";
import StatsBar from "@/components/pages/homepage/statsBar";
import ProgramsSection from "@/components/pages/homepage/programSection";
import WhyChooseUsSection from "@/components/pages/homepage/whyChooseUsSection";
import TestimonialsSection from "@/components/pages/homepage/testimonial";
import CTASection from "@/components/pages/homepage/ctaSection";

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




