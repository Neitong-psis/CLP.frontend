import { FOOTER_PROGRAMS, FOOTER_QUICK_LINKS } from "@/config/navigation";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterBrand from "./footer/FooterBrand";
import FooterLinkColumn from "./footer/FooterLinkColumn";
import FooterContact from "./footer/FooterContact";
import FooterBottomBar from "./footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#00003e] text-white">

      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #f4a300 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#f4a300]/[0.04] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#e00025]/[0.03] blur-3xl" />

      {/* <FooterNewsletter /> */}

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <FooterBrand />

          <div className="md:col-span-3 lg:col-span-2">
            <FooterLinkColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <FooterLinkColumn title="Programs" links={FOOTER_PROGRAMS} />
          </div>

          <FooterContact />
        </div>
      </div>

      <FooterBottomBar />
    </footer>
  );
}
