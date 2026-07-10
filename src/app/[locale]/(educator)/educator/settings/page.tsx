'use client';

import { UserCircle } from 'lucide-react';
import { useEducatorSettingsT } from '@/i18n';
import TopBar from '@/components/common/TopBar';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useProfileForm } from './_lib/useProfileForm';
import { ProfileHeader } from './_components/ProfileHeader';
import { ProfileFields } from './_components/ProfileFields';

export default function EducatorSettingsPage() {
  const t = useEducatorSettingsT();
  const currentUser = useCurrentUser();
  const { form, setField, setAvatar, avatarUrl, initials, dirty, save, reset } =
    useProfileForm();

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="educator"
        title={t('title')}
        subtitle={t('subtitle', { email: currentUser.email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <section className="border-border bg-card rounded-2xl border p-6">
          <div className="mb-6 flex items-start gap-3">
            <div className="bg-brand-gold/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <UserCircle className="text-brand-gold h-5 w-5" />
            </div>
            <div>
              <h2 className="text-foreground text-base font-bold">
                {t('personalInfo')}
              </h2>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {t('personalInfoDesc')}
              </p>
            </div>
          </div>

          <ProfileHeader
            fullName={form.fullName}
            email={form.email}
            initials={initials}
            avatarUrl={avatarUrl}
            onAvatarChange={setAvatar}
          />

          <ProfileFields form={form} onChange={setField} />

          <div className="border-border/50 mt-6 flex items-center justify-end gap-2 border-t pt-5">
            <Button
              variant="outline"
              onClick={reset}
              disabled={!dirty}
              className="disabled:opacity-40"
            >
              {t('reset')}
            </Button>
            <Button onClick={save} disabled={!dirty}>
              {t('save')}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
