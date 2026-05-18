"use client";

import { Eye, EyeOff } from "lucide-react";

export const inputCls =
  "w-full bg-transparent py-0 pl-10 pr-4 text-sm text-[#00003e] placeholder:text-slate-400 outline-none 2xl:text-base 3xl:text-lg";

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold text-[#00003e] 2xl:text-base 3xl:text-lg"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function InputWrapper({
  icon,
  suffix,
  children,
}: {
  icon: React.ReactNode;
  suffix?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 transition focus-within:border-[#f4a300] focus-within:ring-2 focus-within:ring-[#f4a300]/20 2xl:rounded-2xl 2xl:px-4 2xl:py-3.5 3xl:py-4">
      <span className="shrink-0">{icon}</span>
      {children}
      {suffix && <span className="ml-auto shrink-0">{suffix}</span>}
    </div>
  );
}

export function PasswordToggle({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-slate-400 transition-colors hover:text-slate-600"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? (
        <EyeOff className="h-[18px] w-[18px] 2xl:h-5 2xl:w-5" />
      ) : (
        <Eye className="h-[18px] w-[18px] 2xl:h-5 2xl:w-5" />
      )}
    </button>
  );
}

export function SubmitBtn({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-[#f4a300] py-3.5 text-sm font-bold text-white shadow-md shadow-[#f4a300]/30 transition-all duration-200 hover:bg-[#e09400] hover:shadow-lg hover:shadow-[#f4a300]/40 active:scale-[0.98] 2xl:rounded-2xl 2xl:py-4 2xl:text-base 3xl:py-5 3xl:text-lg"
    >
      {label}
    </button>
  );
}
