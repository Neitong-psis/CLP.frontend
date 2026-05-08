import Link from "next/link";
import Logo from "@/components/common/Logo";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Support", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Logo size="sm" />
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} EduHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
