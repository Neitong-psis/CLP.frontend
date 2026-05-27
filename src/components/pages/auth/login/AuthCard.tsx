'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import OAuthButtons from './OAuthButtons';

type Tab = 'login' | 'signup';

export default function AuthCard() {
  const [tab, setTab] = useState<Tab>('login');

  return (
    <div>
      <div className="mb-5 2xl:mb-6">
        <h2 className="3xl:text-4xl text-xl leading-tight font-bold text-brand-navy sm:text-[1.6rem] 2xl:text-3xl">
          {tab === 'login' ? 'Log In to Your Account' : 'Create an Account'}
        </h2>
        <p className="3xl:text-lg mt-1.5 text-sm text-brand-navy/45 2xl:mt-2 2xl:text-base">
          {tab === 'login'
            ? 'Enter your credentials to access your courses'
            : 'Start your learning journey today'}
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mb-5 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1 2xl:mb-6 2xl:rounded-2xl">
        {(['login', 'signup'] as Tab[]).map((t) => (
          <Button
            key={t}
            variant="ghost"
            onClick={() => setTab(t)}
            className={`3xl:text-lg w-full rounded-[10px] py-2.5 font-semibold 2xl:rounded-xl 2xl:py-3 2xl:text-base ${
              tab === t
                ? 'bg-white text-brand-gold shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:text-brand-gold'
                : 'text-brand-navy/45 hover:bg-transparent hover:text-brand-navy/70'
            }`}
          >
            {t === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
        ))}
      </div>

      {tab === 'login' ? <LogInForm /> : <SignUpForm />}

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 2xl:my-6">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="3xl:text-sm text-[11px] font-semibold tracking-widest text-slate-400 uppercase 2xl:text-xs">
          Or
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <OAuthButtons />
    </div>
  );
}
