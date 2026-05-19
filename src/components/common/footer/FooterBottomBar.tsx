import Link from "next/link";
import { BRAND } from "@/config/brand";
import { FOOTER_LEGAL_LINKS } from "@/config/navigation";
import { QBTECH_LOGO_1 } from "@logos";

export default function FooterBottomBar() {
  return (
    <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span className="hidden h-3 w-px bg-white/15 md:inline-block" aria-hidden />
          {FOOTER_LEGAL_LINKS.map((link, idx) => (
            <span key={link.href} className="flex items-center gap-3">
              <Link href={link.href} className="transition-colors hover:text-[#f4a300]">
                {link.label}
              </Link>
              {idx < FOOTER_LEGAL_LINKS.length - 1 && (
                <span className="h-3 w-px bg-white/15" aria-hidden />
              )}
            </span>
          ))}
        </div>
        <a
          href={BRAND.poweredBy.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/30 transition-colors group-hover:text-white/60">
            Designed &amp; Developed by
          </span>
          <img
            src={QBTECH_LOGO_1}
            alt={BRAND.poweredBy.name}
            className="h-7 w-auto opacity-50 transition-opacity group-hover:opacity-100"
          />
        </a>
      </div>
    </div>
  );
}
