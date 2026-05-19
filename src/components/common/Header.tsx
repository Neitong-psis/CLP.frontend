import Link from "next/link";
import dynamic from "next/dynamic";
import { LogIn, UserPlus } from "lucide-react";
import Logo from "@/components/common/Logo";
import { NAV_LINKS } from "@/config/navigation";
import {HeaderSearch} from "@/components/common/HeaderSearch";

// Lazy-loaded: interactive, not needed for initial paint
// const HeaderSearch = dynamic(
//   () => import("@/components/common/HeaderSearch").then((m) => m.HeaderSearch),
//   { loading: () => <div className="flex-1 px-4" /> }
// );

export default function Header() {
  return (
    <header className="border-b border-[#00003e]/10 bg-white shadow-sm">
      <div className="flex h-20 w-full items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-semibold text-[#00003e]/60 transition-colors hover:text-[#00003e]"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#f4a300] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-center px-4">
          <HeaderSearch />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/auth/login"
            className="group hidden items-center gap-1.5 rounded-full border border-[#00003e]/20 px-4 py-2 text-sm font-semibold text-[#00003e] transition-all duration-200 hover:border-[#00003e] hover:bg-[#00003e] hover:text-white sm:inline-flex"
          >
            <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Login
          </Link>
          <Link
            href="/auth/register"
            className="group inline-flex items-center gap-1.5 rounded-full bg-[#f4a300] px-4 py-2 text-sm font-semibold text-[#00003e] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e09400] hover:shadow-lg hover:shadow-[#f4a300]/40"
          >
            <UserPlus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
            Register
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="border-t border-[#00003e]/10 bg-white md:hidden">
        <div className="flex w-full items-center gap-1 px-4 py-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1.5 text-sm font-medium text-[#00003e]/60 transition-colors hover:text-[#00003e]"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#f4a300] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}