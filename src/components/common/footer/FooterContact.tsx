'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT } from '@/constants/contact';
import type { FooterTheme } from './types';

interface FooterContactProps {
  theme: FooterTheme;
}

export default function FooterContact({ theme }: FooterContactProps) {
  const isBlue = theme === 'blue';

  const linkClass = `group flex items-start gap-3 text-sm transition-all ${
    isBlue
      ? 'text-white/60 hover:text-white'
      : 'text-muted-foreground hover:text-foreground'
  }`;

  const iconContainerClass = `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors group-hover:border-[#f4a300]/40 group-hover:bg-[#f4a300]/10 ${
    isBlue ? 'border-white/10' : 'border-border'
  }`;

  const staticItemClass = `flex items-start gap-3 text-sm ${
    isBlue ? 'text-white/60' : 'text-muted-foreground'
  }`;

  const staticIconClass = `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
    isBlue ? 'border-white/10' : 'border-border'
  }`;

  return (
    <div>
      <h4 className="text-brand-gold mb-4 text-[11px] font-bold tracking-[0.18em] uppercase sm:mb-5">
        Reach Out
      </h4>
      <ul className="flex flex-col gap-4">
        <li>
          <a href={`mailto:${CONTACT.email}`} className={linkClass}>
            <span className={iconContainerClass}>
              <Mail className="text-brand-gold h-4 w-4" />
            </span>
            <span className="pt-1.5 transition-[translate] duration-200 group-hover:translate-x-0.5">
              {CONTACT.email}
            </span>
          </a>
        </li>
        <li>
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
            className={linkClass}
          >
            <span className={iconContainerClass}>
              <Phone className="text-brand-gold h-4 w-4" />
            </span>
            <span className="pt-1.5 transition-[translate] duration-200 group-hover:translate-x-0.5">
              {CONTACT.phone}
            </span>
          </a>
        </li>
        <li className={staticItemClass}>
          <span className={staticIconClass}>
            <MapPin className="text-brand-gold h-4 w-4" />
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
