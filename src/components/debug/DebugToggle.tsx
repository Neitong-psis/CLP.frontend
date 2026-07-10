'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils/cn';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { clearDemoCookie, setDemoCookie } from '@/lib/demo/demo-mode';

export default function DebugToggle() {
  const [isDemoMode, setIsDemoMode] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('DEMO_MODE') === 'true'
      : false,
  );

  const toggleDemoMode = () => {
    const newMode = !isDemoMode;
    localStorage.setItem('DEMO_MODE', String(newMode));
    if (newMode) {
      setDemoCookie();
    } else {
      clearDemoCookie();
    }
    setIsDemoMode(newMode);
    window.location.reload();
  };

  return (
    <div className="fixed right-6 bottom-6 z-[9999]">
      <Button
        variant={isDemoMode ? 'secondary' : 'outline'}
        size="sm"
        onClick={toggleDemoMode}
        className={cn(
          'gap-2 shadow-lg ring-1 ring-slate-200 transition-all hover:scale-105 active:scale-95',
          isDemoMode
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : 'text-brand-navy bg-white',
        )}
      >
        {isDemoMode ? (
          <>
            <ShieldCheck className="size-4" />
            <span className="text-xs font-bold">DEMO MODE ON</span>
          </>
        ) : (
          <>
            <ShieldAlert className="size-4 text-slate-400" />
            <span className="text-xs font-bold">AUTH MODE</span>
          </>
        )}
      </Button>
    </div>
  );
}
