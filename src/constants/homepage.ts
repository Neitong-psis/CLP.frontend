import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Target,
  Sparkles,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

/* ───────── Types ───────── */

export interface Stat {
  readonly value: string;
  readonly label: string;
}
export interface Program {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly href: string;
  readonly tag: string;
  readonly image: string;
}
export interface Feature {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}
export interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
}
export interface FAQItem {
  readonly question: string;
  readonly answer: string;
}
export interface TrustBadge {
  readonly label: string;
}
export interface PricingTier {
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
  { label: 'Cambridge' },
  { label: 'ACARA' },
  { label: 'ISO 9001' },
  { label: 'UNICEF' },
  { label: 'British Council' },
];

export const HERO_STATS: readonly Stat[] = [
  { value: '95%', label: 'Student Satisfaction' },
  { value: '120+', label: 'Courses Available' },
  { value: '30K+', label: 'Active Learners' },
  { value: '50+', label: 'Countries Reached' },
];

export const PROGRAMS: readonly Program[] = [
  {
    title: 'Foundation Program',
    description:
      'Build core leadership skills with our Australian-accredited curriculum designed for emerging youth leaders.',
    icon: BookOpen,
    href: '/programs/foundation',
    tag: 'Ages 13–15',
    image: '/programs/Foundation_progrsm.png',
  },
  {
    title: 'Advanced Leadership',
    description:
      'Master strategic thinking, public speaking, and project management through immersive workshops.',
    icon: Target,
    href: '/programs/advanced-leadership',
    tag: 'Ages 16–18',
    image: '/programs/advanced_leadership.png',
  },
  {
    title: 'Innovative Learning',
    description:
      'Develop critical and creative thinking through hands-on design projects, prototyping, and inquiry-based learning.',
    icon: Lightbulb,
    href: '/programs/innovative-learning',
    tag: 'Innovation',
    image: '/programs/STEM.png',
  },
  {
    title: 'Youth Excellence',
    description:
      'Accelerated pathway combining leadership training with university prep and international exchange.',
    icon: Sparkles,
    href: '/programs/youth',
    tag: 'Top 5%',
    image: '/programs/Youth.png',
  },
];

export const FEATURES: readonly Feature[] = [
  {
    title: 'Expert Mentors',
    description:
      "Learn from industry leaders, professors, and certified educators who've walked the path.",
    icon: Users,
  },
  {
    title: 'Hands-On Projects',
    description:
      'Apply leadership skills in real community projects with measurable impact.',
    icon: Target,
  },
  {
    title: 'Career-Focused Curriculum',
    description:
      'Every module ties back to skills universities and employers actually look for.',
    icon: GraduationCap,
  },
  {
    title: 'Recognized Certificates',
    description:
      'ISO 9001 institution with credentials accepted by 200+ partner universities.',
    icon: Award,
  },
];

export const LEARNING_OUTCOMES: readonly string[] = [
  'Structured, Ready-To-Use Curriculum',
  'Hands-On Project Experience',
  'Real-World Case Studies',
  'Performance Tracking & Feedback',
  'Flexible Learning Schedule',
  'Career-Focused Assignments',
];

export const SKILLS_GAINED: readonly string[] = [
  'Step-by-Step Guided Lessons',
  'Practical, Skill-Based Training',
  'Clear Goals & Progress Milestones',
  'Industry-Relevant Knowledge',
  'Learn at Your Own Pace',
  'Job-Ready Confidence',
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'The lessons are practical and easy to follow. AYLA helped me build real-world skills and open up my career direction.',
    name: 'Sokha Chan',
    role: 'Class of 2025, Advanced Leadership',
  },
  {
    quote:
      "The mentors here genuinely care. I gained skills I couldn't have learned anywhere else in the region.",
    name: 'Phally Norn',
    role: 'Class of 2024, Youth Excellence',
  },
  {
    quote:
      'From shy student to council president — AYLA built my confidence one workshop at a time.',
    name: 'Dara Kem',
    role: 'Class of 2025, Foundation Program',
  },
];

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    name: 'Foundation',
    price: '$19',
    period: '/ month',
    description: 'Perfect for students starting their leadership journey.',
    perks: [
      'Access to selected courses',
      'Community access',
      'Downloadable resources',
      'Certificate upon completion',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Advanced',
    price: '$39',
    period: '/ month',
    description: 'For learners who want full access and practical projects.',
    perks: [
      'Access to all courses',
      'Hands-on projects',
      '1-on-1 mentor sessions',
      'Priority support',
      'Live workshops',
    ],
    highlight: true,
    cta: 'Most Popular',
  },
  {
    name: 'Cohort',
    price: '$99',
    period: '/ month',
    description: 'For small teams and organizations training together.',
    perks: [
      'Everything in Advanced',
      'Team dashboard',
      'Progress tracking',
      'Admin management',
      'Dedicated support',
    ],
    cta: 'Contact Us',
  },
];

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    question: 'Who can enroll in AYLA programs?',
    answer:
      "Anyone aged 13–18 who's looking to build leadership skills. We welcome students from all backgrounds.",
  },
  {
    question: 'Do I get a certificate after completion?',
    answer:
      'Yes — every completed program awards an Australian-accredited certificate recognized by 200+ universities.',
  },
  {
    question: 'Do I get lifetime access to the courses?',
    answer:
      'Yes, enrolled students retain full access to course materials and updates for life.',
  },
  {
    question: 'Are the courses beginner friendly?',
    answer:
      'Absolutely. Our Foundation Program assumes zero prior experience and builds up step by step.',
  },
];

export type NewsCategory = 'Event' | 'News' | 'Achievement' | 'Announcement';

export interface NewsItem {
  readonly id: string;
  readonly category: NewsCategory;
  readonly date: string;
  readonly title: string;
  readonly excerpt: string;
  readonly readMin: number;
  readonly imageAlt: string;
  readonly source: string;
  readonly image?: string;
  readonly content?: string;
}

export interface NewsColumn {
  readonly heading: string;
  readonly href: string;
  readonly items: readonly NewsItem[];
}

export const NEWS_COLUMNS: readonly NewsColumn[] = [
  {
    heading: 'Latest News',
    href: '/news',
    items: [
      {
        id: 'innovation-challenge-2026',
        category: 'Event',
        date: 'Oct 15, 2026',
        title: 'AYLA Innovation Challenge 2026',
        excerpt:
          'Join our students as they showcase their latest design projects and community-impact prototypes to the community.',
        readMin: 3,
        imageAlt: 'Students presenting a project prototype on a table',
        source: 'AYLA Events',
        image: '/news/coding_challenge.png',
        content: `The AYLA Innovation Challenge 2026 is our most anticipated annual event, bringing together the brightest young minds across Cambodia to compete, collaborate, and create. This year's challenge invites students from all AYLA programs to build innovative projects using design thinking, storytelling, and community research.\n\nParticipants will have 48 hours to design, build, and present a working prototype that addresses a real-world problem in their community. Teams of two to four students will be guided by mentors throughout the competition, ensuring every participant walks away with new skills and knowledge.\n\n**What to expect:**\n- Live prototype demonstrations from Innovative Learning students\n- Leadership project showcases from Advanced Leadership teams\n- Community-impact presentations from Youth Excellence participants\n- Keynote address from Cambodia's leading education and civic innovators\n- Awards ceremony with scholarships and certificates\n\nThe event is open to the public. Parents, educators, and community leaders are warmly invited to attend and celebrate the achievements of our student innovators. Registration is free for all attendees.\n\nJoin us on October 15, 2026 at the AYLA Learning Centre, Phnom Penh. Doors open at 8:00 AM.`,
      },
      {
        id: 'scholarship-2027',
        category: 'News',
        date: 'Sep 28, 2026',
        title: 'New Scholarship Opportunities Announced',
        excerpt:
          'We are expanding our merit-based scholarships for the incoming 2027 high school cohort. Apply today.',
        readMin: 2,
        imageAlt: 'Students collaborating over books in a library',
        source: 'AYLA Admissions',
        image: '/news/scolarship.png',
        content: `AYLA is proud to announce a significant expansion of our merit-based scholarship programme for the 2027 academic year. In partnership with leading educational foundations and corporate sponsors across Southeast Asia, we are opening applications for three distinct scholarship tracks designed to remove financial barriers and reward academic excellence, leadership potential, and community impact.\n\nThis year's expansion represents our largest scholarship investment to date, with over $120,000 in total funding available across more than 80 individual awards. We believe that every motivated student in Cambodia deserves access to a world-class education — and these scholarships are a direct expression of that belief.\n\n**Available Scholarship Tracks:**\n\n**Academic Excellence Award** — Awarded to students with outstanding examination results. Recipients receive full tuition coverage for the academic year, priority enrolment, and a dedicated academic mentor.\n\n**Community Leadership Grant** — For students who demonstrate a measurable positive impact in their community. This scholarship recognises initiative, empathy, and the drive to lead beyond the classroom.\n\n**Financial Need Bursary** — Means-tested support for families facing economic hardship. Applications are reviewed confidentially, and awards cover up to 100% of programme fees plus learning materials.\n\n**Who Can Apply:**\n\nAll applicants must be enrolling in AYLA's 2027 cohort across our Innovative Learning, Advanced Leadership, or Youth Excellence programmes. Current AYLA students progressing to a higher level are also eligible to apply for renewal scholarships.\n\n**How to Apply:**\n\nApplications open on October 1, 2026 and close on November 30, 2026. Candidates must submit a completed application form, two letters of recommendation, a personal statement of no more than 500 words, and supporting documentation relevant to the chosen track.\n\nShortlisted candidates will be invited for a brief interview with our Admissions Committee in December, with results announced in January 2027.\n\nFor full eligibility criteria, required documents, and the application portal, visit the Scholarships page on the AYLA website or contact our Admissions Office directly. We encourage all eligible students to apply — do not let financial circumstances stand between you and the future you deserve.`,
      },
      {
        id: 'parent-teacher-meet',
        category: 'Event',
        date: 'Sep 10, 2026',
        title: 'Parent-Teacher Meet: Navigating MoEYS & Cambridge',
        excerpt:
          'Learn more about how we seamlessly integrate the national curriculum with our English International Program.',
        readMin: 2,
        imageAlt:
          'Teacher at a chalkboard with elementary students raising hands in class',
        source: 'AYLA Academic',
        content: `AYLA is hosting a special Parent-Teacher Meet on September 10, 2026, dedicated to helping families understand how our dual-curriculum model works — and why it gives our students a measurable advantage in both national examinations and international university admissions.\n\nMany parents ask how a school can teach two curricula at once without shortchanging either. The answer lies in deliberate integration. Our academic team has spent years mapping the Ministry of Education, Youth and Sport (MoEYS) national syllabus alongside the Cambridge International framework, identifying shared learning objectives and building a unified teaching plan that satisfies both standards simultaneously.\n\n**What you will learn at the session:**\n\n**Understanding MoEYS requirements** — We will walk through the national curriculum benchmarks that every Cambodian student must meet, and show exactly how our lesson plans address each requirement across all year levels.\n\n**How Cambridge adds value** — Cambridge International qualifications are recognised by universities in over 160 countries. We will explain the IGCSE and A-Level pathways available to AYLA students and what this means for higher education opportunities in Australia, the UK, Singapore, and beyond.\n\n**A day in the life of an AYLA student** — Our lead educators will present a sample weekly timetable, showing how English-medium instruction, Khmer-language subjects, and enrichment activities are balanced across the school week.\n\n**Your questions, answered** — The second half of the session is open Q&A with our Principal, Head of Curriculum, and class teachers. No question is too small — this is your time.\n\n**Session details:**\n\nDate: September 10, 2026\nTime: 9:00 AM – 11:30 AM\nVenue: AYLA Learning Centre, Main Hall, Phnom Penh\nLanguage: Khmer and English (simultaneous interpretation available)\n\nAttendance is free. Seats are limited, so we ask all families to register in advance through the AYLA parent portal or by contacting our front office. Light refreshments will be provided.\n\nWe look forward to welcoming you and building the partnership between home and school that our students deserve.`,
      },
      {
        id: 'spring-2026-enrollment',
        category: 'Announcement',
        date: 'May 28, 2026',
        title: 'Spring 2026 Enrollment Now Open — Limited Seats Available',
        excerpt:
          'Early applicants receive priority placement and a scholarship worth up to $1,200.',
        readMin: 3,
        imageAlt: 'Students walking into the AYLA campus on a bright morning',
        source: 'AYLA Admissions',
      },
      {
        id: 'cambridge-partnership',
        category: 'News',
        date: 'May 15, 2026',
        title: 'AYLA Deepens Cambridge International Partnership',
        excerpt:
          'Two new certified pathways now available for students across Cambodia.',
        readMin: 2,
        imageAlt:
          'AYLA and Cambridge representatives shaking hands at a signing ceremony',
        source: 'AYLA News',
      },
      {
        id: 'graduates-2025',
        category: 'Achievement',
        date: 'Apr 30, 2026',
        title: '98% of 2025 Graduates Accepted into University Programs',
        excerpt:
          'Graduates placed in institutions across Australia, the UK, and Southeast Asia.',
        readMin: 4,
        imageAlt:
          'Smiling graduates in cap and gown holding their certificates',
        source: 'AYLA Alumni',
      },
    ],
  },
  {
    heading: 'Upcoming Events',
    href: '/events',
    items: [
      {
        id: 'leadership-summit-2026',
        category: 'Event',
        date: 'Jun 12, 2026',
        title: 'Annual Youth Leadership Summit — Phnom Penh',
        excerpt:
          'Join 300+ young leaders for keynotes, workshops, and networking.',
        readMin: 2,
        imageAlt:
          'Large auditorium filled with young students at a leadership conference',
        source: 'AYLA Events',
      },
      {
        id: 'open-day-july',
        category: 'Event',
        date: 'Jul 5, 2026',
        title: 'Open Day — See AYLA From the Inside',
        excerpt:
          'Tour our facilities, meet faculty, and speak with current students and alumni.',
        readMin: 1,
        imageAlt: 'Prospective students touring the AYLA learning centre',
        source: 'AYLA Events',
      },
      {
        id: 'innovation-workshop',
        category: 'Event',
        date: 'Jul 20, 2026',
        title: 'Innovation Workshop for Secondary Students',
        excerpt:
          'A hands-on day of design challenges, prototyping, and community-research activities.',
        readMin: 2,
        imageAlt:
          'Students collaborating on a design project at a workshop table',
        source: 'Innovation Alliance',
      },
    ],
  },
  {
    heading: 'Student Achievements',
    href: '/achievements',
    items: [
      {
        id: 'iso-recertification',
        category: 'Achievement',
        date: 'Apr 10, 2026',
        title: 'AYLA Receives ISO 9001 Recertification for 2026–2028',
        excerpt:
          'Our quality management systems meet the highest international standards for another cycle.',
        readMin: 2,
        imageAlt: 'ISO 9001 certificate framed on an office wall',
        source: 'AYLA Quality Office',
      },
      {
        id: 'scholarship-winners',
        category: 'Achievement',
        date: 'Mar 18, 2026',
        title: 'Three AYLA Students Win National Youth Excellence Award',
        excerpt:
          'Recognised for outstanding contributions to community leadership and innovation.',
        readMin: 3,
        imageAlt:
          'Three students receiving trophy plaques on stage from a government official',
        source: 'AYLA Alumni',
      },
      {
        id: 'math-olympiad',
        category: 'Achievement',
        date: 'Feb 22, 2026',
        title: 'AYLA Team Places 2nd in ASEAN Mathematics Olympiad',
        excerpt:
          'Our team of four competed against 14 nations and secured a silver medal finish.',
        readMin: 2,
        imageAlt:
          'Four students holding a silver medal plaque in front of an ASEAN banner',
        source: 'AYLA Academic',
      },
    ],
  },
];
