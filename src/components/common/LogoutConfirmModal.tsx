'use client';

import { LogOut } from 'lucide-react';
import { useCommonT, useNavT } from '@/i18n';
import { Button } from '@/components/ui/button/Button';

interface LogoutConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isLoggingOut?: boolean;
}

export function LogoutConfirmModal({
  onConfirm,
  onClose,
  isLoggingOut,
}: LogoutConfirmModalProps) {
  const tNav = useNavT();
  const tCommon = useCommonT();

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        aria-describedby="logout-confirm-message"
        className="border-border bg-card flex w-full max-w-sm flex-col overflow-hidden rounded-xl border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4 px-6 pt-8 pb-6 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-rose-500/10">
            <LogOut className="size-6 text-rose-500" />
          </span>
          <div className="space-y-1.5">
            <h2
              id="logout-confirm-title"
              className="text-foreground text-lg font-bold"
            >
              {tNav('logoutConfirmTitle')}
            </h2>
            <p
              id="logout-confirm-message"
              className="text-muted-foreground text-sm"
            >
              {tNav('logoutConfirmMessage')}
            </p>
          </div>
        </div>

        <div className="border-border flex items-center gap-3 border-t px-4 py-4">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={onClose}
          >
            {tCommon('cancel')}
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded-full"
            onClick={onConfirm}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? tNav('signingOut') : tNav('logout')}
          </Button>
        </div>
      </div>
    </div>
  );
}
