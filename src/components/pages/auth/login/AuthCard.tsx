"use client";

import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import OAuthButtons from "./OAuthButtons";

type Tab = "login" | "signup";

const TAB_COPY = {
  login: {
    heading: "Welcome Back!",
    sub: "Sign in to continue your learning journey",
    cta: (
      <>
        Don&apos;t have an account?{" "}
        <span className="font-semibold text-[#f4a300]">Sign up</span>
      </>
    ),
    ctaTab: "signup" as Tab,
  },
  signup: {
    heading: "Create Your Account",
    sub: "Join thousands of learners worldwide",
    cta: (
      <>
        Already have an account?{" "}
        <span className="font-semibold text-[#f4a300]">Sign in</span>
      </>
    ),
    ctaTab: "login" as Tab,
  },
};

export default function AuthCard() {
  const [tab, setTab] = useState<Tab>("login");
  const copy = TAB_COPY[tab];

  return (
    <div>
      {/* Heading */}
      <div className="mb-5 2xl:mb-6">
        <h2 className="text-xl font-bold leading-tight text-[#00003e] sm:text-[1.6rem] 2xl:text-3xl 3xl:text-4xl">
          {copy.heading}
        </h2>
        <p className="mt-1.5 text-sm text-[#00003e]/45 2xl:mt-2 2xl:text-base">
          {copy.sub}
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mb-5 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1 2xl:mb-6 2xl:rounded-2xl">
        {(["login", "signup"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-[10px] py-2.5 text-sm font-semibold transition-all duration-200 2xl:rounded-xl 2xl:py-3 2xl:text-base ${
              tab === t
                ? "bg-white text-[#f4a300] shadow-sm ring-1 ring-slate-200/60"
                : "text-[#00003e]/45 hover:text-[#00003e]/70"
            }`}
          >
            {t === "login" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Animated form swap */}
      <div key={tab} className="animate-fade-up">
        {tab === "login" ? <LogInForm /> : <SignUpForm />}
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 2xl:my-6">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Or continue with
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <OAuthButtons />

      {/* Bottom switch link */}
      <p
        className="mt-5 cursor-pointer text-center text-sm text-slate-500 transition-opacity hover:opacity-80 2xl:mt-6 2xl:text-base"
        onClick={() => setTab(copy.ctaTab)}
      >
        {copy.cta}
      </p>
    </div>
  );
}
