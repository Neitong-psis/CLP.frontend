import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DataTableColumn<TRow> {
  readonly id: string;
  readonly header: string;
  readonly cell: (row: TRow) => ReactNode;
  readonly className?: string;
  readonly headerClassName?: string;
}

export interface DataTableProps<TRow> {
  readonly rows: readonly TRow[];
  readonly columns: readonly DataTableColumn<TRow>[];
  readonly getRowKey?: (row: TRow, index: number) => string;
  readonly className?: string;
  readonly emptyFallback?: ReactNode;
}

export function DataTable<TRow>({
  rows,
  columns,
  getRowKey,
  className,
  emptyFallback,
}: DataTableProps<TRow>) {
  const hasRows = rows.length > 0;

  if (!hasRows) {
    return (
      emptyFallback ?? (
        <p className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6 text-sm text-[#64748B]">
          No rows to display.
        </p>
      )
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm",
        className,
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[#F8FAFC] text-[#475569]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wide",
                    col.headerClassName,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={getRowKey ? getRowKey(row, rowIndex) : `row:${String(rowIndex)}`}
                className="border-t border-[#EEF2FF] transition-colors hover:bg-[#FBFDFF]"
              >
                {columns.map((col) => (
                  <td
                    key={`${col.id}:${getRowKey ? getRowKey(row, rowIndex) : String(rowIndex)}`}
                    className={cn(
                      "whitespace-nowrap px-4 py-3 text-[#0F172A]",
                      col.className,
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
