'use client';

import { useMobileSidebar } from '@/context/MobileSidebarContext';

export function MobileMenuButton() {
  const { provided, toggle, open, userInitials } = useMobileSidebar();

  if (!provided) return null;

  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open navigation menu'}
      aria-expanded={open}
      aria-haspopup="true"
      onClick={toggle}
      className="bg-brand-gold ring-brand-gold/30 text-brand-navy flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2 transition-all duration-200 active:scale-95 lg:hidden"
    >
      {userInitials}
    </button>
  );
}
