'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ToastVariant = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  title: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DURATION = 4000;

const VARIANT_CONFIG: Record<
  ToastVariant,
  {
    bar: string;
    icon: React.ReactNode;
    title: string;
    text: string;
    bg: string;
  }
> = {
  success: {
    bar: 'bg-emerald-500',
    icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    title: 'Success',
    text: 'text-slate-800',
    bg: 'bg-white',
  },
  error: {
    bar: 'bg-rose-500',
    icon: <AlertCircle className="h-5 w-5 text-rose-500" />,
    title: 'Error',
    text: 'text-slate-800',
    bg: 'bg-white',
  },
  info: {
    bar: 'bg-blue-500',
    icon: <Info className="h-5 w-5 text-blue-500" />,
    title: 'Info',
    text: 'text-slate-800',
    bg: 'bg-white',
  },
  warning: {
    bar: 'bg-amber-400',
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    title: 'Warning',
    text: 'text-slate-800',
    bg: 'bg-white',
  },
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const config = VARIANT_CONFIG[toast.variant];

  return (
    <div
      role="status"
      className={cn(
        'relative flex w-80 overflow-hidden rounded-xl border border-slate-200 shadow-lg',
        config.bg,
      )}
    >
      {/* Content */}
      <div className="flex flex-1 items-start gap-3 px-4 py-3.5">
        <div className="mt-0.5 shrink-0">{config.icon}</div>
        <div className="min-w-0 flex-1">
          <p className={cn('text-sm font-semibold', config.text)}>
            {config.title}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="mt-0.5 shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      <div
        className={cn(
          'absolute right-0 bottom-0 left-0 h-0.5 origin-left',
          config.bar,
        )}
        style={{ animation: `toast-shrink ${DURATION}ms linear forwards` }}
      />

      <style>{`
        @keyframes toast-shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, title: variant, message, variant }]);
      const timer = setTimeout(() => dismiss(id), DURATION);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed top-4 right-4 z-100 flex flex-col gap-2.5"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
