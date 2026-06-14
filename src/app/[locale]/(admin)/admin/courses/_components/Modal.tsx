import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  title: string;
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-card ring-border flex w-full flex-col overflow-hidden rounded-2xl shadow-2xl ring-1',
          maxWidth,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-foreground text-base font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 px-6 py-5">{children}</div>

        <div className="border-border flex items-center justify-end gap-2 border-t px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}
