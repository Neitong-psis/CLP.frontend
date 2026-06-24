'use client';

import { useSearchParams } from 'next/navigation';
import {
  GoogleIcon,
  FacebookIcon,
  MicrosoftIcon,
} from '@/components/common/icons/SocialIcons';
import {
  isGoogleLoginEnabled,
  startGoogleLogin,
} from '@/services/auth/google-oauth';

const btnCls =
  '3xl:py-4 3xl:text-lg flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-[#00003e] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:shadow-none disabled:active:scale-100 sm:gap-2 sm:px-3 sm:py-3 sm:text-sm 2xl:rounded-2xl 2xl:py-3.5 2xl:text-base';

const iconCls = 'h-4 w-4 shrink-0 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6';

export default function OAuthButtons() {
  const searchParams = useSearchParams();
  const googleEnabled = isGoogleLoginEnabled();

  const rawRole = searchParams.get('role');
  const portal =
    rawRole === 'educator'
      ? ('educator' as const)
      : rawRole === 'admin'
        ? ('admin' as const)
        : ('learner' as const);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 2xl:gap-4">
      <button
        type="button"
        aria-label="Continue with Google"
        disabled={!googleEnabled}
        title={googleEnabled ? undefined : 'Google login is not configured.'}
        onClick={() => startGoogleLogin(searchParams.get('from'), portal)}
        className={btnCls}
      >
        <GoogleIcon className={iconCls} />
        <span>Google</span>
      </button>

      {/* Backend supports Facebook but no Meta app is configured yet. */}
      <button
        type="button"
        aria-label="Continue with Facebook"
        disabled
        title="Coming soon."
        className={btnCls}
      >
        <FacebookIcon className={`${iconCls} text-[#1877F2]`} />
        <span>Facebook</span>
      </button>

      {/* Not supported by the backend (google / facebook / apple only). */}
      <button
        type="button"
        aria-label="Continue with Microsoft"
        disabled
        title="Coming soon."
        className={btnCls}
      >
        <MicrosoftIcon className={iconCls} />
        <span>Microsoft</span>
      </button>
    </div>
  );
}
