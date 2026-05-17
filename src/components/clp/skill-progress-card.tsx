import type { SkillProgressDto } from "@/types/dto";
import { ProgressBar } from "@/components/clp/progress-bar";

interface SkillProgressCardProps {
  readonly skills: readonly SkillProgressDto[];
}

export function SkillProgressCard({ skills }: SkillProgressCardProps) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[#0F172A]">Skill Progress</h2>
        <p className="mt-1 text-sm text-[#64748B]">Based on completed content</p>
      </header>

      <ul className="space-y-4">
        {skills.map((s) => {
          const rowId = `skill-${s.skill.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <li key={s.skill} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span id={`${rowId}-label`} className="font-medium text-[#0F172A]">
                  {s.skill}
                </span>
                <span className="text-[#64748B]">{s.progressPercent}%</span>
              </div>
              <ProgressBar
                variant="thick"
                value={s.progressPercent}
                ariaLabelledBy={`${rowId}-label`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
