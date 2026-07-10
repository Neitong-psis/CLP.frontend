import { useEffect, useMemo, useState } from 'react';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useToast } from '@/components/ui/toast';

export interface ProfileForm {
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

/** Profile form state, avatar preview lifecycle, and dirty tracking. */
export function useProfileForm() {
  const { toast } = useToast();
  const currentUser = useCurrentUser();

  // The authenticated profile only loads after the silent auth bootstrap
  // resolves, so the form seeds itself as soon as real data is available.
  // Fields the backend doesn't provide (phone, bio, ...) start blank rather
  // than carrying over fabricated placeholder values.
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
  // Once the educator edits a field, stop re-syncing from `initial` so their
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

  function save() {
    toast('Your profile has been updated.', 'success');
  }

  function reset() {
    setForm(initial);
    setAvatar(null);
    setTouched(false);
  }

  return {
    form,
    setField,
    avatar,
    setAvatar,
    avatarUrl,
    initials: currentUser.initials,
    dirty,
    save,
    reset,
  };
}
