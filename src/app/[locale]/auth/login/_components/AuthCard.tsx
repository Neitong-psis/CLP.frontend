'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail } from 'lucide-react';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import OAuthButtons from './OAuthButtons';

type Tab = 'login' | 'signup';
type Role = 'learner' | 'educator';

function EducatorContactPanel({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <div className="border-brand-gold/25 rounded-xl border bg-amber-50 px-5 py-6 text-center 2xl:px-6 2xl:py-8">
      <div className="bg-brand-gold/10 mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full 2xl:mb-4 2xl:h-13 2xl:w-13">
        <Mail className="text-brand-gold h-5 w-5 2xl:h-6 2xl:w-6" />
      </div>

      <h3 className="text-brand-navy mb-1.5 text-base font-bold 2xl:text-lg">
        Interested in teaching?
      </h3>
      <p className="text-brand-navy/55 mb-4 text-sm leading-relaxed 2xl:mb-5 2xl:text-base">
        Educator accounts are set up by our team. Reach out and we will get you
        onboarded.
      </p>

      <a
        href="mailto:educators@qbtech.edu"
        className="bg-brand-gold hover:bg-brand-gold/90 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors 2xl:rounded-xl 2xl:px-6 2xl:py-3 2xl:text-base"
      >
        Contact Us
      </a>

      <p className="mt-3 text-xs text-slate-400 2xl:mt-4 2xl:text-sm">
        Already have an educator account?{' '}
        <button
          type="button"
          className="text-brand-gold font-semibold hover:underline"
          onClick={onLoginClick}
        >
          Log in instead
        </button>
      </p>
    </div>
  );
}

const HEADING: Record<Tab, Record<Role, { heading: string; sub: string }>> = {
  login: {
    learner: {
      heading: 'Log In to Your Account',
      sub: 'Enter your credentials to access your courses',
    },
    educator: {
      heading: 'Educator Log In',
      sub: 'Access your teaching dashboard and manage courses',
    },
  },
  signup: {
    learner: {
      heading: 'Create an Account',
      sub: 'Start your learning journey today',
    },
    educator: {
      heading: 'Become an Educator',
      sub: 'Join our community of expert educators',
    },
  },
};

export default function AuthCard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>(
    searchParams.get('tab') === 'signup' ? 'signup' : 'login',
  );
  const role: Role =
    searchParams.get('role') === 'educator' ? 'educator' : 'learner';
  const copy = HEADING[tab][role];

  const isEducatorSignup = tab === 'signup' && role === 'educator';

  function handleTabChange(next: Tab) {
    setTab(next);
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-5 2xl:mb-6">
        <h2 className="3xl:text-4xl text-brand-navy text-xl leading-tight font-bold sm:text-[1.6rem] 2xl:text-3xl">
          {copy.heading}
        </h2>
        <p className="3xl:text-lg text-brand-navy/45 mt-1.5 text-sm 2xl:mt-2 2xl:text-base">
          {copy.sub}
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mb-4 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1 2xl:mb-5 2xl:rounded-2xl">
        {(['login', 'signup'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTabChange(t)}
            className={`3xl:text-lg w-full rounded-[10px] py-2.5 text-sm font-semibold transition-all duration-200 outline-none 2xl:rounded-xl 2xl:py-3 2xl:text-base ${
              tab === t
                ? 'text-brand-gold bg-white shadow-sm'
                : 'text-brand-navy/50 hover:text-brand-navy/75'
            }`}
          >
            {t === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        ))}
      </div>

      {/* Form area */}
      {isEducatorSignup ? (
        <EducatorContactPanel onLoginClick={() => handleTabChange('login')} />
      ) : tab === 'login' ? (
        <LogInForm />
      ) : (
        <SignUpForm />
      )}

      {/* OAuth — hidden for educator sign-up */}
      {!isEducatorSignup && (
        <>
          <div className="my-5 flex items-center gap-3 2xl:my-6">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="3xl:text-sm text-[11px] font-semibold tracking-widest text-slate-400 uppercase 2xl:text-xs">
              Or
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <OAuthButtons />
        </>
      )}
    </div>
  );
}
