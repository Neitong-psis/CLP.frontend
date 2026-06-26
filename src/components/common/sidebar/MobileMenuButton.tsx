'use client';

import { Menu, X } from 'lucide-react';
import { useMobileSidebar } from '@/context/MobileSidebarContext';

export function MobileMenuButton() {
  const { provided, toggle, open } = useMobileSidebar();

  if (!provided) return null;

  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open navigation menu'}
      aria-expanded={open}
      aria-haspopup="true"
      onClick={toggle}
      className="text-foreground hover:bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 active:scale-95 lg:hidden"
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}
