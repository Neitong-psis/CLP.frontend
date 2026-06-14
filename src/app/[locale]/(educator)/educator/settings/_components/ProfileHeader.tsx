'use client';

import { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { EDUCATOR_USER } from '@/constants/educator';
import { useToast } from '@/components/ui/toast';

const actionBtnCls =
  'flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900';

export function ProfileHeader({
  fullName,
  email,
  avatarUrl,
  onAvatarChange,
}: {
  fullName: string;
  email: string;
  avatarUrl: string | null;
  onAvatarChange: (file: File | null) => void;
}) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="ring-brand-gold/15 size-16 shrink-0 overflow-hidden rounded-full ring-4">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-brand-gold flex h-full w-full items-center justify-center text-xl font-bold text-white">
              {EDUCATOR_USER.initials}
            </div>
          )}
        </div>
        <div>
          <p className="text-brand-navy text-base font-bold">
            {fullName || 'Your name'}
          </p>
          <p className="text-sm text-slate-500">{email}</p>
          <span className="mt-1.5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
            {EDUCATOR_USER.role}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={actionBtnCls}
        >
          <Upload className="h-4 w-4" />
          Upload picture
        </button>
        <button
          type="button"
          onClick={() =>
            toast('Camera capture is not available in preview.', 'error')
          }
          className={actionBtnCls}
        >
          <Camera className="h-4 w-4" />
          Use camera
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onAvatarChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}
