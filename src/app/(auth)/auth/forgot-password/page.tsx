import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-panel";
import { ForgotPasswordForm } from "@/components/auth/forms/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a reset link for your CLP account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Reset access" subtitle="Provide your email — we send a recovery link." >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
