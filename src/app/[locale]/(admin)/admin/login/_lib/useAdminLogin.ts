import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useAuth } from '@/hooks/use-auth';
import { isApiError } from '@/lib/api/errors';

export function useAdminLogin() {
  const router = useRouter();
  const { login, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      setAuthError(null);
      await logout();
      try {
        await login(
          { email: value.email, password: value.password },
          { role: 'admin' },
        );
        router.replace('/admin');
      } catch (error) {
        setAuthError(
          isApiError(error) ? error.message : 'Unable to sign in. Try again.',
        );
      }
    },
  });

  return {
    form,
    showPassword,
    setShowPassword,
    authError,
    clearError: () => setAuthError(null),
  };
}
