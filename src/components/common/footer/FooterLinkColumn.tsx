import Link from "next/link";
import type { NavLink } from "@/types/navigation";

interface FooterLinkColumnProps {
  title: string;
  links: readonly NavLink[];
}

export default function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div>
      <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f4a300]">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-all duration-200 hover:text-white"
            >
              <span className="h-px w-0 bg-[#f4a300] transition-all duration-300 group-hover:w-4" aria-hidden />
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
