import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Target,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* ───────── Types ───────── */

export interface Stat       { readonly value: string; readonly label: string; }
export interface Program    { readonly title: string; readonly description: string; readonly icon: LucideIcon; readonly href: string; readonly tag: string; }
export interface Feature    { readonly title: string; readonly description: string; readonly icon: LucideIcon; }
export interface Testimonial{ readonly quote: string; readonly name: string; readonly role: string; }
export interface FAQItem    { readonly question: string; readonly answer: string; }
export interface TrustBadge { readonly label: string; }
export interface PricingTier{
  readonly name: string;
  readonly price: string;
  readonly period: string;
  readonly description: string;
  readonly perks: readonly string[];
  readonly highlight?: boolean;
  readonly cta: string;
}

/* ───────── Data ───────── */

export const TRUST_BADGES: readonly TrustBadge[] = [
  { label: "Cambridge" },
  { label: "ACARA"     },
  { label: "ISO 9001"  },
  { label: "UNICEF"    },
  { label: "British Council" },
];

export const HERO_STATS: readonly Stat[] = [
  { value: "95%",    label: "Student Satisfaction" },
  { value: "120+",   label: "Courses Available"    },
  { value: "30K+",   label: "Active Learners"      },
  { value: "50+",    label: "Countries Reached"    },
];

export const PROGRAMS: readonly Program[] = [
  {
    title: "Foundation Program",
    description: "Build core leadership skills with our Australian-accredited curriculum designed for emerging youth.",
    icon: BookOpen,
    href: "/programs/foundation",
    tag: "Ages 13–15",
  },
  {
    title: "Advanced Leadership",
    description: "Master strategic thinking, public speaking, and project management through immersive workshops.",
    icon: Target,
    href: "/programs/advanced",
    tag: "Ages 16–18",
  },
  {
    title: "Youth Excellence",
    description: "Accelerated pathway combining leadership training with university prep and international exchange.",
    icon: Sparkles,
    href: "/programs/youth",
    tag: "Top 5%",
  },
];

export const FEATURES: readonly Feature[] = [
  { title: "Expert Mentors",           description: "Learn from industry leaders, professors, and certified educators who've walked the path.",       icon: Users        },
  { title: "Hands-On Projects",        description: "Apply leadership skills in real community projects with measurable impact.",                     icon: Target       },
  { title: "Career-Focused Curriculum",description: "Every module ties back to skills universities and employers actually look for.",                 icon: GraduationCap},
  { title: "Recognized Certificates",  description: "ISO 9001 institution with credentials accepted by 200+ partner universities.",                   icon: Award        },
];

export const LEARNING_OUTCOMES: readonly string[] = [
  "Structured, Ready-To-Use Curriculum",
  "Hands-On Project Experience",
  "Real-World Case Studies",
  "Performance Tracking & Feedback",
  "Flexible Learning Schedule",
  "Career-Focused Assignments",
];

export const SKILLS_GAINED: readonly string[] = [
  "Step-by-Step Guided Lessons",
  "Practical, Skill-Based Training",
  "Clear Goals & Progress Milestones",
  "Industry-Relevant Knowledge",
  "Learn at Your Own Pace",
  "Job-Ready Confidence",
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote: "The lessons are practical and easy to follow. AYLA helped me build real-world skills and open up my career direction.",
    name: "Sokha Chan",
    role: "Class of 2025, Advanced Leadership",
  },
  {
    quote: "The mentors here genuinely care. I gained skills I couldn't have learned anywhere else in the region.",
    name: "Phally Norn",
    role: "Class of 2024, Youth Excellence",
  },
  {
    quote: "From shy student to council president — AYLA built my confidence one workshop at a time.",
    name: "Dara Kem",
    role: "Class of 2025, Foundation Program",
  },
];

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    name: "Foundation",
    price: "$19",
    period: "/ month",
    description: "Perfect for students starting their leadership journey.",
    perks: [
      "Access to selected courses",
      "Community access",
      "Downloadable resources",
      "Certificate upon completion",
    ],
    cta: "Get Started",
  },
  {
    name: "Advanced",
    price: "$39",
    period: "/ month",
    description: "For learners who want full access and practical projects.",
    perks: [
      "Access to all courses",
      "Hands-on projects",
      "1-on-1 mentor sessions",
      "Priority support",
      "Live workshops",
    ],
    highlight: true,
    cta: "Most Popular",
  },
  {
    name: "Cohort",
    price: "$99",
    period: "/ month",
    description: "For small teams and organizations training together.",
    perks: [
      "Everything in Advanced",
      "Team dashboard",
      "Progress tracking",
      "Admin management",
      "Dedicated support",
    ],
    cta: "Contact Us",
  },
];

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    question: "Who can enroll in AYLA programs?",
    answer:  "Anyone aged 13–18 who's looking to build leadership skills. We welcome students from all backgrounds.",
  },
  {
    question: "Do I get a certificate after completion?",
    answer:  "Yes — every completed program awards an Australian-accredited certificate recognized by 200+ universities.",
  },
  {
    question: "Do I get lifetime access to the courses?",
    answer:  "Yes, enrolled students retain full access to course materials and updates for life.",
  },
  {
    question: "Are the courses beginner friendly?",
    answer:  "Absolutely. Our Foundation Program assumes zero prior experience and builds up step by step.",
  },
];
