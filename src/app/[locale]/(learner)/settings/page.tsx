'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { UserCircle, Upload, ChevronDown } from 'lucide-react';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { useToast } from '@/components/ui/toast';
import { DatePicker } from '@/components/ui/DatePicker';
import { useCurrentUser } from '@/hooks/use-current-user';

const LEARNER_ROLE_LABEL = 'Learner';

// ── Field styling (theme-token based, matches educator/admin settings) ──────────

const inputCls =
  'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-sm font-medium text-foreground/80';
const sectionLabelCls =
  'sm:col-span-2 border-b border-border/50 pb-2 pt-1 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase';

// ── Form model ──────────────────────────────────────────────────────────────────

interface ProfileForm {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  nationality: string;
  address: string;
  bio: string;
}

export default function LearnerSettingsPage() {
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const fileRef = useRef<HTMLInputElement>(null);

  // The authenticated profile only loads after the silent auth bootstrap
  // resolves, so the form seeds itself as soon as real data is available.
  const initial = useMemo<ProfileForm>(
    () => ({
      fullName: currentUser.fullName,
      username: currentUser.email.split('@')[0] ?? '',
      email: currentUser.email,
      phone: '',
      gender: '',
      dob: '',
      nationality: '',
      address: '',
      bio: '',
    }),
    [currentUser],
  );

  const [form, setForm] = useState<ProfileForm>(initial);
  const [avatar, setAvatar] = useState<File | null>(null);
  // Once the learner edits a field, stop re-syncing from `initial` so their
  // in-progress edits aren't clobbered when the auth bootstrap resolves.
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    const id = setTimeout(() => setForm(initial), 0);
    return () => clearTimeout(id);
  }, [initial, touched]);

  const avatarUrl = useMemo(
    () => (avatar ? URL.createObjectURL(avatar) : null),
    [avatar],
  );
  useEffect(() => {
    if (!avatarUrl) return;
    return () => URL.revokeObjectURL(avatarUrl);
  }, [avatarUrl]);

  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initial) || avatar !== null,
    [form, initial, avatar],
  );

  const setField = (key: keyof ProfileForm, value: string) => {
    setTouched(true);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  function handleAvatarFile(file: File | undefined | null) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast('Please choose an image file.', 'error');
      return;
    }
    setAvatar(file);
    toast('Profile picture updated.', 'success');
  }

  function save() {
    toast('Your profile has been updated.', 'success');
  }

  function reset() {
    setForm(initial);
    setAvatar(null);
    setTouched(false);
  }

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="learner"
        title="Settings"
        subtitle={`Live workspace synced for ${currentUser.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <section className="border-border bg-card rounded-2xl border p-6">
          {/* ── Section heading ── */}
          <div className="mb-6 flex items-start gap-3">
            <div className="bg-brand-gold/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <UserCircle className="text-brand-gold h-5 w-5" />
            </div>
            <div>
              <h2 className="text-foreground text-base font-bold">
                Personal Information
              </h2>
              <p className="text-muted-foreground mt-0.5 text-sm">
                Manage the profile details used across your CLP workspace.
              </p>
            </div>
          </div>

          {/* ── Profile header (avatar + actions) ── */}
          <div className="border-border bg-muted/20 mb-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between">
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
                    {currentUser.initials}
                  </div>
                )}
              </div>
              <div>
                <p className="text-foreground text-base leading-tight font-bold">
                  {form.fullName || 'Your name'}
                </p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {form.email}
                </p>
                <span className="border-border bg-card text-muted-foreground mt-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
                  {LEARNER_ROLE_LABEL}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="border-border bg-background text-foreground/80 hover:border-brand-gold/40 hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all"
              >
                <Upload className="h-4 w-4" />
                Upload picture
              </button>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleAvatarFile(e.target.files?.[0])}
            />
          </div>

          {/* ── Fields ── */}
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {/* Identity */}
            <div className={sectionLabelCls}>Identity</div>
            <div>
              <label className={labelCls}>Full Name</label>
              <input
                value={form.fullName}
                onChange={(e) => setField('fullName', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Username</label>
              <input
                value={form.username}
                onChange={(e) => setField('username', e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Contact Info */}
            <div className={sectionLabelCls}>Contact Info</div>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Personal Details */}
            <div className={sectionLabelCls}>Personal Details</div>
            <div>
              <label className={labelCls}>Gender</label>
              <div className="relative">
                <select
                  value={form.gender}
                  onChange={(e) => setField('gender', e.target.value)}
                  className={`${inputCls} cursor-pointer appearance-none pr-9`}
                >
                  <option value="">Select gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
                <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Date of Birth</label>
              <DatePicker
                value={form.dob}
                onChange={(v) => setField('dob', v)}
                placeholder="Select date"
              />
            </div>
            <div>
              <label className={labelCls}>Nationality</label>
              <input
                value={form.nationality}
                onChange={(e) => setField('nationality', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>User Role</label>
              <input
                value={LEARNER_ROLE_LABEL}
                readOnly
                aria-readonly
                className={`${inputCls} bg-muted text-muted-foreground cursor-not-allowed`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Address</label>
              <input
                value={form.address}
                onChange={(e) => setField('address', e.target.value)}
                className={inputCls}
              />
            </div>

            {/* About Me */}
            <div className={sectionLabelCls}>About Me</div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Bio / About Me</label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => setField('bio', e.target.value)}
                placeholder="Tell others a little about yourself…"
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="border-border/50 mt-6 flex items-center justify-end gap-2 border-t pt-5">
            <button
              type="button"
              onClick={reset}
              disabled={!dirty}
              className="border-border text-foreground/80 hover:bg-muted rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={save}
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy rounded-lg px-5 py-2.5 text-sm font-bold transition-colors"
            >
              Save Changes
            </button>
          </div>
        </section>
      </div>

      <div className="mt-6">
        <FooterBottomBar theme="light" />
      </div>
    </div>
  );
}
