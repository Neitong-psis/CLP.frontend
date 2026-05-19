import Logo from "@/components/common/Logo";
import { FacebookIcon, LinkedinIcon, YoutubeIcon } from "@/components/common/icons/SocialIcons";
import { BRAND } from "@/config/brand";
import { CONTACT } from "@/config/contact";

const SOCIALS = [
  { icon: FacebookIcon, href: CONTACT.socials.facebook, label: "Facebook" },
  { icon: YoutubeIcon,  href: CONTACT.socials.youtube,  label: "YouTube"  },
  { icon: LinkedinIcon, href: CONTACT.socials.linkedin,  label: "LinkedIn" },
] as const;

export default function FooterBrand() {
  return (
    <div className="md:col-span-5 lg:col-span-4">
      <Logo size="md" variant="light" />
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
        {BRAND.tagline}
      </p>
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
    </div>
  );
}
