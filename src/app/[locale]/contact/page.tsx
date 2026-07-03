'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@ayla.edu.kh',
    href: 'mailto:hello@ayla.edu.kh',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+855 23 000 000',
    href: 'tel:+85523000000',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Phnom Penh, Cambodia',
    href: null,
  },
] as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  }

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
              <Mail className="text-brand-gold size-7" />
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Body */}
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact info */}
          <div>
            <h2 className="text-brand-navy mb-2 text-xl font-bold">
              Get in touch
            </h2>
            <p className="text-brand-navy/60 mb-8 leading-relaxed">
              Our team is here Monday to Friday, 8 am – 6 pm (ICT). We typically
              respond within one business day.
            </p>

            <div className="space-y-5">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="bg-brand-gold/10 flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="text-brand-gold size-5" />
                  </span>
                  <div>
                    <p className="text-brand-navy text-xs font-semibold tracking-wide uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-brand-navy/70 hover:text-brand-gold mt-0.5 text-sm transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-brand-navy/70 mt-0.5 text-sm">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-border mt-10 border-t pt-8">
              <p className="text-brand-navy/50 text-sm">
                For legal enquiries, see our{' '}
                <Link
                  href="/privacy"
                  className="text-brand-gold font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  href="/terms"
                  className="text-brand-gold font-semibold hover:underline"
                >
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-surface border-border rounded-2xl border p-6 sm:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle className="text-brand-gold size-12" />
                <h3 className="text-brand-navy text-lg font-bold">
                  Message sent!
                </h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed">
                  Thank you for reaching out. We&apos;ll get back to you within
                  one business day.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="text-brand-gold mt-2 text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  void handleSubmit(e);
                }}
                noValidate
                className="space-y-5"
              >
                <h2 className="text-brand-navy mb-1 text-lg font-bold">
                  Send a message
                </h2>

                <div>
                  <label
                    htmlFor="name"
                    className="text-brand-navy mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={cn(
                      'border-border bg-card text-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-2.5 text-sm transition-colors outline-none',
                      'focus:border-brand-gold/50 focus:ring-brand-gold/20 focus:ring-2',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-brand-navy mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={cn(
                      'border-border bg-card text-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-2.5 text-sm transition-colors outline-none',
                      'focus:border-brand-gold/50 focus:ring-brand-gold/20 focus:ring-2',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-brand-navy mb-1.5 block text-xs font-semibold tracking-wide uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className={cn(
                      'border-border bg-card text-foreground placeholder:text-muted-foreground w-full resize-none rounded-xl border px-4 py-2.5 text-sm transition-colors outline-none',
                      'focus:border-brand-gold/50 focus:ring-brand-gold/20 focus:ring-2',
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'bg-brand-gold text-brand-navy flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all',
                    loading
                      ? 'cursor-not-allowed opacity-60'
                      : 'hover:bg-brand-gold/90 hover:scale-[1.01] active:scale-95',
                  )}
                >
                  {loading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
