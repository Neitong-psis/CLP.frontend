import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button/Button';

/**
 * Simple column: `accessor` directly returns the cell content (ReactNode).
 * Backward-compatible with all existing DataTable usages.
 */
interface SimpleColumn<T> {
  header: React.ReactNode;
  /** A key of T or a function returning a ReactNode rendered directly in the cell. */
  accessor: keyof T | ((item: T) => React.ReactNode);
  cell?: never;
  className?: string;
}

/**
 * Rich column: `accessor` extracts a typed value from the row.
 * `cell` receives `{ row, value }` and returns the cell ReactNode.
 * Used by the admin/users page and other pages that need custom cell renderers.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RichColumn<T, V = any> {
  header: React.ReactNode;
  /** Extracts a value from the row — NOT rendered directly. */
  accessor: (item: T) => V;
  /** Custom cell renderer receiving both the row and the extracted value. */
  cell: (arg: { row: T; value: V }) => React.ReactNode;
  className?: string;
}

export type Column<T> = SimpleColumn<T> | RichColumn<T>;

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: React.ReactNode;
  className?: string;
  onRowClick?: (item: T) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
}

function renderCell<T>(col: Column<T>, item: T): React.ReactNode {
  // Rich column — has an explicit cell renderer
  if (col.cell !== undefined) {
    const value = col.accessor(item as Parameters<typeof col.accessor>[0]);
    return col.cell({ row: item, value } as Parameters<typeof col.cell>[0]);
  }

  // Simple column
  if (typeof col.accessor === 'function') {
    return col.accessor(item);
  }

  return item[col.accessor] as React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  emptyMessage = 'No data available',
  className,
  onRowClick,
  pagination,
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm',
        className,
      )}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={cn(
                  'px-6 py-4 text-xs font-bold tracking-wider text-slate-500 uppercase',
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'transition-colors hover:bg-slate-50/50',
                  onRowClick && 'cursor-pointer',
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={cn('px-6 py-4', col.className)}>
                    {renderCell(col, item)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-sm text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="animate-in fade-in flex items-center justify-between border-t border-slate-100 bg-white px-5 py-3.5 duration-200">
          <p className="text-xs font-medium text-slate-400">
            Showing{' '}
            {pagination.totalItems === 0
              ? 0
              : (pagination.currentPage - 1) * pagination.pageSize + 1}
            –
            {Math.min(
              pagination.currentPage * pagination.pageSize,
              pagination.totalItems,
            )}{' '}
            of {pagination.totalItems} items
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() =>
                pagination.onPageChange(Math.max(1, pagination.currentPage - 1))
              }
              disabled={pagination.currentPage === 1}
              className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <Button
                  key={p}
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => pagination.onPageChange(p)}
                  className={cn(
                    'rounded-lg text-xs font-semibold',
                    p === pagination.currentPage
                      ? 'bg-slate-900 text-white hover:bg-slate-800 hover:text-white'
                      : 'text-slate-500 hover:bg-slate-100',
                  )}
                >
                  {p}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() =>
                pagination.onPageChange(
                  Math.min(pagination.totalPages, pagination.currentPage + 1),
                )
              }
              disabled={pagination.currentPage === pagination.totalPages}
              className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
