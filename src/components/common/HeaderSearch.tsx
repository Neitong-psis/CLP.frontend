'use client';

import { memo } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';

export const HeaderSearch = memo(function HeaderSearch() {
  const { query, handleChange } = useSearch();

  return (
    <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-[#00003e]/10 bg-[#00003e]/[0.04] py-1.5 pr-1.5 pl-4 transition-all duration-200 focus-within:border-[#f4a300]/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#f4a300]/15 hover:border-[#00003e]/20 hover:bg-[#00003e]/[0.07]">
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search courses, programs…"
        aria-label="Search"
        className="min-w-0 flex-1 bg-transparent py-1 text-sm text-[#00003e] outline-none placeholder:text-[#00003e]/40"
      />
      <button
        type="button"
        aria-label="Submit search"
        className="group flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f4a300] text-[#00003e] transition-all duration-200 hover:scale-110 hover:bg-[#e09400] hover:ring-4 hover:ring-[#f4a300]/25"
      >
        <Search
          aria-hidden
          className="h-4 w-4 transition-[rotate] duration-300 ease-out group-hover:rotate-12"
        />
      </button>
    </div>
  );
});
