export interface NavSubLink {
  readonly label: string;
  readonly href: string;
  readonly description: string;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavSubLink[];
}

export const NAV_LINKS: readonly NavLink[] = [
  {
    label: 'Courses',
    href: '/courses',
    children: [
      {
        label: 'All Courses',
        href: '/courses',
        description: 'Browse the full catalog',
      },
      {
        label: 'Featured',
        href: '/courses/featured',
        description: 'Top-rated picks',
      },
      {
        label: 'By Category',
        href: '/courses/categories',
        description: 'Explore by topic',
      },
    ],
  },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      {
        label: 'Foundation',
        href: '/programs/foundation',
        description: 'Core skills for beginners',
      },
      {
        label: 'Advanced Leadership',
        href: '/programs/advanced',
        description: 'Lead with confidence',
      },
      {
        label: 'Youth Excellence',
        href: '/programs/youth',
        description: 'Built for young leaders',
      },
      {
        label: 'Alumni Network',
        href: '/programs/alumni',
        description: 'Stay connected',
      },
    ],
  },
  { label: 'About', href: '/about' },
];

export const FOOTER_QUICK_LINKS: readonly NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Programs', href: '/programs' },
  { label: 'About Us', href: '/about' },
];

export const FOOTER_PROGRAMS: readonly NavLink[] = [
  { label: 'Foundation Program', href: '/programs/foundation' },
  { label: 'Advanced Leadership', href: '/programs/advanced' },
  { label: 'Youth Excellence', href: '/programs/youth' },
  { label: 'Alumni Network', href: '/programs/alumni' },
];

export const FOOTER_LEGAL_LINKS: readonly NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];
