import { Camera, Upload } from 'lucide-react';
import { ADMIN_USER } from '@/constants/admin';

const avatarBtnCls =
  'flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted';

interface Props {
  name: string;
  email: string;
}

export function AvatarCard({ name, email }: Props) {
  return (
    <div className="border-border bg-surface mb-6 flex items-center justify-between rounded-xl border px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="bg-brand-gold flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white">
          {ADMIN_USER.initials}
        </div>
        <div>
          <p className="text-foreground text-sm font-semibold">{name}</p>
          <p className="text-muted-foreground text-xs">{email}</p>
          <span className="border-border bg-card text-muted-foreground mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium">
            Admin
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className={avatarBtnCls}>
          <Upload className="h-3.5 w-3.5" />
          Upload picture
        </button>
        <button className={avatarBtnCls}>
          <Camera className="h-3.5 w-3.5" />
          Use camera
        </button>
      </div>
    </div>
  );
}
