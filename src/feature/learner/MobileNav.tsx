'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Brain,
  TrendingUp,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/dashboard/my-learning', icon: BookOpen, label: 'Learning' },
  { href: '/dashboard/explore', icon: Compass, label: 'Explore' },
  { href: '/dashboard/quizzes', icon: Brain, label: 'Quizzes' },
  { href: '/dashboard/progress', icon: TrendingUp, label: 'Progress' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="pb-safe fixed right-0 bottom-0 left-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="flex">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active =
            pathname === href ||
            (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition-colors"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  active
                    ? 'bg-brand-gold/15 text-brand-gold'
                    : 'hover:text-brand-navy text-slate-400'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <span className={active ? 'text-brand-gold' : 'text-slate-400'}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
