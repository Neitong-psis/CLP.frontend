"use client";

import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import OAuthButtons from "./OAuthButtons";

type Tab = "login" | "signup";

export default function AuthCard() {
  const [tab, setTab] = useState<Tab>("login");

  return (
    <div>
      <div className="mb-5 2xl:mb-6">
        <h2 className="text-xl font-bold leading-tight text-[#00003e] sm:text-[1.6rem] 2xl:text-3xl 3xl:text-4xl">
          {tab === "login" ? "Log In to Your Account" : "Create an Account"}
        </h2>
        <p className="mt-1.5 text-sm text-[#00003e]/45 2xl:mt-2 2xl:text-base 3xl:text-lg">
          {tab === "login"
            ? "Enter your credentials to access your courses"
            : "Start your learning journey today"}
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mb-5 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1 2xl:mb-6 2xl:rounded-2xl">
        {(["login", "signup"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-[10px] py-2.5 text-sm font-semibold transition-all duration-200 2xl:rounded-xl 2xl:py-3 2xl:text-base 3xl:text-lg ${
              tab === t
                ? "bg-white text-[#f4a300] shadow-sm ring-1 ring-slate-200/60"
                : "text-[#00003e]/45 hover:text-[#00003e]/70"
            }`}
          >
            {t === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>

      {tab === "login" ? <LogInForm /> : <SignUpForm />}

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 2xl:my-6">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 2xl:text-xs 3xl:text-sm">
          Or
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <OAuthButtons />
    </div>
  );
}
