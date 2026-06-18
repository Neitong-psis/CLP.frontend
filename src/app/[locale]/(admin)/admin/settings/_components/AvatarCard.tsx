'use client';

import { useRef, useState, useEffect } from 'react';
import { Camera, Upload } from 'lucide-react';
import { useAdminSettingsT } from '@/i18n';
import { ADMIN_USER } from '@/constants/admin';
import { useToast } from '@/components/ui/toast';

const avatarBtnCls =
  'flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted';

interface Props {
  name: string;
  email: string;
}

export function AvatarCard({ name, email }: Props) {
  const t = useAdminSettingsT();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast(t('invalidImage'), 'error');
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    toast(t('profileUpdated'), 'success');
  }

  return (
    <div className="border-border bg-surface mb-6 flex flex-col gap-4 rounded-xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Profile"
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="bg-brand-gold flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white">
              {ADMIN_USER.initials}
            </div>
          )}
        </div>
        <div>
          <p className="text-foreground text-sm font-semibold">{name}</p>
          <p className="text-muted-foreground text-xs">{email}</p>
          <span className="border-border bg-card text-muted-foreground mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium">
            {t('adminLabel')}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={avatarBtnCls}
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="h-3.5 w-3.5" />
          {t('uploadPicture')}
        </button>
        <button
          type="button"
          className={avatarBtnCls}
          onClick={() => toast(t('cameraUnavailable'), 'error')}
        >
          <Camera className="h-3.5 w-3.5" />
          {t('useCamera')}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
