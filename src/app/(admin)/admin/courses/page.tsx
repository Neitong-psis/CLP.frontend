'use client';

import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/toast';
import {
  Search,
  Star,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Eye,
  Trash2,
  Users,
  BarChart2,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  ADMIN_COURSES,
  APPROVAL_QUEUE,
  type CourseStatus,
  type AdminCourseRow,
  type ApprovalQueueItem,
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

const PAGE_SIZE = 8;

const STATUS_STYLE: Record<CourseStatus, string> = {
  Public: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Pending: 'border border-amber-200 bg-amber-50 text-amber-600',
  Archive: 'border border-slate-200 bg-slate-50 text-slate-500',
};

const CATEGORY_STYLE: Record<string, string> = {
  'Web Development': 'border border-blue-200 bg-blue-50 text-blue-600',
  'Data Science': 'border border-teal-200 bg-teal-50 text-teal-600',
  'Cloud Computing': 'border border-slate-200 bg-slate-100 text-slate-600',
  Programming: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  DevOps: 'border border-orange-200 bg-orange-50 text-orange-600',
  Design: 'border border-violet-200 bg-violet-50 text-violet-600',
};

const APPROVAL_CATEGORY_STYLE: Record<string, string> = {
  DevOps: 'bg-orange-100 text-orange-600',
  'Web Development': 'bg-blue-100 text-blue-600',
  'Data Science': 'bg-teal-100 text-teal-600',
};

const STATUS_FILTERS: Array<CourseStatus | 'All'> = [
  'All',
  'Public',
  'Pending',
  'Archive',
];

const ALL_CATEGORIES = [
  'Web Development',
  'Data Science',
  'Cloud Computing',
  'Programming',
  'DevOps',
  'Design',
];

const ALL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// ── Shared modal shell ───────────────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
  footer,
  maxWidth = 'max-w-md',
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          'flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl',
          maxWidth,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 px-6 py-5">{children}</div>

        {/* Modal footer / button tray */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}

// ── Modal: View ──────────────────────────────────────────────────────────────

function ViewModal({
  course,
  onClose,
  onEdit,
}: {
  course: AdminCourseRow;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <Modal
      title="Course Details"
      onClose={onClose}
      maxWidth="max-w-md"
      footer={
        <>
          <Button
            variant="ghost"
            className="rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl px-5"
            onClick={onEdit}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit course
          </Button>
        </>
      }
    >
      {/* Badges */}
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
            STATUS_STYLE[course.status],
          )}
        >
          {course.status}
        </span>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
            CATEGORY_STYLE[course.category] ??
              'border border-slate-200 bg-slate-50 text-slate-600',
          )}
        >
          {course.category}
        </span>
      </div>

      {/* Title + instructor */}
      <p className="text-sm leading-snug font-bold text-slate-900">
        {course.title}
      </p>
      <p className="mt-0.5 text-xs text-slate-500">{course.instructor}</p>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          {
            label: 'Enrollments',
            value: course.enrolled.toLocaleString(),
            icon: <Users className="h-4 w-4 text-slate-400" />,
          },
          {
            label: 'Rating',
            value: course.rating > 0 ? course.rating.toFixed(1) : '—',
            icon: <Star className="h-4 w-4 fill-amber-400 text-amber-400" />,
          },
          {
            label: 'Level',
            value: course.level,
            icon: <BarChart2 className="h-4 w-4 text-slate-400" />,
          },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white py-3"
          >
            {icon}
            <p className="text-sm font-bold text-slate-800">{value}</p>
            <span className="text-[11px] font-medium text-slate-400">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Detail rows */}
      <div className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">
        {[
          ['Educator', course.instructor],
          ['Category', course.category],
          ['Created', course.createdAt],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="text-xs font-semibold text-slate-400">
              {label}
            </span>
            <span className="text-xs font-medium text-slate-700">{value}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ── Modal: Edit ──────────────────────────────────────────────────────────────

function EditModal({
  course,
  onSave,
  onClose,
}: {
  course: AdminCourseRow;
  onSave: (updated: AdminCourseRow) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(course.title);
  const [category, setCategory] = useState(course.category);
  const [level, setLevel] = useState(course.level);
  const [status, setStatus] = useState<CourseStatus>(course.status);

  const fieldCls = 'flex flex-col gap-1.5';
  const labelCls = 'text-xs font-semibold text-slate-600';
  const inputCls =
    'h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10';
  const selectCls = inputCls + ' cursor-pointer';

  return (
    <Modal
      title="Edit Course"
      onClose={onClose}
      maxWidth="max-w-md"
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            className="rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-course-form"
            variant="secondary"
            className="rounded-xl px-5"
          >
            Save changes
          </Button>
        </>
      }
    >
      <form
        id="edit-course-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...course, title, category, level, status });
        }}
        className="space-y-4"
      >
        <div className={fieldCls}>
          <label className={labelCls}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className={fieldCls}>
            <label className={labelCls}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectCls}
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={fieldCls}>
            <label className={labelCls}>Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={selectCls}
            >
              {ALL_LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Status</label>
          <div className="flex gap-2">
            {(['Public', 'Pending', 'Archive'] as CourseStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={cn(
                  'flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors',
                  status === s
                    ? STATUS_STYLE[s] + ' ring-1'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}

// ── Modal: Confirm delete ────────────────────────────────────────────────────

function DeleteModal({
  title,
  onConfirm,
  onClose,
}: {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      title="Delete course?"
      onClose={onClose}
      maxWidth="max-w-sm"
      footer={
        <>
          <Button
            variant="ghost"
            className="rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            className="rounded-xl bg-rose-500 px-5 text-white hover:bg-rose-600"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate-500">
        <span className="font-semibold text-slate-800">
          &ldquo;{title}&rdquo;
        </span>{' '}
        will be permanently removed. This action cannot be undone.
      </p>
    </Modal>
  );
}

// ── Row context menu ─────────────────────────────────────────────────────────

interface ContextMenuState {
  course: AdminCourseRow;
  x: number;
  y: number;
}

function RowContextMenu({
  course,
  x,
  y,
  onView,
  onEdit,
  onPublish,
  onDelete,
  onClose,
}: {
  course: AdminCourseRow;
  x: number;
  y: number;
  onView: () => void;
  onEdit: () => void;
  onPublish: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });

  // Clamp to viewport after first render so menu never clips off-screen
  useEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setPos({
      x: x + width > window.innerWidth ? x - width : x,
      y: y + height > window.innerHeight ? y - height : y,
    });
  }, [x, y]);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={`Actions for ${course.title}`}
      className="fixed z-50 min-w-35 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
      style={{ top: pos.y, left: pos.x }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Course name label */}
      <p className="truncate px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
        {course.title.length > 26
          ? course.title.slice(0, 26) + '…'
          : course.title}
      </p>
      <div className="mb-1 border-t border-slate-100" />

      <button
        role="menuitem"
        onClick={() => {
          onView();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
      >
        <Eye className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        View
      </button>

      <button
        role="menuitem"
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
      >
        <Pencil className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        Edit
      </button>

      {course.status !== 'Public' && (
        <button
          role="menuitem"
          onClick={() => {
            onPublish();
            onClose();
          }}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-emerald-600 transition-colors hover:bg-emerald-50 focus-visible:bg-emerald-50 focus-visible:outline-none"
        >
          <Check className="h-3.5 w-3.5 shrink-0" />
          Publish
        </button>
      )}

      <div className="my-1 border-t border-slate-100" />

      <button
        role="menuitem"
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-rose-500 transition-colors hover:bg-rose-50 focus-visible:bg-rose-50 focus-visible:outline-none"
      >
        <Trash2 className="h-3.5 w-3.5 shrink-0" />
        Delete
      </button>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourseRow[]>(ADMIN_COURSES);
  const [queue, setQueue] = useState<ApprovalQueueItem[]>(APPROVAL_QUEUE);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');
  const [page, setPage] = useState(1);
  const [approvalSearch, setApprovalSearch] = useState('');

  const [viewCourse, setViewCourse] = useState<AdminCourseRow | null>(null);
  const [editCourse, setEditCourse] = useState<AdminCourseRow | null>(null);
  const [deleteCourse, setDeleteCourse] = useState<AdminCourseRow | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  // Close context menu on click-outside or Escape
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

  const { toast } = useToast();

  // ── Course table actions ─────────────────────────────────────────────────

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

  // ── Approval queue actions ───────────────────────────────────────────────

  function handleApprove(item: ApprovalQueueItem) {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const newCourse: AdminCourseRow = {
      id: item.id,
      title: item.title,
      instructor: item.instructor,
      category: item.category,
      level: 'Intermediate',
      enrolled: 0,
      rating: 0,
      status: 'Public',
      createdAt: today,
    };
    setCourses((prev) => [newCourse, ...prev]);
    setQueue((prev) => prev.filter((q) => q.id !== item.id));
    toast(`"${item.title}" approved and published.`, 'success');
  }

  function handleReject(id: string) {
    const item = queue.find((q) => q.id === id);
    setQueue((prev) => prev.filter((q) => q.id !== id));
    toast(`"${item?.title}" was rejected.`, 'error');
  }

  // ── Filtering / pagination ───────────────────────────────────────────────

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

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleStatusFilter(val: CourseStatus | 'All') {
    setStatusFilter(val);
    setPage(1);
  }

  const filteredQueue = queue.filter((q) => {
    if (!approvalSearch) return true;
    const s = approvalSearch.toLowerCase();
    return (
      q.title.toLowerCase().includes(s) ||
      q.instructor.toLowerCase().includes(s)
    );
  });

  return (
    <>
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
          onPublish={() => handlePublish(contextMenu.course.id)}
          onDelete={() => setDeleteCourse(contextMenu.course)}
          onClose={() => setContextMenu(null)}
        />
      )}

      <div className="flex min-h-full flex-col">
        <TopBar
          role="admin"
          title="Course Management"
          subtitle="Live workspace synced for admin@clp.com"
        />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="relative min-w-48 flex-1">
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
                        ['COURSE', 'left'],
                        ['EDUCATOR', 'left'],
                        ['CATEGORY', 'left'],
                        ['ENROLLMENTS', 'left'],
                        ['RATING', 'left'],
                        ['CREATED', 'left'],
                        ['STATUS', 'left'],
                        ['ACTIONS', 'right'],
                      ] as const
                    ).map(([label, align]) => (
                      <th
                        key={label}
                        className={cn(
                          'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                          align === 'right' ? 'text-right' : 'text-left',
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
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-700 focus:bg-slate-50 focus:text-slate-900"
                                onSelect={() => setEditCourse(course)}
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                              </DropdownMenuItem>
                              {course.status !== 'Public' && (
                                <DropdownMenuItem
                                  className="text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700"
                                  onSelect={() => handlePublish(course.id)}
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Publish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-slate-100" />
                              <DropdownMenuItem
                                className="text-rose-500 focus:bg-rose-50 focus:text-rose-600"
                                onSelect={() => setDeleteCourse(course)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
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

          {/* Approval Queue */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Approval Queue
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {queue.length} course{queue.length !== 1 ? 's' : ''} pending
                  review
                </p>
              </div>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search queue..."
                  value={approvalSearch}
                  onChange={(e) => setApprovalSearch(e.target.value)}
                  className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-52 rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQueue.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                      APPROVAL_CATEGORY_STYLE[item.category] ??
                        'bg-slate-100 text-slate-600',
                    )}
                  >
                    {item.category}
                  </span>
                  <p className="mt-3 text-sm leading-snug font-bold text-slate-900">
                    {item.title}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-slate-500">
                      <span className="font-medium text-slate-700">
                        Educator:
                      </span>{' '}
                      {item.instructor}
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="font-medium text-slate-700">
                        Lessons:
                      </span>{' '}
                      {item.lessons}
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="font-medium text-slate-700">
                        Submitted:
                      </span>{' '}
                      {item.submittedAt}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleApprove(item)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-2 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-100"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-rose-50 py-2 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredQueue.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">
                {queue.length === 0
                  ? 'No items in the approval queue.'
                  : 'No items match your search.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
