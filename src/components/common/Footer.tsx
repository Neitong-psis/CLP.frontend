import Link from "next/link";
import dynamic from "next/dynamic";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/components/common/icons/SocialIcons";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { FOOTER_LEGAL_LINKS, FOOTER_PROGRAMS, FOOTER_QUICK_LINKS } from "@/config/navigation";
import { BRAND } from "@/config/brand";
import { CONTACT } from "@/config/contact";
import { QBTECH_LOGO_2 } from "@logos";
import type { NavLink } from "@/types/navigation";

const Logo = dynamic(() => import("@/components/common/Logo"));

const SOCIALS = [
  { icon: FacebookIcon, href: CONTACT.socials.facebook, label: "Facebook" },
  { icon: YoutubeIcon,  href: CONTACT.socials.youtube,  label: "YouTube"  },
  { icon: LinkedinIcon, href: CONTACT.socials.linkedin,  label: "LinkedIn" },
] as const;


export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#00003e] text-white">

      {/* ── Decorative background layer ────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f4a300 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#f4a300]/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#e00025]/[0.03] blur-3xl"
      />

      {/* ── Newsletter CTA strip ───────────────────────────────── */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <div className="text-center md:text-left">
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-[#f4a300]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4a300]">
                Stay Connected
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
              Get learning insights, straight to your inbox.
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Join our newsletter for the latest updates, tips, and exclusive content.
            </p>
          </div>

          <NewsletterForm />
        </div>
      </div>

      {/* ── Main content grid ──────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">

          {/* Brand block — spans 5 cols */}
          <div className="md:col-span-5 lg:col-span-4">
            <Logo size="md" variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {BRAND.tagline}
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white/60 transition-all hover:border-[#f4a300] hover:bg-[#f4a300] hover:text-[#00003e]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            {/* <ul className="mt-8 space-y-2.5">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-xs text-white/45">
                  <Icon className="h-3.5 w-3.5 text-[#f4a300]" />
                  <span>{label}</span>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <FooterLinkColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
          </div>

          {/* Programs */}
          <div className="md:col-span-4 lg:col-span-3">
            <FooterLinkColumn title="Programs" links={FOOTER_PROGRAMS} />
          </div>

          {/* Contact */}
          <div className="md:col-span-12 lg:col-span-3">
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f4a300]">
              Reach Out
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-start gap-3 text-sm text-white/60 transition-all hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 transition-colors group-hover:border-[#f4a300]/40 group-hover:bg-[#f4a300]/10">
                    <Mail className="h-4 w-4 text-[#f4a300]" />
                  </span>
                  <span className="pt-1.5">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-sm text-white/60 transition-all hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 transition-colors group-hover:border-[#f4a300]/40 group-hover:bg-[#f4a300]/10">
                    <Phone className="h-4 w-4 text-[#f4a300]" />
                  </span>
                  <span className="pt-1.5">{CONTACT.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10">
                  <MapPin className="h-4 w-4 text-[#f4a300]" />
                </span>
                <span className="pt-1.5 leading-relaxed">
                  {CONTACT.address.street}, {CONTACT.address.city},
                  <br />
                  {CONTACT.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row lg:px-8">

          {/* Copyright + legal */}
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

          {/* Powered by — right */}
          <a
            href={BRAND.poweredBy.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30 transition-colors group-hover:text-white/60">
              Designed &amp; Developed by
            </span>
            <Image
              src={QBTECH_LOGO_2}
              alt={BRAND.poweredBy.name}
              height={28}
              width={120}
              className="h-7 w-auto opacity-50 transition-opacity group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkColumnProps {
  title: string;
  links: readonly NavLink[];
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
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