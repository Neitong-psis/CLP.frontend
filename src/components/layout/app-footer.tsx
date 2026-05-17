import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact", href: "#" },
] as const;

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#E2E8F0] bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-sm text-[#64748B] lg:flex-row lg:items-center lg:justify-between">
        <p>Copyright by QB Tech {year}.</p>

        <nav aria-label="Footer" className="flex flex-wrap gap-4 lg:justify-center">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-medium text-[#64748B] transition hover:text-[#0F172A]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-right lg:max-w-md">
          <span className="font-semibold text-[#E6A23C]">{siteConfig.fullName}</span>
          <span className="text-[#64748B]"> — Learning management for teams and classrooms</span>
        </p>
      </div>
    </footer>
  );
}
