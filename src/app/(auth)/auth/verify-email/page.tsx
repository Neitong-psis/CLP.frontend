import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-panel";
import { VerifyEmailForm } from "@/components/auth/forms/verify-email-form";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Confirm ownership of your inbox for CLP access.",
};

export default function VerifyEmailPage() {
  return (
    <AuthShell title="Verify your inbox" subtitle="Paste the verification code delivered to your mailbox." >
      <VerifyEmailForm />
    </AuthShell>
  );
}
