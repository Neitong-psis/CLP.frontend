'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAdminCoursesT } from '@/i18n';
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
  Plus,
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
import { SimpleFilterDropdown } from '@/components/pages/admin/filters/SimpleFilterDropdown';
import { EditModal } from './_components/EditModal';
import { DeleteModal } from './_components/DeleteModal';
import { RowContextMenu } from './_components/RowContextMenu';
import {
  PAGE_SIZE,
  STATUS_FILTERS,
  STATUS_STYLE,
  CATEGORY_BADGE_STYLE,
  ALL_CATEGORIES,
  ALL_LEVELS,
} from './_lib/constants';

interface ContextMenuState {
  course: AdminCourseRow;
  x: number;
  y: number;
}

const STATUS_DOT: Record<CourseStatus, string> = {
  Public: 'bg-emerald-500',
  Pending: 'bg-amber-500',
  Archive: 'bg-muted-foreground/60',
};

const CATEGORY_DOT: Record<string, string> = {
  'Web Development': 'bg-blue-500',
  'Data Science': 'bg-teal-500',
  'Cloud Computing': 'bg-slate-400',
  Programming: 'bg-emerald-500',
  DevOps: 'bg-orange-500',
  Design: 'bg-violet-500',
};

export default function AdminCoursesPage() {
  const t = useAdminCoursesT();
  const locale = useLocale();
  const router = useRouter();
  const { courses, loading, saveEdit, remove, publish } = useCourseManagement();

  // ── State ──────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [page, setPage] = useState(1);
  const [editCourse, setEditCourse] = useState<AdminCourseRow | null>(null);
  const [deleteCourse, setDeleteCourse] = useState<AdminCourseRow | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [localCourses] = useState<AdminCourseRow[]>([]);

  function reviewUrl(course: AdminCourseRow) {
    const page = new URLSearchParams({
      title: course.title,
      instructor: course.instructor,
      category: course.category,
      level: course.level,
      status: course.status,
    });
    return `/${locale}/admin/courses/${course.id}?${page.toString()}`;
  }

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

  // ── Filtering / pagination ──────────────────────────────────────────────────
  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }
  function handleStatusFilter(val: CourseStatus | 'All') {
    setStatusFilter(val);
    setPage(1);
  }
  function handleCategoryFilter(val: string) {
    setCategoryFilter(val);
    setPage(1);
  }
  function handleLevelFilter(val: string) {
    setLevelFilter(val);
    setPage(1);
  }
  const allCourses = [...localCourses, ...courses];

  const filtered = allCourses.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && c.category !== categoryFilter) return false;
    if (levelFilter !== 'All' && c.level !== levelFilter) return false;
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

  const statusOptions = STATUS_FILTERS.filter(
    (s): s is CourseStatus => s !== 'All',
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Modals */}
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
          onView={() => router.push(reviewUrl(contextMenu.course))}
          onEdit={() => setEditCourse(contextMenu.course)}
          onReview={() => router.push(reviewUrl(contextMenu.course))}
          onPublish={() => void publish(contextMenu.course.id)}
          onDelete={() => setDeleteCourse(contextMenu.course)}
          onClose={() => setContextMenu(null)}
        />
      )}

      <div className="flex min-h-full flex-col">
        <TopBar role="admin" title={t('title')} />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-2 sm:gap-3">
            <div className="relative w-full max-w-xs min-w-0 sm:max-w-72">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="search"
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-card text-foreground placeholder:text-muted-foreground h-9 w-full rounded-lg border pr-3 pl-9 text-sm outline-none focus:ring-2"
              />
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {/* Filter dropdowns — one facet each, applies on click */}
              <SimpleFilterDropdown
                label={t('filterStatus')}
                allLabel={t('filterAll')}
                options={statusOptions}
                value={statusFilter}
                onSelect={handleStatusFilter}
                dot={STATUS_DOT}
              />
              <SimpleFilterDropdown
                label={t('filterCategory')}
                allLabel={t('filterAll')}
                options={ALL_CATEGORIES}
                value={categoryFilter}
                onSelect={handleCategoryFilter}
                dot={CATEGORY_DOT}
              />
              <SimpleFilterDropdown
                label={t('filterLevel')}
                allLabel={t('filterAll')}
                options={ALL_LEVELS}
                value={levelFilter}
                onSelect={handleLevelFilter}
              />

              {/* Create Course */}
              <Link href={`/${locale}/admin/courses/new`}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-9 gap-1.5 rounded-lg px-3 sm:px-4"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('createBtn')}</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="border-border bg-card overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-240 text-sm">
                <thead>
                  <tr className="border-border bg-surface border-b">
                    <th className="text-muted-foreground w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase">
                      #
                    </th>
                    {(
                      [
                        ['colCourse', false],
                        ['colEducator', false],
                        ['colCategory', false],
                        ['colEnrollments', false],
                        ['colRating', false],
                        ['colCreated', false],
                        ['colStatus', false],
                        ['colActions', true],
                      ] as const
                    ).map(([key, isRight]) => (
                      <th
                        key={key}
                        className={cn(
                          'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase',
                          isRight ? 'text-right' : 'text-left',
                        )}
                      >
                        {t(key)}
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
                          <Link
                            href={reviewUrl(course)}
                            className="block w-full"
                          >
                            <p className="truncate text-sm font-semibold text-teal-500 underline-offset-2 hover:underline">
                              {course.title}
                            </p>
                            <p className="text-muted-foreground mt-0.5 text-[11px]">
                              {course.level}
                            </p>
                          </Link>
                        </td>
                        <td className="text-muted-foreground px-5 py-4 text-sm whitespace-nowrap">
                          {course.instructor}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={cn(
                              'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap',
                              CATEGORY_BADGE_STYLE,
                            )}
                          >
                            {course.category}
                          </span>
                        </td>
                        <td className="text-foreground px-5 py-4 text-sm whitespace-nowrap">
                          {course.enrolled.toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-foreground flex items-center gap-1 text-sm font-semibold whitespace-nowrap">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {course.rating.toFixed(1)}
                          </span>
                        </td>
                        <td className="text-muted-foreground px-5 py-4 text-sm whitespace-nowrap">
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
                                  {t('colActions')}
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  className="text-foreground focus:bg-muted"
                                  onSelect={() =>
                                    router.push(reviewUrl(course))
                                  }
                                >
                                  <Eye className="h-3.5 w-3.5" />{' '}
                                  {t('viewAction')}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-foreground focus:bg-muted"
                                  onSelect={() => setEditCourse(course)}
                                >
                                  <Pencil className="h-3.5 w-3.5" />{' '}
                                  {t('editAction')}
                                </DropdownMenuItem>
                                {course.status === 'Pending' && (
                                  <DropdownMenuItem
                                    className="text-brand-gold focus:bg-brand-gold/10 focus:text-brand-gold-dark"
                                    onSelect={() =>
                                      router.push(reviewUrl(course))
                                    }
                                  >
                                    <ClipboardCheck className="h-3.5 w-3.5" />{' '}
                                    {t('reviewAction')}
                                  </DropdownMenuItem>
                                )}
                                {course.status === 'Archive' && (
                                  <DropdownMenuItem
                                    className="text-emerald-500 focus:bg-emerald-500/10 focus:text-emerald-500"
                                    onSelect={() => void publish(course.id)}
                                  >
                                    <Check className="h-3.5 w-3.5" />{' '}
                                    {t('publishAction')}
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem
                                  className="text-rose-500 focus:bg-rose-500/10 focus:text-rose-500"
                                  onSelect={() => setDeleteCourse(course)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />{' '}
                                  {t('deleteAction')}
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
                {t('noMatch')}
              </p>
            )}

            {/* Pagination */}
            <div className="border-border flex items-center justify-between border-t px-5 py-3">
              <p className="text-muted-foreground text-xs">
                {t('showingOf', {
                  from: pageStart,
                  to: pageEnd,
                  total: filtered.length,
                })}
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
                          ? 'bg-brand-accent text-brand-accent-foreground hover:opacity-90'
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
