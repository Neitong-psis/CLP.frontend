export interface TopCourseDatum {
  title: string;
  enrolled: number;
  completion: number;
}

export interface TopCoursesTableProps {
  title: string;
  subtitle: string;
  columns: [rank: string, course: string, enrolled: string, completion: string];
  courses: TopCourseDatum[];
}

// Moved verbatim from analytics/page.tsx ("Top performing courses" card).
export function TopCoursesTable({
  title,
  subtitle,
  columns,
  courses,
}: TopCoursesTableProps) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/3">
      <div className="border-b border-white/[0.07] px-5 py-4">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="mt-0.5 text-[11px] text-white/35">{subtitle}</p>
      </div>
      <div className="scrollbar-none overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              {columns.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[11px] font-semibold tracking-wide text-white/35 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, i) => (
              <tr
                key={course.title}
                className="border-b border-white/4 hover:bg-white/2"
              >
                <td className="px-5 py-3.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-[11px] font-bold text-white/40">
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-medium text-white">
                  {course.title}
                </td>
                <td className="px-5 py-3.5 text-white/55">
                  {course.enrolled.toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="overflow-hidden rounded-full bg-white/8"
                      style={{ height: '6px', width: '80px' }}
                    >
                      <div
                        className="bg-brand-gold h-full rounded-full"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-white/40">
                      {course.completion}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
