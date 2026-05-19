import { Bell, Moon } from "lucide-react";
import { ALL_COURSES } from "@/config/learner";
import ExploreFilter from "@/components/learner/ExploreFilter";

export default function ExplorePage() {
  return (
    <div className="min-h-full">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-[#00003e] sm:text-xl">Explore Courses</h1>
          <p className="text-xs text-slate-400">Discover new programs and expand your skills</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Moon className="h-4 w-4" />
          </button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f4a300]" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <ExploreFilter courses={ALL_COURSES} />
      </div>
    </div>
  );
}
