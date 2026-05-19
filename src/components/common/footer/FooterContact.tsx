import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/config/contact";

export default function FooterContact() {
  return (
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
  );
}
