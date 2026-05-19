"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen, 
  Compass, 
  Trophy,
  ClipboardList, 
  Award, 
  Settings, 
  ChevronRight,
} from "lucide-react";
import { MOCK_USER } from "@/config/learner";

const NAV_ITEMS = [
  { label: "Dashboard",              href: "/dashboard",              icon: LayoutDashboard, badge: null },
  { label: "My Learning",            href: "/dashboard/my-learning",  icon: BookOpen,        badge: 3    },
  { label: "Explore",                href: "/dashboard/explore",      icon: Compass,         badge: null },
  { label: "Progress & Achievements",href: "/dashboard/progress",     icon: Trophy,          badge: null },
  { label: "Quizzes",               href: "/dashboard/quizzes",      icon: ClipboardList,   badge: 2    },
  { label: "Certificates",           href: "/dashboard/certificates", icon: Award,           badge: null },
  { label: "Settings",               href: "/dashboard/settings",     icon: Settings,        badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 flex-col bg-[#00003e]">
      {/* Brand */}
      <div className="flex flex-col gap-0.5 border-b border-white/10 px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4a300]">
            <span className="text-sm font-black text-[#00003e]">A</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-white">AYLA</p>
            <p className="mt-0.5 text-[10px] leading-none text-white/40">Learning Platform</p>
          </div>
        </div>
        <span className="mt-3 inline-flex w-fit items-center rounded-full bg-[#f4a300]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#f4a300]">
          {MOCK_USER.role}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    active
                      ? "bg-[#f4a300] text-[#00003e]"
                      : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{label}</span>
                  {badge && (
                    <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      active ? "bg-[#00003e]/20 text-[#00003e]" : "bg-[#f4a300]/20 text-[#f4a300]"
                    }`}>
                      {badge}
                    </span>
                  )}
                  {active && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="border-t border-white/10 px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4a300] text-xs font-bold text-[#00003e]">
            {MOCK_USER.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{MOCK_USER.name}</p>
            <p className="truncate text-[11px] text-white/40">{MOCK_USER.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
