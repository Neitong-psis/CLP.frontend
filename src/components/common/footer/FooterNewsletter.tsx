import { NewsletterForm } from "@/components/common/NewsletterForm";

export default function FooterNewsletter() {
  return (
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
  );
}
