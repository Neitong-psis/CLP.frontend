'use client';

import { useEffect, useRef, useState } from 'react';

const SCROLL_THRESHOLD = 120;

export function useScrollHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const update = () => {
      const y = window.scrollY;
      const r = Math.min(y / SCROLL_THRESHOLD, 1);
      const isScrolled = y > SCROLL_THRESHOLD;
      setScrolled(isScrolled);

      if (isScrolled) {
        header.style.backgroundColor = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(14px)';
        header.style.setProperty('-webkit-backdrop-filter', 'blur(14px)');
        header.style.borderBottom = '1px solid rgba(0,0,62,0.08)';
      } else {
        const alpha = r * 0.5;
        const blur = r > 0.1 ? `blur(${r * 8}px)` : 'none';
        header.style.backgroundColor = `rgba(0,0,62,${alpha})`;
        header.style.backdropFilter = blur;
        header.style.setProperty('-webkit-backdrop-filter', blur);
        header.style.borderBottom = '1px solid transparent';
      }
    };

    update();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { scrolled, headerRef };
}
