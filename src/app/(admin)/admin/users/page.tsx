'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Search,
  UserPlus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  ShieldOff,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { type AdminUserRow } from '@/constants/admin';
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
import { useUserManagement } from '@/components/pages/admin/hooks/useUserManagement';
import { useUserFilter } from '@/components/pages/admin/hooks/useUserFilter';
import {
  Chip,
  DeleteModal,
  EditModal,
  ViewModal,
} from '@/components/pages/admin/components/users/UserModals';
import {
  ROLE_AVATAR_BG,
  ROLE_COLOR,
  STATUS_COLOR,
  userInitials,
} from '@/components/pages/admin/components/users/constants';
import AddUserModal from './AddUserModal';

const TABLE_COLS = [
  'NAME',
  'ROLE',
  'COURSES',
  'JOINED',
  'LAST ACTIVE',
  'STATUS',
  'ACTIONS',
] as const;

// ── Row context menu ─────────────────────────────────────────────────────────

interface ContextMenuState {
  user: AdminUserRow;
  x: number;
  y: number;
}

function RowContextMenu({
  user,
  x,
  y,
  onView,
  onEdit,
  onSuspend,
  onActivate,
  onDelete,
  onClose,
}: {
  user: AdminUserRow;
  x: number;
  y: number;
  onView: () => void;
  onEdit: () => void;
  onSuspend: () => void;
  onActivate: () => void;
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
      aria-label={`Actions for ${user.name}`}
      className="fixed z-50 min-w-35 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
      style={{ top: pos.y, left: pos.x }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* User name label */}
      <p className="truncate px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
        {user.name.length > 26 ? user.name.slice(0, 26) + '…' : user.name}
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

      {user.status !== 'Suspended' ? (
        <button
          role="menuitem"
          onClick={() => {
            onSuspend();
            onClose();
          }}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-amber-600 transition-colors hover:bg-amber-50 focus-visible:bg-amber-50 focus-visible:outline-none"
        >
          <ShieldOff className="h-3.5 w-3.5 shrink-0" />
          Suspend
        </button>
      ) : (
        <button
          role="menuitem"
          onClick={() => {
            onActivate();
            onClose();
          }}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-emerald-600 transition-colors hover:bg-emerald-50 focus-visible:bg-emerald-50 focus-visible:outline-none"
        >
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          Activate
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

export default function AdminUsersPage() {
  const { users, saveEdit, remove, suspend, activate, add } =
    useUserManagement();
  const {
    search,
    setSearch,
    currentPage,
    totalPages,
    pageStart,
    pageEnd,
    filtered,
    paginated,
    goToPage,
    prevPage,
    nextPage,
  } = useUserFilter(users);

  const [addOpen, setAddOpen] = useState(false);
  const [viewUser, setViewUser] = useState<AdminUserRow | null>(null);
  const [editUser, setEditUser] = useState<AdminUserRow | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUserRow | null>(null);
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

  return (
    <>
      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      <ViewModal
        open={!!viewUser}
        user={viewUser}
        onClose={() => setViewUser(null)}
        onEdit={() => {
          setEditUser(viewUser);
          setViewUser(null);
        }}
      />

      {/* key resets EditModal form state when target user changes */}
      <EditModal
        key={editUser?.id ?? 'edit-closed'}
        open={!!editUser}
        user={editUser}
        onSave={(updated) => {
          saveEdit(updated);
          setEditUser(null);
        }}
        onClose={() => setEditUser(null)}
      />

      <DeleteModal
        open={!!deleteUser}
        name={deleteUser?.name ?? ''}
        onConfirm={() => {
          if (deleteUser) {
            remove(deleteUser.id);
            setDeleteUser(null);
          }
        }}
        onClose={() => setDeleteUser(null)}
      />

      {addOpen && (
        <AddUserModal
          onClose={() => setAddOpen(false)}
          onCreate={(user) => {
            add(user);
            setAddOpen(false);
          }}
        />
      )}

      {contextMenu && (
        <RowContextMenu
          user={contextMenu.user}
          x={contextMenu.x}
          y={contextMenu.y}
          onView={() => setViewUser(contextMenu.user)}
          onEdit={() => setEditUser(contextMenu.user)}
          onSuspend={() => suspend(contextMenu.user.id)}
          onActivate={() => activate(contextMenu.user.id)}
          onDelete={() => setDeleteUser(contextMenu.user)}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* ── Page shell ─────────────────────────────────────────────────────── */}
      <div className="flex min-h-full flex-col">
        <TopBar role="admin" title="User Management" />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <label htmlFor="user-search" className="sr-only">
                Search users by name or email
              </label>
              <Search
                className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="user-search"
                type="search"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setAddOpen(true)}
              className="shrink-0 rounded-full px-5 font-bold text-white shadow hover:text-white"
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Add User
            </Button>
          </div>

          {/* Live region — announces result count to screen readers */}
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {filtered.length === 0
              ? 'No users match your search.'
              : `Showing ${pageStart} to ${pageEnd} of ${filtered.length} users.`}
          </p>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th
                      scope="col"
                      className="w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase"
                    >
                      #
                    </th>
                    {TABLE_COLS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className={cn(
                          'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                          col === 'ACTIONS' ? 'text-right' : 'text-left',
                        )}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={cn(
                        'transition-colors hover:bg-slate-50',
                        contextMenu?.user.id === user.id && 'bg-slate-50',
                      )}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({ user, x: e.clientX, y: e.clientY });
                      }}
                    >
                      <td className="px-4 py-4 text-xs text-slate-400">
                        {pageStart + idx}
                      </td>

                      {/* Name + avatar */}
                      <td className="px-5 py-4">
                        <button
                          className="flex items-center gap-3 text-left"
                          onClick={() => setViewUser(user)}
                        >
                          <div
                            className={cn(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                              ROLE_AVATAR_BG[user.role],
                            )}
                          >
                            {userInitials(user.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 underline-offset-2 hover:underline">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <Chip color={ROLE_COLOR[user.role]}>{user.role}</Chip>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {user.enrolled}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {user.joined}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {user.lastActive}
                      </td>
                      <td className="px-5 py-4">
                        <Chip color={STATUS_COLOR[user.status]}>
                          {user.status}
                        </Chip>
                      </td>

                      {/* Actions dropdown */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                aria-label={`Actions for ${user.name}`}
                                className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 [&_svg]:size-4"
                              >
                                <MoreHorizontal aria-hidden="true" />
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
                                onSelect={() => setViewUser(user)}
                              >
                                <Eye
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-700 focus:bg-slate-50 focus:text-slate-900"
                                onSelect={() => setEditUser(user)}
                              >
                                <Pencil
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                                Edit
                              </DropdownMenuItem>
                              {user.status !== 'Suspended' ? (
                                <DropdownMenuItem
                                  className="text-amber-600 focus:bg-amber-50 focus:text-amber-700"
                                  onSelect={() => suspend(user.id)}
                                >
                                  <ShieldOff
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  Suspend
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  className="text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700"
                                  onSelect={() => activate(user.id)}
                                >
                                  <ShieldCheck
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-slate-100" />
                              <DropdownMenuItem
                                className="text-rose-500 focus:bg-rose-50 focus:text-rose-600"
                                onSelect={() => setDeleteUser(user)}
                              >
                                <Trash2
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
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
                No users match your search.
              </p>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
              <p className="text-xs text-slate-400">
                Showing {pageStart}–{pageEnd} of {filtered.length} users
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Previous page"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
                >
                  <ChevronLeft aria-hidden="true" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Page ${p}`}
                      aria-current={p === currentPage ? 'page' : undefined}
                      onClick={() => goToPage(p)}
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
                  aria-label="Next page"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
                >
                  <ChevronRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
