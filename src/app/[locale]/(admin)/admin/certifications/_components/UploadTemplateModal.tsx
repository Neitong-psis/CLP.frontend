import { useEffect, useState } from 'react';
import { X, FileText, Upload } from 'lucide-react';
import { useAdminCertificationsT } from '@/i18n';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { type CertTemplate } from '../_lib/data';
import { useEscapeKey } from '../_hooks/useEscapeKey';

export function UploadTemplateModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (template: CertTemplate) => void;
}) {
  const t = useAdminCertificationsT();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Custom');

  useEscapeKey(onClose);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(picked: File | undefined) {
    if (!picked) return;
    const isAllowed =
      picked.type.startsWith('image/') || picked.type === 'application/pdf';
    if (!isAllowed) {
      toast(t('uploadInvalidFile'), 'error');
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(picked);
    setPreviewUrl(
      picked.type.startsWith('image/') ? URL.createObjectURL(picked) : null,
    );
    if (!name) {
      setName(picked.name.replace(/\.[^/.]+$/, ''));
    }
  }

  function handleSubmit() {
    if (!file || !name.trim()) return;
    onCreate({
      name: name.trim(),
      category: category.trim() || 'Custom',
      status: 'Draft',
      issued: 0,
      thumbnailUrl: previewUrl ?? undefined,
      fileName: previewUrl ? undefined : file.name,
    });
    toast(t('uploadSuccess', { name: name.trim() }), 'success');
    onClose();
  }

  const canSubmit = Boolean(file) && name.trim().length > 0;

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
            {t('uploadTemplate')}
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
            {t('uploadTemplateDesc')}
          </p>

          {/* File picker / preview */}
          <label className="border-border hover:border-brand-gold/40 hover:bg-muted/40 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt=""
                className="h-24 w-full rounded-lg object-cover"
              />
            ) : file ? (
              <>
                <FileText className="text-muted-foreground h-6 w-6" />
                <p className="text-foreground text-xs font-medium">
                  {file.name}
                </p>
              </>
            ) : (
              <>
                <Upload className="text-muted-foreground h-6 w-6" />
                <p className="text-foreground text-xs font-medium">
                  {t('chooseFile')}
                </p>
                <p className="text-muted-foreground text-[11px]">
                  {t('fileTypeHint')}
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          {file && (
            <p className="text-muted-foreground -mt-2 text-[11px]">
              {t('changeFileHint')}
            </p>
          )}

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
            {t('createTemplate')}
          </Button>
        </div>
      </div>
    </div>
  );
}
