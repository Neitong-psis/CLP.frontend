'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, Download, Share2, X } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useCreateCourseT } from '@/i18n';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils/cn';

export function PromoCodeQrModal({
  code,
  redeemUrl,
  onClose,
}: {
  code: string;
  redeemUrl: string;
  onClose: () => void;
}) {
  const t = useCreateCourseT();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function copyCode() {
    navigator.clipboard?.writeText(code).catch(() => {});
    toast(t('info.codeCopied'), 'success');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  }

  function copyLink() {
    navigator.clipboard?.writeText(redeemUrl).catch(() => {});
    toast(t('info.linkCopied'), 'success');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1500);
  }

  function downloadQr() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${code}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  async function share() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: t('info.promoCode'),
          text: code,
          url: redeemUrl,
        });
        return;
      } catch {
        return; // user cancelled the native share sheet
      }
    }
    copyLink();
  }

  // Portal straight to <body> — this modal is opened from deep inside the
  // wizard's form tree, and an ancestor there constrains `position: fixed`
  // (any transform/filter in the chain creates a containing block), which
  // was clipping the backdrop to the content column instead of the full
  // viewport and leaving the sticky TopBar/footer un-blurred above it.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('info.shareCodeTitle')}
        className="bg-background animate-in fade-in zoom-in-95 relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl shadow-2xl duration-150"
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-foreground text-base font-bold">
            {t('info.shareCodeTitle')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-lg transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 py-6">
          <div className="rounded-xl bg-white p-3">
            <QRCodeCanvas ref={canvasRef} value={redeemUrl} size={224} />
          </div>

          <div className="w-full space-y-2">
            <div className="border-border bg-card flex items-center justify-between rounded-lg border px-3.5 py-2.5">
              <span className="text-foreground font-mono text-lg font-bold tracking-[0.2em]">
                {code}
              </span>
              <button
                type="button"
                onClick={copyCode}
                aria-label={t('info.copyCode')}
                className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 shrink-0 items-center justify-center rounded-md transition-colors"
              >
                {copiedCode ? (
                  <Check className="animate-in zoom-in size-4 text-emerald-500 duration-200" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={copyLink}
              className="border-border text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center justify-between gap-2 rounded-lg border px-3.5 py-2 text-xs transition-colors"
            >
              <span className="min-w-0 flex-1 truncate text-left">
                {redeemUrl}
              </span>
              {copiedLink ? (
                <Check className="animate-in zoom-in size-3.5 shrink-0 text-emerald-500 duration-200" />
              ) : (
                <Copy className="size-3.5 shrink-0" />
              )}
            </button>
          </div>
        </div>

        <div className="border-border flex items-center gap-2 border-t px-5 py-4">
          <button
            type="button"
            onClick={downloadQr}
            className={cn(
              'border-border text-foreground hover:bg-muted flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-semibold transition-colors',
            )}
          >
            <Download className="size-4" /> {t('info.downloadQr')}
          </button>
          <button
            type="button"
            onClick={share}
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold transition-colors"
          >
            <Share2 className="size-4" /> {t('info.shareCode')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
