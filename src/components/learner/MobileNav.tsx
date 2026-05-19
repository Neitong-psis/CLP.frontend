"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Compass,
  Trophy, ClipboardList, Award, Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/dashboard",              icon: LayoutDashboard },
  { label: "Learning",   href: "/dashboard/my-learning",  icon: BookOpen        },
  { label: "Explore",    href: "/dashboard/explore",      icon: Compass         },
  { label: "Progress",   href: "/dashboard/progress",     icon: Trophy          },
  { label: "Quizzes",   href: "/dashboard/quizzes",      icon: ClipboardList   },
  { label: "Certs",      href: "/dashboard/certificates", icon: Award           },
  { label: "Settings",   href: "/dashboard/settings",     icon: Settings        },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#00003e] lg:hidden">
      <ul className="flex items-center">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                  active ? "text-[#f4a300]" : "text-white/45 hover:text-white/70"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
