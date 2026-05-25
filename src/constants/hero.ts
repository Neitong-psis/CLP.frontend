export interface HeroStat {
  readonly value: string;
  readonly label: string;
  readonly emphasis?: 'navy' | 'gold' | 'white';
}

export interface HeroBadge {
  readonly eyebrow: string;
  readonly value: string;
  readonly ariaLabel: string;
}

export interface HeroCta {
  readonly label: string;
  readonly href: string;
}

export const HERO_CONTENT = {
  headline: {
    lead: "Shaping tomorrow's",
    highlight: 'leaders',
    tail: 'today.',
  },
  subhead:
    'Empowering the next generation through world-class Australian curriculum. Join thousands of young Cambodians mastering leadership and building their future.',
  primaryCta: {
    label: 'Explore Programs',
    href: '/programs',
  },
  secondaryCta: {
    label: 'Learn More',
    href: '/about',
  },
  testimonial: {
    quote:
      "AYLA didn't just teach me leadership — it transformed how I see my future.",
    badge: 'Student Story',
    author: {
      name: 'Sokha',
      initial: 'S',
      role: 'Class of 2025',
    },
    stats: [
      { value: '500+', label: 'Graduates', emphasis: 'white' },
      { value: '4.9 ★', label: 'Family Rating', emphasis: 'gold' },
    ] as readonly HeroStat[],
  },
  enrollmentBadge: {
    eyebrow: 'Now Enrolling',
    value: 'Spring 2026',
    ariaLabel: 'Now enrolling for Spring 2026',
  } as const satisfies HeroBadge,
  accreditationBadge: {
    eyebrow: 'Accredited',
    value: 'Australian Standard',
    ariaLabel: 'Accredited to Australian Standard',
  } as const satisfies HeroBadge,
} as const;
