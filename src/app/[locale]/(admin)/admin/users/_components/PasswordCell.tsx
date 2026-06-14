'use client';

import { useState } from 'react';
import { Check, Copy, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Props {
  pwd: string | null;
}

export function PasswordCell({ pwd }: Props) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!pwd) return;
    void navigator.clipboard.writeText(pwd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleToggle() {
    if (!pwd) return;
    setVisible((v) => !v);
  }

  const hasPassword = pwd !== null;

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          'min-w-22 font-mono text-[11px] select-all',
          hasPassword ? 'text-slate-700' : 'text-slate-400',
        )}
      >
        {hasPassword && visible ? pwd : '••••••••'}
      </span>

      {/* Eye — only toggles visibility, no side effects */}
      <button
        onClick={handleToggle}
        disabled={!hasPassword}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="shrink-0 text-slate-400 transition-colors hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {visible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
      </button>

      {/* Copy — only copies, no side effects */}
      <button
        onClick={handleCopy}
        disabled={!hasPassword}
        aria-label="Copy password"
        className={cn(
          'shrink-0 transition-colors disabled:cursor-not-allowed disabled:opacity-30',
          copied ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-600',
        )}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>
    </div>
  );
}
