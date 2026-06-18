'use client';

import { LayoutDashboard, BookOpen, Users, BarChart3 } from 'lucide-react';
import { useNavT, useEducatorT } from '@/i18n';
import {
  MobileBottomNav,
  type BottomNavItem,
} from '@/components/common/MobileBottomNav';

export function EducatorMobileNav() {
  const tNav = useNavT();
  const tEducator = useEducatorT();

  const items: BottomNavItem[] = [
    { href: '/educator', icon: LayoutDashboard, label: tNav('dashboard') },
    {
      href: '/educator/courses',
      icon: BookOpen,
      label: tEducator('myCourses'),
    },
    { href: '/educator/students', icon: Users, label: tEducator('students') },
    {
      href: '/educator/analytics',
      icon: BarChart3,
      label: tEducator('analytics'),
    },
  ];

  return <MobileBottomNav items={items} rootHref="/educator" />;
}
