"use client";

import { useState, useTransition } from "react";
import type { UserProfileDto } from "@/types/dto";
import { profileSchema } from "@/schemas/profile";
import { notifyError, notifySuccess } from "@/lib/toast";
import { cn } from "@/lib/cn";

interface ProfileFormProps {
  readonly initialProfile: UserProfileDto;
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialProfile.name);
  const [headline, setHeadline] = useState("Senior learner · CLP Pilot");
  const [timezone, setTimezone] = useState("Asia/Phnom_Penh");

  return (
    <form
      className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const parsed = profileSchema.safeParse({ name, headline, timezone });
          if (!parsed.success) {
            notifyError(parsed.error.issues.at(0)?.message ?? "Check your inputs.");
            return;
          }

          await new Promise((r) => setTimeout(r, 260));
          notifySuccess("Profile updated locally (mock).");
        });
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={controlClass()}
          />
        </Field>

        <Field label="Timezone" htmlFor="timezone">
          <input
            id="timezone"
            name="timezone"
            required
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={controlClass()}
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Headline" htmlFor="headline">
            <input
              id="headline"
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className={controlClass()}
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 grid gap-2 md:grid-cols-3">
        <div className="rounded-xl border border-[#EEF2FF] bg-[#F8FAFC] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
            Role
          </p>
          <p className="mt-2 text-sm font-semibold text-[#0F172A]">{initialProfile.role}</p>
        </div>
        <div className="rounded-xl border border-[#EEF2FF] bg-[#F8FAFC] p-4 md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
            Email
          </p>
          <p className="mt-2 truncate text-sm font-semibold text-[#0F172A]">
            {initialProfile.email}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "mt-6 rounded-xl bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm",
          "hover:bg-[#1E293B] disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A23C]",
        )}
      >
        {isPending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  readonly label: string;
  readonly htmlFor: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#0F172A]" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

function controlClass() {
  return cn(
    "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A] shadow-sm",
    "outline-none ring-1 ring-transparent focus:border-transparent focus:ring-[#E6A23C]",
  );
}
