"use client";

import { memo } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";

export const HeaderSearch = memo(function HeaderSearch() {
  const { query, handleChange } = useSearch();

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00003e]/40 pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search courses, programs…"
        aria-label="Search"
        className="w-full rounded-full border border-[#00003e]/15 bg-[#00003e]/[0.03] py-2 pl-9 pr-4 text-sm text-[#00003e] placeholder-[#00003e]/40 outline-none transition-all focus:border-[#f4a300] focus:bg-white focus:ring-2 focus:ring-[#f4a300]/20"
      />
    </div>
  );
});
