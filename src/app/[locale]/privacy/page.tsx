import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { BRAND } from '@/constants/brand';
import { Shield } from 'lucide-react';

const LAST_UPDATED = 'June 2026';

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: `We collect information you provide directly to us, such as your name, email address, and account credentials when you register. We also collect usage data — pages visited, features used, and time spent — to improve the platform experience. Payment information is processed by our payment provider and is never stored on our servers.`,
  },
  {
    title: 'How We Use Your Information',
    body: `Your information is used to operate and improve the Content Learning Platform, personalise your learning experience, send you notifications about your courses and progress, respond to support requests, and comply with our legal obligations. We do not sell your personal data to third parties.`,
  },
  {
    title: 'Cookies and Tracking',
    body: `We use cookies and similar technologies to maintain your session, remember your preferences, and analyse platform usage. You can control cookie settings through your browser. Disabling cookies may affect some platform functionality such as staying signed in.`,
  },
  {
    title: 'Data Sharing',
    body: `We share your data only with service providers who help us operate the platform (hosting, email, analytics) under strict data-processing agreements. We may disclose data if required by law or to protect the rights and safety of our users.`,
  },
  {
    title: 'Data Retention',
    body: `We retain your account data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us. Some data may be retained for legal or audit purposes.`,
  },
  {
    title: 'Your Rights',
    body: `You have the right to access, correct, or delete the personal data we hold about you. You may also request a copy of your data in a portable format. To exercise any of these rights, contact us at the address below. We will respond within 30 days.`,
  },
  {
    title: 'Security',
    body: `We implement industry-standard security measures including TLS encryption, access controls, and regular security reviews. No system is completely secure; we encourage you to use a strong password and to notify us immediately of any suspected unauthorised access.`,
  },
  {
    title: 'Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date and, where changes are material, notify you by email or an in-platform notice. Continued use of the platform after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: 'Contact',
    body: `Questions about this Privacy Policy? Reach us at privacy@ayla.edu.kh or write to ${BRAND.name}, Phnom Penh, Cambodia.`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-brand-navy relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 flex justify-center">
            <span className="bg-brand-gold/15 border-brand-gold/20 flex size-14 items-center justify-center rounded-2xl border">
              <Shield className="text-brand-gold size-7" />
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            {BRAND.name} respects your privacy. This policy explains what data
            we collect, how we use it, and the choices you have.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-brand-navy mb-3 text-lg font-bold">
                {section.title}
              </h2>
              <p className="text-brand-navy/60 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="border-border mt-14 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Still have questions?{' '}
            <Link
              href="/contact"
              className="text-brand-gold font-semibold hover:underline"
            >
              Contact us
            </Link>{' '}
            or review our{' '}
            <Link
              href="/terms"
              className="text-brand-gold font-semibold hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
