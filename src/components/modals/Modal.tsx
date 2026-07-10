'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  title,
  onClose,
  children,
  footer,
  maxWidth = 'max-w-md',
}: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          'flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl',
          maxWidth,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 px-6 py-5">{children}</div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}
