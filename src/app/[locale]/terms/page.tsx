import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { BRAND } from '@/constants/brand';
import { FileText } from 'lucide-react';

const LAST_UPDATED = 'June 2026';

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: `By accessing or using the ${BRAND.platform.name} (the "Platform"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the Platform. We may update these terms at any time; continued use after changes are posted constitutes your acceptance.`,
  },
  {
    title: 'Use of the Platform',
    body: `You may use the Platform only for lawful purposes and in accordance with these Terms. You agree not to use the Platform to upload, transmit, or distribute any content that is unlawful, harmful, or infringes any third-party rights; attempt to gain unauthorised access to any part of the Platform or its systems; or interfere with the proper working of the Platform.`,
  },
  {
    title: 'Account Responsibilities',
    body: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately of any suspected unauthorised use. Accounts are personal and non-transferable — you may not share your login with others.`,
  },
  {
    title: 'Course Enrolment and Access',
    body: `Upon successful payment you are granted a non-exclusive, non-transferable licence to access the enrolled course content for personal learning purposes only. Course access is subject to the terms at the time of purchase. We reserve the right to update or remove content; material changes will be notified in advance where possible.`,
  },
  {
    title: 'Payments and Refunds',
    body: `All prices are displayed in USD and inclusive of applicable taxes unless stated otherwise. Payments are processed securely through our payment provider. Refunds may be requested within 7 days of purchase, provided you have not completed more than 30% of the course. Contact support to initiate a refund.`,
  },
  {
    title: 'Intellectual Property',
    body: `All course content, branding, software, and materials on the Platform are the property of ${BRAND.name} or its licensors and are protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any Platform content without express written permission.`,
  },
  {
    title: 'User-Generated Content',
    body: `If you submit comments, reviews, or other content to the Platform, you grant us a worldwide, royalty-free licence to use, reproduce, and display that content in connection with operating the Platform. You retain ownership of your submissions but are solely responsible for their accuracy and lawfulness.`,
  },
  {
    title: 'Disclaimers',
    body: `The Platform is provided "as is" without warranties of any kind, express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free of harmful components. Educational content is provided for informational purposes and does not constitute professional advice.`,
  },
  {
    title: 'Limitation of Liability',
    body: `To the maximum extent permitted by law, ${BRAND.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total liability for any claim relating to the Platform shall not exceed the amount you paid us in the 12 months preceding the claim.`,
  },
  {
    title: 'Governing Law',
    body: `These Terms are governed by the laws of the Kingdom of Cambodia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Phnom Penh, Cambodia.`,
  },
  {
    title: 'Contact',
    body: `Questions about these Terms? Contact us at legal@ayla.edu.kh or write to ${BRAND.name}, Phnom Penh, Cambodia.`,
  },
] as const;

export default function TermsPage() {
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
              <FileText className="text-brand-gold size-7" />
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Please read these terms carefully before using the{' '}
            {BRAND.platform.name}.
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
            Have a question?{' '}
            <Link
              href="/contact"
              className="text-brand-gold font-semibold hover:underline"
            >
              Contact us
            </Link>{' '}
            or review our{' '}
            <Link
              href="/privacy"
              className="text-brand-gold font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
