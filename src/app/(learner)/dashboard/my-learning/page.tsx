import { Bell, Moon, Play, Award } from "lucide-react";
import { ENROLLED_COURSES, MOCK_USER, CATEGORY_GRADIENT } from "@/config/learner";
import MyLearningTabs from "@/components/learner/MyLearningTabs";

export default function MyLearningPage() {
  return (
    <div className="min-h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-[#00003e] sm:text-xl">My Learning</h1>
          <p className="text-xs text-slate-400">{ENROLLED_COURSES.length} courses enrolled</p>
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
        <MyLearningTabs courses={ENROLLED_COURSES} />
      </div>
    </div>
  );
}
