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
import {
  ADMIN_COURSES,
  type CourseStatus,
  type AdminCourseRow,
} from '@/constants/admin';
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

  // ── State ──────────────────────────────────────────────────────────────────
  const [courses, setCourses] = useState<AdminCourseRow[]>(ADMIN_COURSES);
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
  function handlePublish(id: string) {
    const course = courses.find((c) => c.id === id);
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Public' } : c)),
    );
    toast(`"${course?.title}" published successfully.`, 'success');
  }

  function handleSaveEdit(updated: AdminCourseRow) {
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditCourse(null);
    toast(`"${updated.title}" has been updated.`, 'success');
  }

  function handleDelete(id: string) {
    const course = courses.find((c) => c.id === id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setDeleteCourse(null);
    toast(`"${course?.title}" was deleted.`, 'error');
  }

  // ── Course review actions ───────────────────────────────────────────────────
  // A pending course is approved or rejected only after the admin previews its
  // content in the review overlay — never with a single one-click action.
  function handleApproveCourse(course: AdminCourseRow) {
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, status: 'Public' } : c)),
    );
    setReviewCourse(null);
    toast(`"${course.title}" approved and published.`, 'success');
  }

  function handleRejectCourse(course: AdminCourseRow, feedback: string) {
    // Course stays pending until the educator resubmits; feedback goes to them.
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
          onSave={handleSaveEdit}
          onClose={() => setEditCourse(null)}
        />
      )}
      {deleteCourse && (
        <DeleteModal
          title={deleteCourse.title}
          onConfirm={() => handleDelete(deleteCourse.id)}
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
          onPublish={() => handlePublish(contextMenu.course.id)}
          onDelete={() => setDeleteCourse(contextMenu.course)}
          onClose={() => setContextMenu(null)}
        />
      )}

      {reviewCourse && (
        <CourseReviewOverlay
          course={reviewCourse}
          onApprove={handleApproveCourse}
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
          {/* Pending-review banner — courses must be previewed before approval */}
          {pendingCount > 0 && firstPending && (
            <div className="border-brand-gold/30 bg-brand-gold/5 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="bg-brand-gold/15 flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <ClipboardCheck className="text-brand-gold h-4 w-4" />
                </span>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">
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
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
              />
            </div>
            <div className="flex gap-0.5 rounded-full border border-slate-200 bg-white p-1">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusFilter(s)}
                  className={cn(
                    'rounded-full px-3.5 py-1 text-xs font-semibold transition-colors',
                    statusFilter === s
                      ? 'bg-brand-gold text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
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
                          'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                          label === 'ACTIONS' ? 'text-right' : 'text-left',
                        )}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((course, idx) => (
                    <tr
                      key={course.id}
                      className={cn(
                        'transition-colors hover:bg-slate-50',
                        contextMenu?.course.id === course.id && 'bg-slate-50',
                      )}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({ course, x: e.clientX, y: e.clientY });
                      }}
                    >
                      <td className="px-4 py-4 text-xs text-slate-400">
                        {pageStart + idx}
                      </td>
                      <td className="max-w-55 px-5 py-4">
                        <button
                          onClick={() => setViewCourse(course)}
                          className="block w-full text-left"
                        >
                          <p className="truncate text-sm font-semibold text-teal-600 underline-offset-2 hover:underline">
                            {course.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            {course.level}
                          </p>
                        </button>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {course.instructor}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                            CATEGORY_STYLE[course.category] ??
                              'border border-slate-200 bg-slate-50 text-slate-600',
                          )}
                        >
                          {course.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-700">
                        {course.enrolled.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {course.rating.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
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
                                className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 [&_svg]:size-4"
                              >
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="border border-slate-200 bg-white shadow-md"
                            >
                              <DropdownMenuLabel className="text-slate-400">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                className="text-slate-700 focus:bg-slate-50 focus:text-slate-900"
                                onSelect={() => setViewCourse(course)}
                              >
                                <Eye className="h-3.5 w-3.5" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-700 focus:bg-slate-50 focus:text-slate-900"
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
                                  className="text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700"
                                  onSelect={() => handlePublish(course.id)}
                                >
                                  <Check className="h-3.5 w-3.5" /> Publish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-slate-100" />
                              <DropdownMenuItem
                                className="text-rose-500 focus:bg-rose-50 focus:text-rose-600"
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

            {filtered.length === 0 && (
              <p className="py-12 text-center text-sm text-slate-400">
                No courses match your search.
              </p>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
              <p className="text-xs text-slate-400">
                Showing {pageStart}–{pageEnd} of {filtered.length} courses
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
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
                          ? 'bg-slate-900 text-white hover:bg-slate-800 hover:text-white'
                          : 'text-slate-500 hover:bg-slate-100',
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
                  className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
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
