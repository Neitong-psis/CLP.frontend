'use client';

import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useEducatorSettingsT } from '@/i18n';
import { EDUCATOR_USER } from '@/constants/educator';
import Image from 'next/image';

const btnCls =
  'flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground/80 transition-all hover:border-brand-gold/40 hover:bg-muted hover:text-foreground';

export function ProfileHeader({
  fullName,
  email,
  initials,
  avatarUrl,
  onAvatarChange,
}: {
  fullName: string;
  email: string;
  initials: string;
  avatarUrl: string | null;
  onAvatarChange: (file: File | null) => void;
}) {
  const t = useEducatorSettingsT();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border-border bg-muted/20 mb-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Avatar + info */}
      <div className="flex items-center gap-4">
        <div className="ring-background size-18 shrink-0 overflow-hidden rounded-2xl shadow-lg ring-[3px]">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
              width={72}
              height={72}
            />
          ) : (
            <div className="bg-brand-gold flex h-full w-full items-center justify-center text-xl font-bold text-white">
              {initials}
            </div>
          )}
        </div>
        <div>
          <p className="text-foreground text-base leading-tight font-bold">
            {fullName || 'Your name'}
          </p>
          <p className="text-muted-foreground mt-0.5 text-sm">{email}</p>
          <span className="mt-1.5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500">
            {EDUCATOR_USER.role}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={btnCls}
        >
          <Upload className="h-4 w-4" />
          {t('uploadPicture')}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onAvatarChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
