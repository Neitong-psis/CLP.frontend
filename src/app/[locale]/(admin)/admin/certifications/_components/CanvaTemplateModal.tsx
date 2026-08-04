import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useAdminCertificationsT } from '@/i18n';
import { Button } from '@/components/ui/button';
import { CANVA_URL_PATTERN } from '../_lib/data';
import { useEscapeKey } from '../_hooks/useEscapeKey';

/** Canva has no client-only "create and return the design URL" API, so this
 *  modal just opens canva.com in a new tab and lets the admin paste the
 *  resulting share/edit link back in — the same link-out-and-paste-back
 *  pattern used for the rest of this (fully mocked, backend-less) page. */
export function CanvaTemplateModal({
  mode,
  templateName,
  onClose,
  onSave,
}: {
  mode: 'link' | 'create';
  templateName?: string;
  onClose: () => void;
  onSave: (input: { url: string; name?: string; category?: string }) => void;
}) {
  const t = useAdminCertificationsT();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Custom');

  useEscapeKey(onClose);

  const trimmedUrl = url.trim();
  const isValidUrl = CANVA_URL_PATTERN.test(trimmedUrl);
  const canSubmit = isValidUrl && (mode === 'link' || name.trim().length > 0);

  function handleSubmit() {
    if (!canSubmit) return;
    onSave({
      url: trimmedUrl,
      name: mode === 'create' ? name.trim() : undefined,
      category: mode === 'create' ? category.trim() || 'Custom' : undefined,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card ring-border w-full max-w-md rounded-2xl shadow-2xl ring-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-foreground text-base font-bold">
            {mode === 'create' ? t('designInCanva') : t('linkCanvaDesign')}
          </h2>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <p className="text-muted-foreground text-xs">
            {mode === 'create'
              ? t('designInCanvaDesc')
              : t('linkCanvaDesignDesc', { name: templateName ?? '' })}
          </p>

          <a
            href="https://www.canva.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-foreground hover:bg-muted flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-semibold transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            {t('openCanvaToDesign')}
          </a>

          {mode === 'create' && (
            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                {t('templateName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('templateNamePlaceholder')}
                className="border-border bg-surface text-foreground placeholder:text-muted-foreground focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2"
              />
            </div>
          )}

          {mode === 'create' && (
            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                {t('templateCategory')}
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Corporate, Specialized, Standard…"
                className="border-border bg-surface text-foreground placeholder:text-muted-foreground focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2"
              />
            </div>
          )}

          <div>
            <label className="text-muted-foreground mb-1 block text-xs font-semibold">
              {t('canvaLinkLabel')}
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('canvaLinkPlaceholder')}
              className="border-border bg-surface text-foreground placeholder:text-muted-foreground focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2"
            />
            {trimmedUrl.length > 0 && !isValidUrl && (
              <p className="mt-1 text-[11px] text-rose-500">
                {t('canvaLinkInvalid')}
              </p>
            )}
          </div>
        </div>

        <div className="border-border flex items-center justify-end gap-2 border-t px-6 py-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="border-border text-foreground hover:bg-muted h-auto rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="h-auto rounded-lg px-4 py-2 text-sm font-bold disabled:cursor-not-allowed"
          >
            {t('saveLink')}
          </Button>
        </div>
      </div>
    </div>
  );
}
