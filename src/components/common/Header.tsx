import Link from "next/link";
import Logo from "@/components/common/Logo";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="sm" />

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden text-sm font-semibold text-slate-700 hover:text-slate-900 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white md:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 text-sm text-slate-600 sm:px-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
