import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-panel";
import { RegisterForm } from "@/components/auth/forms/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Register for the Content Learning Platform.",
};

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" subtitle="Invite-only environments can disable public registration." >
      <RegisterForm />
    </AuthShell>
  );
}
