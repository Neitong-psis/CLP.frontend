'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { type AuthTab, AUTH_TABS } from '@/constants/auth';
import LogInForm from './LogInForm';
import SignInForm from './SignInForm';
import OAuthButtons from './OAuthButtons';

export default function AuthCard() {
  const [tab, setTab] = useState<AuthTab>('login');
  const copy = AUTH_TABS[tab];

  return (
    <div>
      <div className="mb-5 2xl:mb-6">
        <h2 className="3xl:text-4xl text-brand-navy text-xl leading-tight font-bold sm:text-[1.6rem] 2xl:text-3xl">
          {copy.heading}
        </h2>
        <p className="text-brand-navy/45 mt-1.5 text-sm 2xl:mt-2 2xl:text-base">
          {copy.sub}
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-50 p-1 2xl:mb-6">
        {(Object.keys(AUTH_TABS) as AuthTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'rounded-md py-2.5 text-sm font-semibold transition-colors 2xl:py-3 2xl:text-base',
              tab === t
                ? 'text-brand-gold bg-white ring-1 ring-slate-200/60'
                : 'text-brand-navy/45 hover:text-brand-navy/70',
            )}
          >
            {AUTH_TABS[t].label}
          </button>
        ))}
      </div>

      <div key={tab}>{tab === 'login' ? <LogInForm /> : <SignInForm />}</div>

      <div className="my-5 flex items-center gap-3 2xl:my-6">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
          Or continue with
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <OAuthButtons />
    </div>
  );
}
