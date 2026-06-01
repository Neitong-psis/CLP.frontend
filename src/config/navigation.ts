import type { NavLink } from '@/types/navigation';

export const NAV_LINKS = [
  { label: 'Courses', href: '/courses' },
  { label: 'Programs', href: '/programs' },
  { label: 'About', href: '/about' },
] as const satisfies readonly NavLink[];

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Programs', href: '/programs' },
  { label: 'About Us', href: '/about' },
] as const satisfies readonly NavLink[];

export const FOOTER_PROGRAMS = [
  { label: 'Foundation Program', href: '/programs/foundation' },
  { label: 'Advanced Leadership', href: '/programs/advanced' },
  { label: 'Youth Excellence', href: '/programs/youth' },
  { label: 'Alumni Network', href: '/programs/alumni' },
] as const satisfies readonly NavLink[];

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Support', href: '/support' },
] as const satisfies readonly NavLink[];
