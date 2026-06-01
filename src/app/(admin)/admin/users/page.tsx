'use client';

import { useState } from 'react';
import {
  Search,
  UserPlus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  X,
  ShieldOff,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  ADMIN_USERS,
  type AdminUserRow,
  type UserRole,
  type UserStatus,
} from '@/constants/admin';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import TopBar from '@/components/common/TopBar';
import AddUserModal from './AddUserModal';
import { useToast } from '@/components/ui/toast';

const PAGE_SIZE = 5;

const ROLE_STYLE: Record<UserRole, string> = {
  Admin: 'border border-violet-200 bg-violet-50 text-violet-600',
  Educator: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Learner: 'border border-blue-200 bg-blue-50 text-blue-600',
};

const ROLE_AVATAR_BG: Record<UserRole, string> = {
  Admin: 'bg-violet-100 text-violet-700',
  Educator: 'bg-emerald-100 text-emerald-700',
  Learner: 'bg-blue-100 text-blue-700',
};

const STATUS_STYLE: Record<UserStatus, string> = {
  Active: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Achieved: 'border border-amber-200 bg-amber-50 text-amber-600',
  Inactive: 'border border-orange-200 bg-orange-50 text-orange-600',
  Suspended: 'border border-rose-200 bg-rose-50 text-rose-600',
};

function userInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

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
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 px-6 py-5">{children}</div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}

// ── View modal ───────────────────────────────────────────────────────────────

function ViewModal({
  user,
  onClose,
  onEdit,
}: {
  user: AdminUserRow;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <Modal
      title="User Details"
      onClose={onClose}
      maxWidth="max-w-sm"
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
            Edit
          </Button>
        </>
      }
    >
      {/* Avatar + name */}
      <div className="mb-5 flex flex-col items-center gap-2">
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold',
            ROLE_AVATAR_BG[user.role],
          )}
        >
          {userInitials(user.name)}
        </div>
        <p className="font-semibold text-slate-900">{user.name}</p>
        <p className="text-xs text-slate-400">{user.email}</p>
        <div className="flex gap-1.5">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
              ROLE_STYLE[user.role],
            )}
          >
            {user.role}
          </span>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
              STATUS_STYLE[user.status],
            )}
          >
            {user.status}
          </span>
        </div>
      </div>

      {/* Detail rows */}
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
        {[
          ['Enrolled Courses', String(user.enrolled)],
          ['Joined', user.joined],
          ['Last Active', user.lastActive],
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

// ── Edit modal ───────────────────────────────────────────────────────────────

const ROLES: UserRole[] = ['Learner', 'Educator', 'Admin'];
const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Suspended', 'Achieved'];

const EDIT_ROLE_STYLE: Record<UserRole, string> = {
  Learner: 'border-blue-200 bg-blue-50 text-blue-600',
  Educator: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Admin: 'border-violet-200 bg-violet-50 text-violet-600',
};

const EDIT_STATUS_STYLE: Record<UserStatus, string> = {
  Active: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Inactive: 'border-orange-200 bg-orange-50 text-orange-600',
  Suspended: 'border-rose-200 bg-rose-50 text-rose-600',
  Achieved: 'border-amber-200 bg-amber-50 text-amber-600',
};

const inputCls =
  'h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-xs font-semibold text-slate-500';

function EditModal({
  user,
  onSave,
  onClose,
}: {
  user: AdminUserRow;
  onSave: (updated: AdminUserRow) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);

  return (
    <Modal
      title="Edit User"
      onClose={onClose}
      maxWidth="max-w-md"
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
            variant="secondary"
            className="rounded-xl px-5"
            onClick={() => onSave({ ...user, name, email, role, status })}
          >
            Save changes
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Role</label>
          <div className="flex gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  'flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors',
                  role === r
                    ? EDIT_ROLE_STYLE[r]
                    : 'border-slate-200 text-slate-400 hover:bg-slate-50',
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Status</label>
          <div className="grid grid-cols-4 gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={cn(
                  'rounded-lg border py-2 text-xs font-semibold transition-colors',
                  status === s
                    ? EDIT_STATUS_STYLE[s]
                    : 'border-slate-200 text-slate-400 hover:bg-slate-50',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ── Delete modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  name,
  onConfirm,
  onClose,
}: {
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      title="Delete user?"
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
          &ldquo;{name}&rdquo;
        </span>{' '}
        will be permanently removed. This action cannot be undone.
      </p>
    </Modal>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserRow[]>(ADMIN_USERS);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const [viewUser, setViewUser] = useState<AdminUserRow | null>(null);
  const [editUser, setEditUser] = useState<AdminUserRow | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUserRow | null>(null);

  const { toast } = useToast();

  // ── Actions ────────────────────────────────────────────────────────────────

  function handleSaveEdit(updated: AdminUserRow) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setEditUser(null);
    toast(`"${updated.name}" has been updated.`, 'success');
  }

  function handleDelete(id: string) {
    const user = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteUser(null);
    toast(`"${user?.name}" was removed.`, 'error');
  }

  function handleSuspend(id: string) {
    const user = users.find((u) => u.id === id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'Suspended' } : u)),
    );
    toast(`"${user?.name}" has been suspended.`, 'warning');
  }

  function handleActivate(id: string) {
    const user = users.find((u) => u.id === id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'Active' } : u)),
    );
    toast(`"${user?.name}" is now active.`, 'success');
  }

  // ── Filtering / pagination ─────────────────────────────────────────────────

  const filtered = users.filter((u) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
    );
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

  return (
    <>
      {viewUser && (
        <ViewModal
          user={viewUser}
          onClose={() => setViewUser(null)}
          onEdit={() => {
            setEditUser(viewUser);
            setViewUser(null);
          }}
        />
      )}
      {editUser && (
        <EditModal
          user={editUser}
          onSave={handleSaveEdit}
          onClose={() => setEditUser(null)}
        />
      )}
      {deleteUser && (
        <DeleteModal
          name={deleteUser.name}
          onConfirm={() => handleDelete(deleteUser.id)}
          onClose={() => setDeleteUser(null)}
        />
      )}

      <div className="flex min-h-full flex-col">
        <TopBar
          role="admin"
          title="User Management"
          subtitle="Live workspace synced for admin@clp.com"
        />

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setModalOpen(true)}
              className="shrink-0 rounded-full px-5 font-bold text-white shadow hover:text-white"
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
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
                        'NAME',
                        'ROLE',
                        'COURSES',
                        'JOINED',
                        'LAST ACTIVE',
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
                  {paginated.map((user, idx) => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 text-xs text-slate-400">
                        {pageStart + idx}
                      </td>

                      {/* Name */}
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

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                            ROLE_STYLE[user.role],
                          )}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Courses */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {user.enrolled}
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {user.joined}
                      </td>

                      {/* Last active */}
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {user.lastActive}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                            STATUS_STYLE[user.status],
                          )}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                aria-label="User actions"
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
                                onSelect={() => setViewUser(user)}
                              >
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-slate-700 focus:bg-slate-50 focus:text-slate-900"
                                onSelect={() => setEditUser(user)}
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                              </DropdownMenuItem>
                              {user.status !== 'Suspended' ? (
                                <DropdownMenuItem
                                  className="text-amber-600 focus:bg-amber-50 focus:text-amber-700"
                                  onSelect={() => handleSuspend(user.id)}
                                >
                                  <ShieldOff className="h-3.5 w-3.5" />
                                  Suspend
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  className="text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700"
                                  onSelect={() => handleActivate(user.id)}
                                >
                                  <ShieldCheck className="h-3.5 w-3.5" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator className="bg-slate-100" />
                              <DropdownMenuItem
                                className="text-rose-500 focus:bg-rose-50 focus:text-rose-600"
                                onSelect={() => setDeleteUser(user)}
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

      {modalOpen && (
        <AddUserModal
          onClose={() => setModalOpen(false)}
          onCreate={(user) => {
            setUsers((prev) => [user, ...prev]);
            setModalOpen(false);
            toast(`"${user.name}" was added successfully.`, 'success');
          }}
        />
      )}
    </>
  );
}
