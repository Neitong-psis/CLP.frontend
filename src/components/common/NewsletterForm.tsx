'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to subscribe API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-sm focus-within:border-[#f4a300]/50"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your.email@school.edu"
        aria-label="Email address"
        className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
      />
      <button
        type="submit"
        className="group flex items-center gap-1.5 rounded-full bg-[#f4a300] px-5 py-2.5 text-sm font-semibold text-[#00003e] transition-all hover:bg-white"
      >
        Subscribe
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
