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
  { label: 'Courses', href: '/courses' },
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
        href: '/programs/advanced-leadership',
        description: 'Lead with confidence',
      },
      {
        label: 'Youth Excellence',
        href: '/programs/youth',
        description: 'Built for young leaders',
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
  { label: 'Advanced Leadership', href: '/programs/advanced-leadership' },
  { label: 'Youth Excellence', href: '/programs/youth' },
  { label: 'Innovative Learning', href: '/programs/innovative-learning' },
];

export const FOOTER_LEGAL_LINKS: readonly NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];
