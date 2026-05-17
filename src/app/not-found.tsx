import Link from "next/link";
import { FileQuestion } from "lucide-react";
import type { Metadata } from "next";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-[#E2E8F0]">
        <FileQuestion className="h-8 w-8 text-[#E6A23C]" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#64748B]">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0F172A]">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#64748B]">
          The page you are looking for does not exist, or you may not have access.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={ROUTES.home}
          className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2 text-sm font-semibold text-[#0F172A] shadow-sm hover:bg-[#F8FAFC]"
        >
          Home
        </Link>
        <Link
          href={ROUTES.dashboard.root}
          className="rounded-xl bg-[#E6A23C] px-5 py-2 text-sm font-semibold text-[#0F172A] shadow-sm ring-1 ring-[#F5D595]/70 hover:brightness-[1.03]"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
