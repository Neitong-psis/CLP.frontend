'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/toast';
import {
  Search,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ClipboardCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { type CourseStatus, type AdminCourseRow } from '@/constants/admin';
import { useCourseManagement } from './_hooks/useCourseManagement';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TopBar from '@/components/common/TopBar';
import { ViewModal } from './_components/ViewModal';
import { EditModal } from './_components/EditModal';
import { DeleteModal } from './_components/DeleteModal';
import { RowContextMenu } from './_components/RowContextMenu';
import { CourseReviewOverlay } from './_components/review/CourseReviewOverlay';
import {
  PAGE_SIZE,
  STATUS_FILTERS,
  STATUS_STYLE,
  CATEGORY_STYLE,
} from './_lib/constants';

interface ContextMenuState {
  course: AdminCourseRow;
  x: number;
  y: number;
}

export default function AdminCoursesPage() {
  const { toast } = useToast();
  const { courses, loading, saveEdit, remove, publish, approve } =
    useCourseManagement();

  // ── State ──────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');
  const [page, setPage] = useState(1);
  const [viewCourse, setViewCourse] = useState<AdminCourseRow | null>(null);
  const [editCourse, setEditCourse] = useState<AdminCourseRow | null>(null);
  const [deleteCourse, setDeleteCourse] = useState<AdminCourseRow | null>(null);
  const [reviewCourse, setReviewCourse] = useState<AdminCourseRow | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  // Close context menu on outside click / Escape
  useEffect(() => {
    if (!contextMenu) return;
    const close = () => setContextMenu(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [contextMenu]);

  // ── Course table actions ────────────────────────────────────────────────────
  function handleRejectCourse(course: AdminCourseRow, feedback: string) {
    setReviewCourse(null);
    toast(
      `Feedback sent to ${course.instructor}. "${course.title}" stays pending.`,
      'error',
    );
    void feedback;
  }

  // ── Filtering / pagination ──────────────────────────────────────────────────
  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }
  function handleStatusFilter(val: CourseStatus | 'All') {
    setStatusFilter(val);
    setPage(1);
  }

  const filtered = courses.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pageStart =
    filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  const pendingCount = courses.filter((c) => c.status === 'Pending').length;
  const firstPending = courses.find((c) => c.status === 'Pending') ?? null;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Modals */}
      {viewCourse && (
        <ViewModal
          course={viewCourse}
          onClose={() => setViewCourse(null)}
          onEdit={() => {
            setEditCourse(viewCourse);
            setViewCourse(null);
          }}
        />
      )}
      {editCourse && (
        <EditModal
          course={editCourse}
          onSave={(updated) => {
            void saveEdit(updated);
            setEditCourse(null);
          }}
          onClose={() => setEditCourse(null)}
        />
      )}
      {deleteCourse && (
        <DeleteModal
          title={deleteCourse.title}
          onConfirm={() => {
            void remove(deleteCourse.id);
            setDeleteCourse(null);
          }}
          onClose={() => setDeleteCourse(null)}
        />
      )}
      {contextMenu && (
        <RowContextMenu
          course={contextMenu.course}
          x={contextMenu.x}
          y={contextMenu.y}
          onView={() => setViewCourse(contextMenu.course)}
          onEdit={() => setEditCourse(contextMenu.course)}
          onReview={() => setReviewCourse(contextMenu.course)}
          onPublish={() => void publish(contextMenu.course.id)}
          onDelete={() => setDeleteCourse(contextMenu.course)}
          onClose={() => setContextMenu(null)}
        />
      )}

      {reviewCourse && (
        <CourseReviewOverlay
          course={reviewCourse}
          onApprove={(course) => {
            void approve(course);
            setReviewCourse(null);
          }}
          onReject={handleRejectCourse}
          onClose={() => setReviewCourse(null)}
        />
      )}

      <div className="flex min-h-full flex-col">
        <TopBar
          role="admin"
          title="Course Management"
          subtitle="Live workspace synced for admin@clp.com"
        />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Pending-review banner */}
          {pendingCount > 0 && firstPending && (
            <div className="border-brand-gold/30 bg-brand-gold/5 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="bg-brand-gold/15 flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <ClipboardCheck className="text-brand-gold h-4 w-4" />
                </span>
                <p className="text-muted-foreground text-sm">
                  <span className="text-foreground font-semibold">
                    {pendingCount} course{pendingCount !== 1 ? 's' : ''}
                  </span>{' '}
                  awaiting review. Preview the content before approving.
                </p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-lg"
                onClick={() => setReviewCourse(firstPending)}
              >
                Review next
              </Button>
            </div>
          )}

          {/* Toolbar */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="relative min-w-24 flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-card text-foreground placeholder:text-muted-foreground h-9 w-full rounded-lg border pr-3 pl-9 text-sm outline-none focus:ring-2"
              />
            </div>
            <div className="border-border bg-card flex gap-0.5 rounded-full border p-1">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusFilter(s)}
                  className={cn(
                    'rounded-full px-3.5 py-1 text-xs font-semibold transition-colors',
                    statusFilter === s
                      ? 'bg-brand-gold text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="border-border bg-card overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border bg-surface border-b">
                    <th className="text-muted-foreground w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide uppercase">
                      #
                    </th>
                    {(
                      [
                        'COURSE',
                        'EDUCATOR',
                        'CATEGORY',
                        'ENROLLMENTS',
                        'RATING',
                        'CREATED',
                        'STATUS',
                        'ACTIONS',
                      ] as const
                    ).map((label) => (
                      <th
                        key={label}
                        className={cn(
                          'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide uppercase',
                          label === 'ACTIONS' ? 'text-right' : 'text-left',
                        )}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {loading &&
                    Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-4 py-4">
                          <div className="bg-muted h-3 w-5 rounded" />
                        </td>
                        {/* COURSE */}
                        <td className="max-w-55 px-5 py-4">
                          <div className="space-y-1.5">
                            <div className="bg-muted h-3 w-36 rounded" />
                            <div className="bg-muted/70 h-2.5 w-16 rounded" />
                          </div>
                        </td>
                        {/* EDUCATOR */}
                        <td className="px-5 py-4">
                          <div className="bg-muted h-3 w-24 rounded" />
                        </td>
                        {/* CATEGORY */}
                        <td className="px-5 py-4">
                          <div className="bg-muted h-5 w-20 rounded-full" />
                        </td>
                        {/* ENROLLMENTS */}
                        <td className="px-5 py-4">
                          <div className="bg-muted h-3 w-10 rounded" />
                        </td>
                        {/* RATING */}
                        <td className="px-5 py-4">
                          <div className="bg-muted h-3 w-8 rounded" />
                        </td>
                        {/* CREATED */}
                        <td className="px-5 py-4">
                          <div className="bg-muted h-3 w-20 rounded" />
                        </td>
                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <div className="bg-muted h-5 w-14 rounded-full" />
                        </td>
                        {/* ACTIONS */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end">
                            <div className="bg-muted h-6 w-6 rounded-lg" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  {!loading &&
                    paginated.map((course, idx) => (
                      <tr
                        key={course.id}
                        className={cn(
                          'hover:bg-muted/50 transition-colors',
                          contextMenu?.course.id === course.id && 'bg-muted/50',
                        )}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setContextMenu({
                            course,
                            x: e.clientX,
                            y: e.clientY,
                          });
                        }}
                      >
                        <td className="text-muted-foreground px-4 py-4 text-xs">
                          {pageStart + idx}
                        </td>
                        <td className="max-w-55 px-5 py-4">
                          <button
                            onClick={() => setViewCourse(course)}
                            className="block w-full text-left"
                          >
                            <p className="truncate text-sm font-semibold text-teal-500 underline-offset-2 hover:underline">
                              {course.title}
                            </p>
                            <p className="text-muted-foreground mt-0.5 text-[11px]">
                              {course.level}
                            </p>
                          </button>
                        </td>
                        <td className="text-muted-foreground px-5 py-4 text-sm">
                          {course.instructor}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                              CATEGORY_STYLE[course.category] ??
                                'border-border bg-muted text-muted-foreground border',
                            )}
                          >
                            {course.category}
                          </span>
                        </td>
                        <td className="text-foreground px-5 py-4 text-sm">
                          {course.enrolled.toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-foreground flex items-center gap-1 text-sm font-semibold">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {course.rating.toFixed(1)}
                          </span>
                        </td>
                        <td className="text-muted-foreground px-5 py-4 text-sm">
                          {course.createdAt}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                              STATUS_STYLE[course.status],
                            )}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="Course actions"
                                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg [&_svg]:size-4"
                                >
                                  <MoreHorizontal />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="border-border bg-card border shadow-md"
                              >
                                <DropdownMenuLabel className="text-muted-foreground">
                                  Actions
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  className="text-foreground focus:bg-muted"
                                  onSelect={() => setViewCourse(course)}
                                >
                                  <Eye className="h-3.5 w-3.5" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-foreground focus:bg-muted"
                                  onSelect={() => setEditCourse(course)}
                                >
                                  <Pencil className="h-3.5 w-3.5" /> Edit
                                </DropdownMenuItem>
                                {course.status === 'Pending' && (
                                  <DropdownMenuItem
                                    className="text-brand-gold focus:bg-brand-gold/10 focus:text-brand-gold-dark"
                                    onSelect={() => setReviewCourse(course)}
                                  >
                                    <ClipboardCheck className="h-3.5 w-3.5" />{' '}
                                    Review
                                  </DropdownMenuItem>
                                )}
                                {course.status === 'Archive' && (
                                  <DropdownMenuItem
                                    className="text-emerald-500 focus:bg-emerald-500/10 focus:text-emerald-500"
                                    onSelect={() => void publish(course.id)}
                                  >
                                    <Check className="h-3.5 w-3.5" /> Publish
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem
                                  className="text-rose-500 focus:bg-rose-500/10 focus:text-rose-500"
                                  onSelect={() => setDeleteCourse(course)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {!loading && filtered.length === 0 && (
              <p className="text-muted-foreground py-12 text-center text-sm">
                No courses match your search.
              </p>
            )}

            {/* Pagination */}
            <div className="border-border flex items-center justify-between border-t px-5 py-3">
              <p className="text-muted-foreground text-xs">
                Showing {pageStart}–{pageEnd} of {filtered.length} courses
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg disabled:opacity-30"
                >
                  <ChevronLeft />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setPage(p)}
                      className={cn(
                        'rounded-lg text-xs',
                        p === currentPage
                          ? 'bg-foreground text-background hover:opacity-90'
                          : 'text-muted-foreground hover:bg-muted',
                      )}
                    >
                      {p}
                    </Button>
                  ),
                )}
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg disabled:opacity-30"
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
