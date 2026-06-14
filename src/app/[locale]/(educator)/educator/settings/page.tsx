'use client';

import EducatorTopBar from '@/components/common/TopBar';
import { Button } from '@/components/ui/button';
import { useProfileForm } from './_lib/useProfileForm';
import { ProfileHeader } from './_components/ProfileHeader';
import { ProfileFields } from './_components/ProfileFields';

export default function EducatorSettingsPage() {
  const { form, setField, setAvatar, avatarUrl, dirty, save, reset } =
    useProfileForm();

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="Settings"
        subtitle="Live workspace synced from your account"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-brand-navy text-base font-bold">
              Personal Information
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Manage the profile details used across your CLP workspace.
            </p>
          </div>

          <ProfileHeader
            fullName={form.fullName}
            email={form.email}
            avatarUrl={avatarUrl}
            onAvatarChange={setAvatar}
          />

          <ProfileFields form={form} onChange={setField} />

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-5">
            <Button
              variant="outline"
              onClick={reset}
              disabled={!dirty}
              className="disabled:opacity-40"
            >
              Reset
            </Button>
            <Button onClick={save} disabled={!dirty}>
              Save changes
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
