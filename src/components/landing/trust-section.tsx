import { Award, Globe, Headphones, Lock, Shield, Zap } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

interface TrustItem {
  readonly icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  readonly label: string;
}

const TRUST_ITEMS: readonly TrustItem[] = [
  { icon: Shield, label: "Enterprise Security" },
  { icon: Zap, label: "Instant Access" },
  { icon: Globe, label: "Global Community" },
  { icon: Award, label: "Certified Courses" },
  { icon: Lock, label: "Privacy First" },
  { icon: Headphones, label: "24/7 Support" },
];

export function TrustSection() {
  return (
    <section
      className="border-t border-[#E2E8F0] bg-white py-12"
      aria-label="Trust and credibility indicators"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          Trusted by learners worldwide
        </p>

        <ul
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
          role="list"
        >
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 text-[#64748B] transition-colors duration-150 hover:text-[#0F172A]"
            >
              <Icon className="h-4 w-4 shrink-0 text-[#3B82F6]" aria-hidden />
              <span className="text-sm font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
