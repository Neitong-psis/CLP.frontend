import { useEffect, useMemo, useState } from 'react';
import { EDUCATOR_USER } from '@/constants/educator';
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

const INITIAL: ProfileForm = {
  fullName: EDUCATOR_USER.name,
  username: 'devid',
  email: EDUCATOR_USER.email,
  phone: '+855 12 345 678',
  gender: '',
  dob: '',
  nationality: 'Cambodian',
  address: 'Phnom Penh, Cambodia',
  bio: '',
};

/** Profile form state, avatar preview lifecycle, and dirty tracking. */
export function useProfileForm() {
  const { toast } = useToast();
  const [form, setForm] = useState<ProfileForm>(INITIAL);
  const [avatar, setAvatar] = useState<File | null>(null);

  const avatarUrl = useMemo(
    () => (avatar ? URL.createObjectURL(avatar) : null),
    [avatar],
  );
  useEffect(() => {
    if (!avatarUrl) return;
    return () => URL.revokeObjectURL(avatarUrl);
  }, [avatarUrl]);

  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(INITIAL) || avatar !== null,
    [form, avatar],
  );

  const setField = (key: keyof ProfileForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function save() {
    toast('Your profile has been updated.', 'success');
  }

  function reset() {
    setForm(INITIAL);
    setAvatar(null);
  }

  return { form, setField, avatar, setAvatar, avatarUrl, dirty, save, reset };
}
