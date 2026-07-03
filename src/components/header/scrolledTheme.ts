export function scrolledTheme(scrolled: boolean) {
  return {
    text: scrolled ? 'text-brand-navy' : 'text-white/90',
    hoverText: scrolled ? 'hover:text-brand-navy' : 'hover:text-white',
    hoverBg: scrolled ? 'hover:bg-brand-navy/6' : 'hover:bg-white/8',
    openText: scrolled ? 'text-brand-navy' : 'text-white',
    divider: scrolled ? 'bg-brand-navy/15' : 'bg-white/15',
    hamburger: scrolled
      ? 'text-brand-navy hover:bg-brand-navy/8'
      : 'text-white/90 hover:bg-white/10',
    loginBtn: scrolled
      ? 'border-brand-navy/20 text-brand-navy hover:border-brand-navy hover:text-white'
      : 'border-white/40 text-white/90 hover:border-white/60 hover:text-white hover:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]',
    loginBtnOverlay: scrolled ? 'bg-brand-navy' : 'bg-white/10',
  } as const;
}
