"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { ROUTES } from "@/config/routes";

interface ErrorProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Structured logging placeholder for production integrations.
    if (process.env.NODE_ENV !== "production") {
      console.error("[CLP:error]", error);
    }
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-6 py-14 text-center">
      <AlertTriangle className="h-10 w-10 text-[#E6A23C]" aria-hidden />
      <h1 className="text-2xl font-semibold text-[#0F172A]">Something went wrong</h1>
      <p className="text-sm leading-7 text-[#64748B]">
        Try again. If this keeps happening, contact your administrator with the correlation id below.
      </p>
      {typeof error.digest !== "undefined" ? (
        <p className="rounded-lg bg-[#F1F5F9] px-3 py-2 font-mono text-xs text-[#475569]">
          {error.digest}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-[#0F172A] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1E293B]"
        >
          Try again
        </button>
        <Link
          href={ROUTES.dashboard.root}
          className="rounded-xl bg-[#E6A23C] px-5 py-2 text-sm font-semibold text-[#0F172A] shadow-sm ring-1 ring-[#F5D595]/70 hover:brightness-[1.03]"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
